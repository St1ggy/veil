interface GlossaryTerm {
  name: string;
  definition: string;
  href: string;
  normalized: string;
}

type TooltipTarget = HTMLElement & { dataset: DOMStringMap & { tooltip?: string; tooltipKind?: string; href?: string } };

const closestTooltip = (target: EventTarget | null): TooltipTarget | null =>
  target instanceof Element ? target.closest<TooltipTarget>("[data-tooltip]") : null;

(() => {
  const base = document.documentElement.dataset.base || "/";
  if (document.body.dataset.glossaryTooltips !== "true") return;

  fetch(`${base}glossary-index.json`)
    .then((response) => response.ok ? response.json() as Promise<Omit<GlossaryTerm, "normalized">[]> : [])
    .then((terms) => {
      const buckets = new Map<string, GlossaryTerm[]>();
      for (const term of terms) {
        const normalized = term.name.toLocaleLowerCase("ru").replace(/ё/g, "е");
        if (normalized.length < 4 || normalized.length > 100) continue;
        const bucket = buckets.get(normalized[0]) || [];
        bucket.push({ ...term, normalized });
        buckets.set(normalized[0], bucket);
      }
      for (const bucket of buckets.values()) bucket.sort((a, b) => b.normalized.length - a.normalized.length);
      const highlightTerms = (root: Node) => {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
          acceptNode(node) {
            const parent = node.parentElement;
            if (!parent || !node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
            if (!parent.closest(".main p, .main li, .main td, .main dd, .main blockquote")) return NodeFilter.FILTER_REJECT;
            if (parent.closest("a, abbr, code, pre, script, style, button")) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          },
        });
        const nodes: Text[] = [];
        while (walker.nextNode()) {
          if (walker.currentNode instanceof Text) nodes.push(walker.currentNode);
        }
        for (const node of nodes) {
        const original = node.nodeValue ?? "";
        const normalized = original.toLocaleLowerCase("ru").replace(/ё/g, "е");
        let best: { term: GlossaryTerm; index: number } | null = null;
        for (let index = 0; index < normalized.length && !best; index += 1) {
          for (const term of buckets.get(normalized[index]) || []) {
            if (!normalized.startsWith(term.normalized, index)) continue;
            const before = normalized[index - 1];
            const after = normalized[index + term.normalized.length];
            if ((before && /[а-яёa-z0-9]/i.test(before)) || (after && /[а-яёa-z0-9]/i.test(after))) continue;
            best = { term, index };
            break;
          }
        }
        if (!best) continue;
        const fragment = document.createDocumentFragment();
        fragment.append(original.slice(0, best.index));
        const label = original.slice(best.index, best.index + best.term.normalized.length);
        const tooltip = document.createElement("abbr");
        tooltip.className = "glossary-tooltip";
        tooltip.textContent = label;
        tooltip.dataset.tooltip = best.term.definition.slice(0, 600);
        tooltip.dataset.tooltipKind = "glossary";
        tooltip.dataset.href = best.term.href;
        tooltip.tabIndex = 0;
        tooltip.setAttribute("aria-label", `${label}: ${tooltip.dataset.tooltip}`);
        fragment.append(tooltip, original.slice(best.index + label.length));
        node.replaceWith(fragment);
        }
      };

      const main = document.querySelector<HTMLElement>(".main");
      if (!main) return;
      highlightTerms(main);
      new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          mutation.addedNodes.forEach((node) => highlightTerms(node));
        }
      }).observe(main, { childList: true, subtree: true });
    })
    .catch(() => undefined);

  const popup = document.createElement("div");
  popup.className = "rich-tooltip";
  popup.setAttribute("role", "tooltip");
  popup.hidden = true;
  popup.innerHTML = '<span class="rich-tooltip__kind"></span><strong class="rich-tooltip__term"></strong><span class="rich-tooltip__body"></span>';
  document.body.append(popup);

  const kind = popup.querySelector<HTMLElement>(".rich-tooltip__kind");
  const term = popup.querySelector<HTMLElement>(".rich-tooltip__term");
  const body = popup.querySelector<HTMLElement>(".rich-tooltip__body");
  let active: TooltipTarget | null = null;
  const place = (target: TooltipTarget) => {
    const rect = target.getBoundingClientRect();
    const margin = 12;
    popup.style.left = `${Math.min(Math.max(margin, rect.left), window.innerWidth - popup.offsetWidth - margin)}px`;
    const above = rect.top - popup.offsetHeight - 10;
    popup.style.top = `${above > margin ? above : rect.bottom + 10}px`;
  };
  const show = (target: TooltipTarget) => {
    const tooltipBody = target.dataset.tooltip;
    if (!tooltipBody || !kind || !term || !body) return;
    active = target;
    kind.textContent = target.dataset.tooltipKind === "swade" ? "Термин «Дневника авантюриста»" : "Глоссарий «Вуали Миров»";
    term.textContent = target.textContent?.trim() ?? "";
    body.textContent = tooltipBody;
    popup.hidden = false;
    place(target);
  };
  const hide = (target: TooltipTarget) => {
    if (active !== target) return;
    active = null;
    popup.hidden = true;
  };
  document.addEventListener("pointerover", (event) => { const target = closestTooltip(event.target); if (target) show(target); });
  document.addEventListener("pointerout", (event) => {
    const target = closestTooltip(event.target);
    if (target && (!(event.relatedTarget instanceof Node) || !target.contains(event.relatedTarget))) hide(target);
  });
  document.addEventListener("focusin", (event) => { const target = closestTooltip(event.target); if (target) show(target); });
  document.addEventListener("focusout", (event) => { const target = closestTooltip(event.target); if (target) hide(target); });
  window.addEventListener("scroll", () => { if (active) place(active); }, { passive: true });
  window.addEventListener("resize", () => { if (active) place(active); });
})();

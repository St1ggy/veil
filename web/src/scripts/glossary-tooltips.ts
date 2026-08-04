import { automaticSwadeTerms, swadeBook } from "../data/swadeTerms";

interface GlossaryTerm {
  name: string;
  definition: string;
  href: string;
  normalized: string;
  automatic: boolean;
}

interface HighlightTerm {
  name: string;
  definition: string;
  href?: string;
  normalized: string;
  kind: "glossary" | "swade";
}

type TooltipTarget = HTMLElement & { dataset: DOMStringMap & { tooltip?: string; tooltipKind?: string; href?: string } };

const closestTooltip = (target: EventTarget | null): TooltipTarget | null =>
  target instanceof Element ? target.closest<TooltipTarget>("[data-tooltip]") : null;

const buildBuckets = (terms: HighlightTerm[]): Map<string, HighlightTerm[]> => {
  const buckets = new Map<string, HighlightTerm[]>();
  for (const term of terms) {
    if (term.normalized.length < 4 || term.normalized.length > 100) continue;
    const bucket = buckets.get(term.normalized[0]) || [];
    bucket.push(term);
    buckets.set(term.normalized[0], bucket);
  }
  for (const bucket of buckets.values()) bucket.sort((a, b) => b.normalized.length - a.normalized.length);
  return buckets;
};

const highlightTerms = (root: Node, buckets: Map<string, HighlightTerm[]>) => {
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
    const normalized = original.replace(/ё/g, "е");
    const matches: { term: HighlightTerm; index: number }[] = [];
    let cursor = 0;
    while (cursor < normalized.length) {
      let found: { term: HighlightTerm; index: number } | null = null;
      for (let index = cursor; index < normalized.length && !found; index += 1) {
        for (const candidate of buckets.get(normalized[index]) || []) {
          if (!normalized.startsWith(candidate.normalized, index)) continue;
          const before = normalized[index - 1];
          const after = normalized[index + candidate.normalized.length];
          if ((before && /[а-яёa-z0-9]/i.test(before)) || (after && /[а-яёa-z0-9]/i.test(after))) continue;
          found = { term: candidate, index };
          break;
        }
      }
      if (!found) break;
      matches.push(found);
      cursor = found.index + found.term.normalized.length;
    }
    if (!matches.length) continue;

    const fragment = document.createDocumentFragment();
    cursor = 0;
    for (const match of matches) {
      fragment.append(original.slice(cursor, match.index));
      const label = original.slice(match.index, match.index + match.term.normalized.length);
      const tooltip = document.createElement("abbr");
      tooltip.className = match.term.kind === "swade" ? "term-tooltip" : "glossary-tooltip";
      tooltip.textContent = label;
      tooltip.dataset.tooltip = match.term.definition.slice(0, 600);
      tooltip.dataset.tooltipKind = match.term.kind;
      if (match.term.href) tooltip.dataset.href = match.term.href;
      tooltip.tabIndex = 0;
      tooltip.setAttribute("aria-label", `${label}: ${tooltip.dataset.tooltip}`);
      fragment.append(tooltip);
      cursor = match.index + label.length;
    }
    fragment.append(original.slice(cursor));
    node.replaceWith(fragment);
  }
};

const activateTerms = (main: HTMLElement, terms: HighlightTerm[]) => {
  const buckets = buildBuckets(terms);
  highlightTerms(main, buckets);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => highlightTerms(node, buckets));
    }
  }).observe(main, { childList: true, subtree: true });
};

(() => {
  const base = document.documentElement.dataset.base || "/";
  if (document.body.dataset.glossaryTooltips !== "true") return;

  const main = document.querySelector<HTMLElement>(".main");
  if (!main) return;

  activateTerms(main, automaticSwadeTerms.map(([name, original]) => ({
    name,
    definition: `[${original}][${swadeBook}]`,
    normalized: name.replace(/ё/g, "е"),
    kind: "swade" as const,
  })));

  fetch(`${base}glossary-index.json`)
    .then((response) => response.ok ? response.json() as Promise<Omit<GlossaryTerm, "normalized">[]> : [])
    .then((terms) => {
      activateTerms(main, terms
        .filter((term) => term.automatic)
        .map((term) => ({
          ...term,
          normalized: term.name.replace(/ё/g, "е"),
          kind: "glossary" as const,
        })));
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
    const dialog = target.closest<HTMLDialogElement>("dialog[open]");
    const host = dialog ?? document.body;
    if (popup.parentElement !== host) host.append(popup);
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

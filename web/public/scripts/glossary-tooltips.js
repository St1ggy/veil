(() => {
  const base = document.documentElement.dataset.base || "/";
  if (!document.querySelector(".prose, .page-header p, .summary")) return;
  fetch(`${base}glossary-index.json`).then((response) => response.ok ? response.json() : []).then((terms) => {
    const buckets = new Map();
    for (const term of terms) {
      const normalized = term.name.toLocaleLowerCase("ru").replace(/ё/g, "е");
      if (normalized.length < 4 || normalized.length > 100) continue;
      const bucket = buckets.get(normalized[0]) || [];
      bucket.push({ ...term, normalized });
      buckets.set(normalized[0], bucket);
    }
    for (const bucket of buckets.values()) bucket.sort((a, b) => b.normalized.length - a.normalized.length);
    const seen = new Set();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (!parent.closest(".prose, .page-header p, .summary")) return NodeFilter.FILTER_REJECT;
        if (parent.closest("a, abbr, code, pre, script, style, .glossary-wrap")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const original = node.nodeValue;
      const normalized = original.toLocaleLowerCase("ru").replace(/ё/g, "е");
      let best = null;
      for (let index = 0; index < normalized.length && !best; index += 1) {
        for (const term of buckets.get(normalized[index]) || []) {
          if (seen.has(term.normalized) || !normalized.startsWith(term.normalized, index)) continue;
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
      tooltip.title = best.term.definition.slice(0, 600);
      tooltip.dataset.href = best.term.href;
      tooltip.setAttribute("aria-label", `${label}: ${tooltip.title}`);
      fragment.append(tooltip, original.slice(best.index + label.length));
      node.replaceWith(fragment);
      seen.add(best.term.normalized);
    }
  }).catch(() => {});
})();

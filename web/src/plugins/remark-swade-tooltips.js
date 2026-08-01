import { visit } from "unist-util-visit";
import { swadeBook, swadeTerms } from "../data/swadeTerms.js";

const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function remarkSwadeTooltips() {
  return (tree) => {
    const seen = new Set();
    visit(tree, "text", (node, index, parent) => {
      if (!parent || typeof index !== "number" || ["link", "code", "inlineCode"].includes(parent.type)) return;
      let value = node.value;
      const children = [];
      while (value) {
        let best = null;
        for (const [ru, original] of swadeTerms) {
          if (seen.has(ru)) continue;
          const match = new RegExp(escape(ru), "iu").exec(value);
          if (match && (!best || match.index < best.match.index)) best = { ru, original, match };
        }
        if (!best) { children.push({ type: "text", value }); break; }
        if (best.match.index) children.push({ type: "text", value: value.slice(0, best.match.index) });
        const label = best.match[0];
        children.push({ type: "html", value: `<abbr class="term-tooltip" title="[${best.original}][${swadeBook}]">${label}</abbr>` });
        seen.add(best.ru);
        value = value.slice(best.match.index + label.length);
      }
      if (children.length > 1 || children[0]?.type === "html") {
        parent.children.splice(index, 1, ...children);
        return index + children.length;
      }
    });
  };
}

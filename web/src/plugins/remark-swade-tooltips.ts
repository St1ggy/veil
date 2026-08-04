import { visit } from "unist-util-visit";
import { automaticSwadeTerms, swadeBook } from "../data/swadeTerms";

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function remarkSwadeTooltips() {
  return (tree: any, file: any) => {
    const sourcePath = String(file?.path ?? "").replace(/\\/g, "/");
    if (!sourcePath.includes("06_game/")) return;

    const seen = new Set<string>();
    visit(tree, "text", (node: any, index: number | undefined, parent: any) => {
      // Keep headings as plain text: injected HTML changes Astro's generated id
      // and would make the book table of contents point at a non-existent anchor.
      if (!parent || typeof index !== "number" || ["heading", "link", "code", "inlineCode"].includes(parent.type)) return;
      let value = node.value;
      const children: any[] = [];
      while (value) {
        let best: { ru: string; original: string; match: RegExpExecArray } | null = null;
        for (const [ru, original] of automaticSwadeTerms) {
          if (seen.has(ru)) continue;
          const match = new RegExp(`(?<![\\p{L}\\p{N}])${escape(ru)}(?![\\p{L}\\p{N}])`, "u").exec(value);
          if (match && (!best || match.index < best.match.index)) best = { ru, original, match };
        }
        if (!best) { children.push({ type: "text", value }); break; }
        if (best.match.index) children.push({ type: "text", value: value.slice(0, best.match.index) });
        const label = best.match[0];
        children.push({ type: "html", value: `<abbr class="term-tooltip" data-tooltip="[${best.original}][${swadeBook}]" data-tooltip-kind="swade" tabindex="0">${label}</abbr>` });
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

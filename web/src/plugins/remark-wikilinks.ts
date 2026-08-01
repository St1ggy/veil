import { visit } from "unist-util-visit";

/**
 * Wikilinks become relative sibling entity URLs: ./ID
 * (entity pages live under /{lang}/entity/{ID})
 */
export function remarkWikilinks() {
  const pattern = /\[\[([A-Z][A-Z0-9_]*)(?:\|([^\]]+))?\]\]/g;

  return (tree: any) => {
    visit(tree, "text", (node: any, index: number | undefined, parent: any) => {
      if (!parent || typeof index !== "number" || !node.value?.includes("[[")) {
        return;
      }

      const value = node.value;
      const children: any[] = [];
      let last = 0;
      let match: RegExpExecArray | null;

      pattern.lastIndex = 0;
      while ((match = pattern.exec(value)) !== null) {
        if (match.index > last) {
          children.push({ type: "text", value: value.slice(last, match.index) });
        }
        const id = match[1];
        const label = match[2] || id;
        children.push({
          type: "link",
          url: `./${id}`,
          children: [{ type: "text", value: label }],
        });
        last = match.index + match[0].length;
      }

      if (children.length === 0) return;

      if (last < value.length) {
        children.push({ type: "text", value: value.slice(last) });
      }

      parent.children.splice(index, 1, ...children);
      return index + children.length;
    });
  };
}

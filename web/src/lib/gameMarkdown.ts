import { marked } from "marked";

/** Convert [[ENTITY_ID]] / [[ID|label]] to encyclopedia links. */
export function renderGameMarkdown(
  md: string,
  entityHrefFor: (id: string) => string,
): string {
  const withLinks = md.replace(
    /\[\[([A-Z][A-Z0-9_]*)(?:\|([^\]]+))?\]\]/g,
    (_m, id: string, label?: string) => {
      const text = label || id;
      return `[${text}](${entityHrefFor(id)})`;
    },
  );
  return marked.parse(withLinks, { async: false }) as string;
}

export function formatFieldValue(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    return value
      .map((v) => {
        if (typeof v === "string") return v;
        if (v && typeof v === "object" && "target" in v) {
          const o = v as { type?: string; target?: string };
          return o.type ? `${o.type} → ${o.target}` : String(o.target);
        }
        return JSON.stringify(v);
      })
      .join(", ");
  }
  if (typeof value === "object") {
    return "```json\n" + JSON.stringify(value, null, 2) + "\n```";
  }
  return String(value);
}

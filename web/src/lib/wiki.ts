import { getCollection, type CollectionEntry } from "astro:content";

export type WikiEntry = CollectionEntry<"wiki">;

function normalizeBase(base: string): string {
  if (!base || base === "/") return "/";
  return base.endsWith("/") ? base : `${base}/`;
}

export function withBase(path = ""): string {
  const base = normalizeBase(import.meta.env.BASE_URL || "/");
  const clean = path.replace(/^\//, "");
  if (!clean) return base === "/" ? "/" : base;
  return `${base}${clean}`;
}

export async function getWikiEntries(): Promise<WikiEntry[]> {
  const entries = await getCollection("wiki");
  return entries
    .filter((e) => e.data.visibility !== "gm")
    .filter((e) => !String(e.id).includes("_templates"))
    .sort((a, b) => a.data.title.localeCompare(b.data.title, "ru"));
}

export function entityHref(entityId: string): string {
  return withBase(`entity/${entityId}`);
}

export function absHref(path: string): string {
  return withBase(path);
}

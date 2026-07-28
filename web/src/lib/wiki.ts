import { getCollection, type CollectionEntry } from "astro:content";
import { categoryForType, type CategoryId } from "../i18n/categories";
import type { Lang } from "../i18n/ui";

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

export function langHome(lang: Lang): string {
  return withBase(lang);
}

export function categoryHref(lang: Lang, categoryId: CategoryId | string): string {
  return withBase(`${lang}/category/${categoryId}`);
}

export function entityHref(lang: Lang, entityId: string): string {
  return withBase(`${lang}/entity/${entityId}`);
}

export function aboutHref(lang: Lang): string {
  return withBase(`${lang}/about`);
}

export function glossaryHref(lang: Lang): string {
  return withBase(`${lang}/glossary`);
}

export function switchLangHref(currentLang: Lang, pathAfterLang: string): string {
  const other: Lang = currentLang === "ru" ? "en" : "ru";
  const rest = pathAfterLang.replace(/^\/+/, "");
  return withBase(rest ? `${other}/${rest}` : other);
}

export async function getWikiEntries(): Promise<WikiEntry[]> {
  const entries = await getCollection("wiki");
  return entries
    .filter((e) => e.data.visibility !== "gm")
    .filter((e) => !String(e.id).includes("_templates"))
    .filter((e) => e.data.id !== "WIKI_HOME")
    .sort((a, b) => a.data.title.localeCompare(b.data.title, "ru"));
}

export function entriesInCategory(entries: WikiEntry[], categoryId: CategoryId): WikiEntry[] {
  return entries.filter((e) => categoryForType(e.data.type)?.id === categoryId);
}

/** Prefer Latin/English alias for EN UI; fall back to title. */
export function displayTitle(entry: WikiEntry, lang: Lang): string {
  if (lang === "ru") return entry.data.title;
  const aliases = entry.data.aliases ?? [];
  const latin = aliases.find((a) => /^[A-Za-z0-9]/.test(a));
  return latin || entry.data.title;
}

export function displaySummary(entry: WikiEntry, lang: Lang): string | undefined {
  // Summaries are authored in Russian for now.
  if (lang === "en") return entry.data.summary;
  return entry.data.summary;
}

export const featuredIds = [
  "COS_ETHER",
  "COS_VEIL",
  "MAG_PROBABILITY",
  "EVENT_GREAT_AWAKENING",
  "CONCEPT_ARCANUM",
  "COUNTRY_AEGIS",
];

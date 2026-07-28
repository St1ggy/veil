import { getCollection, type CollectionEntry } from "astro:content";
import { categoryForType, type CategoryId } from "../i18n/categories";
import type { Lang } from "../i18n/ui";

export type WikiEntry = CollectionEntry<"wiki"> | CollectionEntry<"wikiEn">;

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

export function systemHref(lang: Lang): string {
  return withBase(`${lang}/system`);
}

export function glossaryHref(lang: Lang): string {
  return withBase(`${lang}/glossary`);
}

export function gameHref(lang: Lang): string {
  return withBase(`${lang}/game`);
}

export function gameSectionHref(lang: Lang, sectionId: string): string {
  return withBase(`${lang}/game/${sectionId}`);
}

export function gameItemHref(
  lang: Lang,
  sectionId: string,
  slug: string,
): string {
  return withBase(`${lang}/game/${sectionId}/${slug}`);
}

export function switchLangHref(currentLang: Lang, pathAfterLang: string): string {
  const other: Lang = currentLang === "ru" ? "en" : "ru";
  const rest = pathAfterLang.replace(/^\/+/, "");
  return withBase(rest ? `${other}/${rest}` : other);
}

export async function getWikiEntries(lang: Lang = "ru"): Promise<WikiEntry[]> {
  const entries =
    lang === "en" ? await getCollection("wikiEn") : await getCollection("wiki");
  const locale = lang === "en" ? "en" : "ru";
  return entries
    .filter((e) => e.data.visibility !== "gm")
    .filter((e) => !String(e.id).includes("_templates"))
    .filter((e) => e.data.id !== "WIKI_HOME")
    .sort((a, b) => a.data.title.localeCompare(b.data.title, locale));
}

export function entriesInCategory(entries: WikiEntry[], categoryId: CategoryId): WikiEntry[] {
  return entries.filter((e) => categoryForType(e.data.type)?.id === categoryId);
}

export function displayTitle(entry: WikiEntry, _lang?: Lang): string {
  return entry.data.title;
}

export function displaySummary(entry: WikiEntry, _lang?: Lang): string | undefined {
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

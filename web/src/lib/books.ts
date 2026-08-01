import { getCollection, type CollectionEntry } from "astro:content";
import { marked } from "marked";
import type { Lang } from "../i18n/ui";
import { withBase } from "./wiki";
import { swadeBook, swadeTerms } from "../data/swadeTerms.js";

export type BookEntry = CollectionEntry<"rawBooks">;

export interface BookSection {
  book: BookEntry;
  title: string;
  slug: string;
  level: number;
  markdown: string;
  summary: string;
  order: number;
}

const SECTION_NAMES: Record<string, string> = {
  "00_meta": "О проекте",
  "01_foundations": "Основы мира",
  "02_world": "Мир",
  "03_civilization": "Цивилизация",
  "04_organizations": "Организации",
  "05_conflicts": "Конфликты и безопасность",
  "06_game": "Игра",
};

export function slugify(value: string): string {
  return value
    .toLocaleLowerCase("ru")
    .replace(/[№#]/g, "")
    .replace(/[^а-яёa-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "section";
}

export async function getBooks(): Promise<BookEntry[]> {
  return (await getCollection("rawBooks")).sort((a, b) =>
    a.id.localeCompare(b.id, "ru", { numeric: true }),
  );
}

export function bookGroup(book: BookEntry): string {
  return SECTION_NAMES[String(book.id).split("/")[0]] ?? "Другие книги";
}

export function bookHref(lang: Lang, id: string): string {
  return withBase(`${lang}/book/${encodeURIComponent(id)}`);
}

export function articleHref(lang: Lang, section: BookSection): string {
  return withBase(
    `${lang}/article/${encodeURIComponent(section.book.data.id)}/${section.slug}`,
  );
}

export function plainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`|\[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function bookSummary(book: BookEntry): string {
  const text = plainText(book.body).replace(book.data.title, "").trim();
  return text.slice(0, 240).replace(/\s+\S*$/, "") + (text.length > 240 ? "…" : "");
}

export function sectionsOf(book: BookEntry): BookSection[] {
  const matches = [...book.body.matchAll(/^(#{2,4})\s+(.+?)\s*$/gm)];
  const used = new Map<string, number>();
  return matches.map((match, order) => {
    const start = (match.index ?? 0) + match[0].length;
    let end = book.body.length;
    const level = match[1].length;
    for (const following of matches.slice(order + 1)) {
      if (following[1].length <= level) {
        end = following.index ?? end;
        break;
      }
    }
    const title = match[2].replace(/^\d+(?:\.\d+)*\.\s*/, "").trim();
    const base = slugify(title);
    const number = (used.get(base) ?? 0) + 1;
    used.set(base, number);
    const slug = number === 1 ? base : `${base}-${number}`;
    const markdown = book.body.slice(start, end).trim();
    const summary = plainText(markdown).slice(0, 280).replace(/\s+\S*$/, "");
    return { book, title, slug, level, markdown, summary, order };
  }).filter((section) => section.markdown.length > 40);
}

export function renderMarkdown(markdown: string): string {
  let prepared = markdown;
  for (const [ru, original] of swadeTerms) {
    const pattern = new RegExp(ru.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "iu");
    prepared = prepared.replace(pattern, (label) => `<abbr class="term-tooltip" title="[${original}][${swadeBook}]">${label}</abbr>`);
  }
  return marked.parse(prepared) as string;
}

export function allSections(books: BookEntry[]): BookSection[] {
  return books.flatMap(sectionsOf);
}

export function relatedSections(current: BookSection, all: BookSection[]): BookSection[] {
  const words = new Set(slugify(current.title).split("-").filter((word) => word.length > 4));
  return all
    .filter((candidate) => candidate !== current)
    .map((candidate) => ({
      candidate,
      score: slugify(candidate.title).split("-").filter((word) => words.has(word)).length
        + (candidate.book.data.id === current.book.data.id ? 0.5 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ candidate }) => candidate);
}

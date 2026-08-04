import type { Lang } from "../i18n/ui";
import { sortedGlossary } from "../data/glossary";
import { allSections, articleHref, getBooks } from "./books";
import { entityHref } from "./wiki";

export interface PublishedGlossaryTerm {
  name: string;
  definition: string;
  href: string;
  source: string;
  automatic: boolean;
}

const ignored = new Set([
  "назначение документа",
  "введение",
  "заключение",
  "общие положения",
  "общая характеристика",
  "вывод",
  "см также",
  "связанные документы",
]);

export async function publishedGlossary(lang: Lang): Promise<PublishedGlossaryTerm[]> {
  const manual = sortedGlossary(lang).map((term) => ({
    name: term.term[lang],
    definition: term.definition[lang],
    href: entityHref(lang, term.id),
    source: term.id,
    automatic: true,
  }));
  const generated = lang === "ru"
    ? allSections(await getBooks())
        .filter((section) => section.title.length >= 3 && section.title.length <= 100)
        .filter((section) => !ignored.has(section.title.toLocaleLowerCase("ru")))
        .map((section) => ({
          name: section.title,
          definition: section.summary || `Раздел книги «${section.book.data.title}».`,
          href: articleHref(lang, section),
          source: section.book.data.title,
          automatic: false,
        }))
    : [];
  const byName = new Map<string, PublishedGlossaryTerm>();
  for (const term of [...manual, ...generated]) {
    const key = term.name.toLocaleLowerCase(lang).replace(/[^а-яёa-z0-9]+/g, " ").trim();
    const current = byName.get(key);
    if (
      !current
      || (term.automatic && !current.automatic)
      || (term.automatic === current.automatic && term.definition.length > current.definition.length)
    ) {
      byName.set(key, term);
    }
  }
  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name, lang));
}

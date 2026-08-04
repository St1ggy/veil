import type { BookEntry } from "./books";
import { renderMarkdown } from "./books";

export interface GalleryCharacter {
  id: string;
  numberLabel: string;
  name: string;
  image?: string;
  imageAlt: string;
  primaryMeta: string;
  secondaryMeta: string;
  badge: string;
  badgeTone: "active" | "muted" | "exceptional";
  html: string;
  filters: Record<string, string>;
  search: string;
}

function fieldValue(body: string, label: string): string {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return body
    .match(new RegExp(`\\*\\*${escaped}:\\*\\*\\s*([\\s\\S]*?)(?=\\s*\\*\\*[^*\\n]+:\\*\\*|\\n\\s*\\n|$)`, "u"))?.[1]
    ?.replace(/\s+/g, " ")
    .replace(/[.;]$/u, "")
    .trim() ?? "";
}

function normalizePeople(people: string): string {
  const normalized = people.toLocaleLowerCase("ru");
  if (normalized.startsWith("перевёртыш")) return "перевёртыш";
  if (normalized.startsWith("конструкт")) return "конструкт";
  return people.replace(/[.;]$/u, "").trim();
}

function searchText(values: string[]): string {
  return values.join(" ").toLocaleLowerCase("ru").replace(/ё/g, "е");
}

function compassValues(compass: string): [string, string, string] {
  const values = compass.split("·").map((value) => value.trim()).filter(Boolean);
  return [values[0] ?? "неизвестно", values[1] ?? "неизвестно", values[2] ?? "неизвестно"];
}

function imageSlug(name: string): string {
  const letters: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y",
    к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
    х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };
  const slug = name.toLocaleLowerCase("ru").replace(/[а-яё]/gu, (letter) => letters[letter] ?? letter)
    .replace(/[^a-z0-9]+/gu, "-").replace(/^-+|-+$/gu, "");
  const legacyImageSlugs: Record<string, string> = {
    "bran-mednyy": "bran-medny",
    "halid-nulevoy-chas": "khalid-nulevoy-chas",
    "kern-bez-treschin": "kern-bez-treshchin",
    "tor-kaan-schitayuschiy-plamya": "tor-kaan-schitayushchiy-plamya",
    "spyaschiy-bazalt": "spyashchiy-bazalt",
    "okean-iduschih-imen": "okean-idushchih-imen",
    "urg-saan-nesuschiy-den": "urg-saan-nesushchiy-den",
  };
  return legacyImageSlugs[slug] ?? slug;
}

export function parsePregens(book: BookEntry, imageByNumber: Map<number, string>): GalleryCharacter[] {
  const blocks = [...book.body.matchAll(/^###\s+(\d+)\.\s+(.+?)\n([\s\S]*?)(?=^###\s+\d+\.|(?![\s\S]))/gm)];
  return blocks.map((match) => {
    const number = Number(match[1]);
    const name = match[2].trim();
    const body = match[3].trim();
    const people = fieldValue(body, "Народ");
    const peopleGroup = normalizePeople(people);
    const role = fieldValue(body, "Роль");
    const profession = fieldValue(body, "Профессия");
    const gender = fieldValue(body, "Пол").replace(/[.;]$/u, "").trim();
    const ether = fieldValue(body, "Эфирологический профиль");
    const compass = fieldValue(body, "Куб выбора").replace(/[.;]$/u, "").trim();
    const [care, method, change] = compassValues(compass);
    const magical = !ether.toLocaleLowerCase("ru").startsWith("отсутствует");
    return {
      id: `pregen-${number}`,
      numberLabel: `№ ${number}`,
      name,
      image: imageByNumber.get(number),
      imageAlt: `Портрет: ${name}`,
      primaryMeta: `${peopleGroup} · ${role}`,
      secondaryMeta: profession,
      badge: magical ? "Связан с Эфиром" : "Без эфирологии",
      badgeTone: magical ? "active" : "muted",
      html: renderMarkdown(body, { swadeTooltips: true }),
      filters: {
        people: peopleGroup,
        ether: magical ? "yes" : "no",
        gender,
        care,
        method,
        change,
      },
      search: searchText([name, people, role, profession, compass]),
    };
  });
}

export function parseAscended(
  book: BookEntry,
  imageBySlug: Map<string, string>,
  firstImage?: string,
): GalleryCharacter[] {
  const firstMatch = book.body.match(/^### Первый\n([\s\S]*?)(?=^##\s+\d+\.|(?![\s\S]))/m);
  const firstBody = firstMatch?.[1]?.trim() ?? "";
  const first: GalleryCharacter = {
    id: "ascended-first",
    numberLabel: "Особая запись",
    name: "Первый",
    image: firstImage,
    imageAlt: "Символическая реконструкция Первого",
    primaryMeta: "Вознесшийся · вне степеней",
    secondaryMeta: "Подтверждён только Домен Вознесения",
    badge: "Вознесшийся",
    badgeTone: "exceptional",
    html: renderMarkdown(firstBody, { swadeTooltips: true }),
    filters: {
      people: "неизвестно",
      degree: "outside",
      care: "неизвестно",
      method: "неизвестно",
      change: "неизвестно",
    },
    search: searchText(["Первый", "Вознесшийся", "Вознесение"]),
  };

  const degreeSections = [...book.body.matchAll(/^##\s+\d+\.\s+Вознесённые степени\s+(\d+)\s*\n([\s\S]*?)(?=^##\s+\d+\.|(?![\s\S]))/gm)];
  let sequence = 0;
  const ascended = degreeSections.flatMap((sectionMatch) => {
    const degree = sectionMatch[1];
    const sectionBody = sectionMatch[2];
    const blocks = [...sectionBody.matchAll(/^###\s+\d+\.\s+(.+?)\n([\s\S]*?)(?=^###\s+\d+\.|(?![\s\S]))/gm)];
    return blocks.map((match) => {
      sequence += 1;
      const name = match[1].trim();
      const body = match[2].trim();
      const people = fieldValue(body, "Народ");
      const domains = fieldValue(body, "Домены");
      const status = fieldValue(body, "Статус");
      const compass = fieldValue(body, "Куб выбора").replace(/[.;]$/u, "").trim();
      const [care, method, change] = compassValues(compass);
      const peopleGroup = normalizePeople(people);
      return {
        id: `ascended-${sequence}`,
        numberLabel: `№ ${sequence} · степень ${degree}`,
        name,
        image: imageBySlug.get(imageSlug(name)),
        imageAlt: `Портрет Вознесённого: ${name}`,
        primaryMeta: `${peopleGroup} · степень ${degree}`,
        secondaryMeta: domains ? `Домены: ${domains}` : status,
        badge: `${degree}-я степень`,
        badgeTone: degree === "6" ? "exceptional" : "active",
        html: renderMarkdown(body, { swadeTooltips: true }),
        filters: {
          people: peopleGroup,
          degree,
          care,
          method,
          change,
        },
        search: searchText([name, people, domains, status, compass]),
      } satisfies GalleryCharacter;
    });
  });

  return [first, ...ascended];
}

export function fieldOptions(
  characters: GalleryCharacter[],
  field: string,
): string[] {
  return [...new Set(characters.map((item) => item.filters[field]).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "ru", { numeric: true }));
}

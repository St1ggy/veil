import type { Lang } from "./ui";

export type CategoryId =
  | "cosmology"
  | "history"
  | "magic"
  | "technology"
  | "races"
  | "countries"
  | "factions"
  | "concepts"
  | "phenomena";

export interface CategoryDef {
  id: CategoryId;
  types: string[];
  order: number;
  label: Record<Lang, string>;
  description: Record<Lang, string>;
}

export const categories: CategoryDef[] = [
  {
    id: "cosmology",
    types: ["cosmology"],
    order: 1,
    label: { ru: "Космология", en: "Cosmology" },
    description: {
      ru: "Эфир, Вуаль, материальный мир, архетипы.",
      en: "Ether, the Veil, the material world, archetypes.",
    },
  },
  {
    id: "history",
    types: ["event", "era"],
    order: 2,
    label: { ru: "История", en: "History" },
    description: {
      ru: "Эпохи, Пробуждение, войны, Звёздный Дождь.",
      en: "Eras, the Awakening, wars, Starfall.",
    },
  },
  {
    id: "magic",
    types: ["magic"],
    order: 3,
    label: { ru: "Магия", en: "Magic" },
    description: {
      ru: "Вероятностная магия, сетевые практики, цена силы.",
      en: "Probability magic, network practices, the cost of power.",
    },
  },
  {
    id: "phenomena",
    types: ["phenomenon"],
    order: 4,
    label: { ru: "Явления", en: "Phenomena" },
    description: {
      ru: "Выгорание, Вероятностный Распад, эфирные штормы.",
      en: "Burnout, Probabilistic Decay, ether storms.",
    },
  },
  {
    id: "technology",
    types: ["technology"],
    order: 5,
    label: { ru: "Технологии", en: "Technology" },
    description: {
      ru: "Классика, гибриды, Нулевые Поля, ИИ.",
      en: "Classical tech, hybrids, Null Fields, AI.",
    },
  },
  {
    id: "races",
    types: ["race"],
    order: 6,
    label: { ru: "Расы", en: "Ancestries" },
    description: {
      ru: "Народы Земли 2435 без шаблонов D&D.",
      en: "Peoples of Earth 2435 — not D&D templates.",
    },
  },
  {
    id: "countries",
    types: ["country"],
    order: 7,
    label: { ru: "Государства", en: "States" },
    description: {
      ru: "Эгида, Вердана, Лига и другие полисы.",
      en: "Aegis, Verdana, the League, and other polities.",
    },
  },
  {
    id: "factions",
    types: ["organization", "faction"],
    order: 8,
    label: { ru: "Фракции", en: "Factions" },
    description: {
      ru: "Ордена, синдикаты, культы и их интересы.",
      en: "Orders, syndicates, cults, and their interests.",
    },
  },
  {
    id: "concepts",
    types: ["concept", "meta"],
    order: 9,
    label: { ru: "Концепты", en: "Concepts" },
    description: {
      ru: "Принципы мира, божественность, Домены, кампании.",
      en: "World principles, divinity, Domains, campaigns.",
    },
  },
];

export function categoryById(id: string): CategoryDef | undefined {
  return categories.find((c) => c.id === id);
}

export function categoryForType(type: string | undefined): CategoryDef | undefined {
  if (!type) return undefined;
  return categories.find((c) => c.types.includes(type));
}

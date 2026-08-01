import type { Lang } from "./ui";

export type GameSectionId =
  | "chargen"
  | "ancestries"
  | "edges"
  | "hindrances"
  | "powers"
  | "rules"
  | "equipment"
  | "economy"
  | "primers"
  | "npc"
  | "bestiary"
  | "factions"
  | "campaigns"
  | "design"
  | "systems";

export interface GameSection {
  id: GameSectionId;
  /** Paths under game/ that belong to this section */
  roots: string[];
  label: Record<Lang, string>;
  description: Record<Lang, string>;
}

export const gameSections: GameSection[] = [
  {
    id: "chargen",
    roots: ["player/chargen"],
    label: { ru: "Создание персонажа", en: "Создание персонажа" },
    description: {
      ru: "Этапы создания персонажа, происхождение, культура, богатство и прогрессия.",
      en: "Этапы создания персонажа, происхождение, культура, богатство и прогрессия.",
    },
  },
  {
    id: "ancestries",
    roots: ["player/ancestries"],
    label: { ru: "Происхождения", en: "Происхождения" },
    description: {
      ru: "Пакеты происхождений, связанные с народами энциклопедии.",
      en: "Пакеты происхождений, связанные с народами энциклопедии.",
    },
  },
  {
    id: "edges",
    roots: ["player/edges"],
    label: { ru: "Черты", en: "Черты" },
    description: {
      ru: "Черты сеттинга без перепечатки основных правил «Диких Миров».",
      en: "Черты сеттинга без перепечатки основных правил «Диких Миров».",
    },
  },
  {
    id: "hindrances",
    roots: ["player/hindrances"],
    label: { ru: "Помехи", en: "Помехи" },
    description: {
      ru: "Помехи сеттинга и нарративные ограничения.",
      en: "Помехи сеттинга и нарративные ограничения.",
    },
  },
  {
    id: "powers",
    roots: ["player/powers", "player/arcane_backgrounds"],
    label: { ru: "Силы и Мистические дары", en: "Силы и Мистические дары" },
    description: {
      ru: "Разработка Мистических даров и проявлений и рисков сил.",
      en: "Разработка Мистических даров и проявлений и рисков сил.",
    },
  },
  {
    id: "rules",
    roots: ["player/setting_rules", "player/rules"],
    label: { ru: "Правила сеттинга", en: "Правила сеттинга" },
    description: {
      ru: "Правила сеттинга и расширения правил «Вуали Миров».",
      en: "Правила сеттинга и расширения правил «Вуали Миров».",
    },
  },
  {
    id: "equipment",
    roots: ["player/equipment", "player/vehicles", "player/crafting"],
    label: { ru: "Снаряжение", en: "Снаряжение" },
    description: {
      ru: "Снаряжение, транспорт и создание предметов.",
      en: "Снаряжение, транспорт и создание предметов.",
    },
  },
  {
    id: "economy",
    roots: ["player/economy", "player/reputation"],
    label: { ru: "Экономика", en: "Экономика" },
    description: {
      ru: "Рынки, дефицит, репутация и фракционная экономика.",
      en: "Рынки, дефицит, репутация и фракционная экономика.",
    },
  },
  {
    id: "primers",
    roots: ["player/primers", "player/character_options"],
    label: { ru: "Вводные материалы", en: "Вводные материалы" },
    description: {
      ru: "Краткие вводные для игроков и опции персонажа.",
      en: "Краткие вводные для игроков и опции персонажа.",
    },
  },
  {
    id: "npc",
    roots: ["npc"],
    label: { ru: "Персонажи ведущего", en: "Персонажи ведущего" },
    description: {
      ru: "Архетипы и игровой слой персонажей ведущего без его секретов.",
      en: "Архетипы и игровой слой персонажей ведущего без его секретов.",
    },
  },
  {
    id: "bestiary",
    roots: ["bestiary"],
    label: { ru: "Бестиарий", en: "Бестиарий" },
    description: {
      ru: "Существа и шаблоны угроз сеттинга.",
      en: "Существа и шаблоны угроз сеттинга.",
    },
  },
  {
    id: "factions",
    roots: ["factions"],
    label: { ru: "Фракции в игре", en: "Фракции в игре" },
    description: {
      ru: "Игровой слой фракций поверх лора энциклопедии.",
      en: "Игровой слой фракций поверх лора энциклопедии.",
    },
  },
  {
    id: "campaigns",
    roots: ["campaigns"],
    label: { ru: "Кампании", en: "Кампании" },
    description: {
      ru: "Режимы кампаний: детектив, политика, песочница и др.",
      en: "Режимы кампаний: детектив, политика, песочница и др.",
    },
  },
  {
    id: "design",
    roots: ["design"],
    label: { ru: "Дизайн", en: "Дизайн" },
    description: {
      ru: "Философии баланса, бюджетов и опыта игроков и ведущего.",
      en: "Философии баланса, бюджетов и опыта игроков и ведущего.",
    },
  },
  {
    id: "systems",
    roots: ["systems"],
    label: { ru: "Подсистемы", en: "Подсистемы" },
    description: {
      ru: "Отдельные игровые подсистемы сеттинга.",
      en: "Отдельные игровые подсистемы сеттинга.",
    },
  },
];

export function gameSectionById(id: string): GameSection | undefined {
  return gameSections.find((s) => s.id === id);
}

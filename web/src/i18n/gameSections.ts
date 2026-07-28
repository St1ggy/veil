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
    label: { ru: "Создание персонажа", en: "Character creation" },
    description: {
      ru: "Шаги chargen, происхождение, культура, богатство и прогрессия.",
      en: "Chargen steps, origin, culture, wealth, and progression.",
    },
  },
  {
    id: "ancestries",
    roots: ["player/ancestries"],
    label: { ru: "Происхождения", en: "Ancestries" },
    description: {
      ru: "Пакеты происхождений, связанные с расами энциклопедии.",
      en: "Ancestry packages linked to encyclopedia races.",
    },
  },
  {
    id: "edges",
    roots: ["player/edges"],
    label: { ru: "Edges", en: "Edges" },
    description: {
      ru: "Сеттинговые Edges (без перепечатки core SWADE).",
      en: "Setting Edges (no SWADE core reprint).",
    },
  },
  {
    id: "hindrances",
    roots: ["player/hindrances"],
    label: { ru: "Hindrances", en: "Hindrances" },
    description: {
      ru: "Сеттинговые Hindrances и нарративные ограничения.",
      en: "Setting Hindrances and narrative constraints.",
    },
  },
  {
    id: "powers",
    roots: ["player/powers", "player/arcane_backgrounds"],
    label: { ru: "Силы и AB", en: "Powers & AB" },
    description: {
      ru: "Дизайн Arcane Backgrounds, trapping’ов и рисков сил.",
      en: "Arcane Background design, trappings, and power risks.",
    },
  },
  {
    id: "rules",
    roots: ["player/setting_rules", "player/rules"],
    label: { ru: "Правила сеттинга", en: "Setting rules" },
    description: {
      ru: "Setting Rules и расширения правил Veil.",
      en: "Setting Rules and Veil rule extensions.",
    },
  },
  {
    id: "equipment",
    roots: ["player/equipment", "player/vehicles", "player/crafting"],
    label: { ru: "Снаряжение", en: "Gear & craft" },
    description: {
      ru: "Экипировка, транспорт и крафт.",
      en: "Equipment, vehicles, and crafting.",
    },
  },
  {
    id: "economy",
    roots: ["player/economy", "player/reputation"],
    label: { ru: "Экономика", en: "Economy" },
    description: {
      ru: "Рынки, дефицит, репутация и фракционная экономика.",
      en: "Markets, scarcity, reputation, and faction economies.",
    },
  },
  {
    id: "primers",
    roots: ["player/primers", "player/character_options"],
    label: { ru: "Праймеры", en: "Primers" },
    description: {
      ru: "Краткие вводные для игроков и опции персонажа.",
      en: "Player primers and character options.",
    },
  },
  {
    id: "npc",
    roots: ["npc"],
    label: { ru: "NPC", en: "NPCs" },
    description: {
      ru: "Архетипы и play-слой NPC (без GM-секретов).",
      en: "NPC archetypes and play layer (no GM secrets).",
    },
  },
  {
    id: "bestiary",
    roots: ["bestiary"],
    label: { ru: "Бестиарий", en: "Bestiary" },
    description: {
      ru: "Существа и шаблоны угроз сеттинга.",
      en: "Creatures and setting threat templates.",
    },
  },
  {
    id: "factions",
    roots: ["factions"],
    label: { ru: "Фракции (play)", en: "Factions (play)" },
    description: {
      ru: "Игровой слой фракций поверх лора энциклопедии.",
      en: "Play-layer factions on top of encyclopedia lore.",
    },
  },
  {
    id: "campaigns",
    roots: ["campaigns"],
    label: { ru: "Кампании", en: "Campaigns" },
    description: {
      ru: "Режимы кампаний: детектив, политика, песочница и др.",
      en: "Campaign modes: detective, politics, sandbox, and more.",
    },
  },
  {
    id: "design",
    roots: ["design"],
    label: { ru: "Дизайн", en: "Design" },
    description: {
      ru: "Философии баланса, бюджетов и опыта игрока/ГМа.",
      en: "Balance philosophies, budgets, and PX/GM experience.",
    },
  },
  {
    id: "systems",
    roots: ["systems"],
    label: { ru: "Подсистемы", en: "Subsystems" },
    description: {
      ru: "Отдельные игровые подсистемы сеттинга.",
      en: "Standalone setting play subsystems.",
    },
  },
];

export function gameSectionById(id: string): GameSection | undefined {
  return gameSections.find((s) => s.id === id);
}

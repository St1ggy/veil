import type { Lang } from "./ui";

type Dict = Record<string, Record<Lang, string>>;

const entityTypes: Dict = {
  book: { ru: "книга", en: "книга" },
  cosmology: { ru: "космология", en: "космология" },
  event: { ru: "событие", en: "событие" },
  era: { ru: "эпоха", en: "эпоха" },
  magic: { ru: "эфирология", en: "эфирология" },
  phenomenon: { ru: "явление", en: "явление" },
  technology: { ru: "технология", en: "технология" },
  race: { ru: "народ", en: "народ" },
  country: { ru: "государство", en: "государство" },
  organization: { ru: "организация", en: "организация" },
  faction: { ru: "фракция", en: "фракция" },
  concept: { ru: "понятие", en: "понятие" },
  meta: { ru: "метаданные", en: "метаданные" },
  edge: { ru: "Черта", en: "Черта" },
  hindrance: { ru: "Изъян", en: "Изъян" },
  ancestry: { ru: "происхождение", en: "происхождение" },
  arcane_background: { ru: "Мистический дар", en: "Мистический дар" },
  power_modifier: { ru: "модификатор силы", en: "модификатор силы" },
  power_design: { ru: "проектирование силы", en: "проектирование силы" },
  setting_rule: { ru: "правило мира", en: "правило мира" },
  campaign: { ru: "кампания", en: "кампания" },
  npc_archetype: { ru: "архетип персонажа ведущего", en: "архетип персонажа ведущего" },
};

const statuses: Dict = {
  draft: { ru: "черновик", en: "черновик" },
  research: { ru: "исследование", en: "исследование" },
  discussion: { ru: "обсуждение", en: "обсуждение" },
  approved: { ru: "утверждено", en: "утверждено" },
  canon: { ru: "канон", en: "канон" },
  deprecated: { ru: "устарело", en: "устарело" },
  retconned: { ru: "пересмотрено", en: "пересмотрено" },
  archived: { ru: "архив", en: "архив" },
  experimental: { ru: "эксперимент", en: "эксперимент" },
};

const importance: Dict = {
  core: { ru: "ядро", en: "ядро" },
  major: { ru: "важное", en: "важное" },
  minor: { ru: "второстепенное", en: "второстепенное" },
  flavor: { ru: "атмосферное", en: "атмосферное" },
};

const spoilers: Dict = {
  none: { ru: "без спойлеров", en: "без спойлеров" },
  soft: { ru: "мягкие спойлеры", en: "мягкие спойлеры" },
  hard: { ru: "жёсткие спойлеры", en: "жёсткие спойлеры" },
  gm: { ru: "только для ведущего", en: "только для ведущего" },
};

const visibility: Dict = {
  public: { ru: "публичное", en: "публичное" },
  player: { ru: "для игроков", en: "для игроков" },
  gm: { ru: "для ведущего", en: "для ведущего" },
};

const tags: Dict = {
  ai: { ru: "ИИ", en: "ИИ" },
  antimagic: { ru: "эфирное подавление", en: "эфирное подавление" },
  cosmology: { ru: "космология", en: "космология" },
  cost: { ru: "цена", en: "цена" },
  crime: { ru: "преступность", en: "преступность" },
  era: { ru: "эпоха", en: "эпоха" },
  game: { ru: "игра", en: "игра" },
  geography: { ru: "география", en: "география" },
  history: { ru: "история", en: "история" },
  ideology: { ru: "идеология", en: "идеология" },
  information: { ru: "информация", en: "информация" },
  magic: { ru: "эфирология", en: "эфирология" },
  meta: { ru: "мета", en: "мета" },
  ocean: { ru: "океан", en: "океан" },
  orbit: { ru: "орбита", en: "орбита" },
  politics: { ru: "политика", en: "политика" },
  races: { ru: "народы", en: "народы" },
  religion: { ru: "религия", en: "религия" },
  scavenging: { ru: "сбор ресурсов", en: "сбор ресурсов" },
  style: { ru: "стиль", en: "стиль" },
  technology: { ru: "технологии", en: "технологии" },
  trade: { ru: "торговля", en: "торговля" },
  war: { ru: "война", en: "война" },
};

const relations: Dict = {
  part_of: { ru: "входит в", en: "входит в" },
  contains: { ru: "содержит", en: "содержит" },
  member_of: { ru: "входит в", en: "входит в" },
  leads: { ru: "возглавляет", en: "возглавляет" },
  occurs_during: { ru: "во время", en: "во время" },
  occurs_at: { ru: "в месте", en: "в месте" },
  uses: { ru: "использует", en: "использует" },
  worships: { ru: "почитает", en: "почитает" },
  originates_from: { ru: "происходит из", en: "происходит из" },
  mentioned_in: { ru: "упоминается в", en: "упоминается в" },
  conflicts_with: { ru: "конфликтует с", en: "конфликтует с" },
  allied_with: { ru: "союз с", en: "союз с" },
  successor_of: { ru: "является преемником", en: "является преемником" },
  caused_by: { ru: "вызвано", en: "вызвано" },
  enables: { ru: "делает возможным", en: "делает возможным" },
  related_to: { ru: "связано с", en: "связано с" },
};

function lookup(dict: Dict, value: string, lang: Lang): string {
  return dict[value]?.[lang] ?? value;
}

export function labelType(value: string, lang: Lang): string {
  return lookup(entityTypes, value, lang);
}

export function labelStatus(value: string, lang: Lang): string {
  return lookup(statuses, value, lang);
}

export function labelImportance(value: string, lang: Lang): string {
  return lookup(importance, value, lang);
}

export function labelSpoiler(value: string, lang: Lang): string {
  return lookup(spoilers, value, lang);
}

export function labelVisibility(value: string, lang: Lang): string {
  return lookup(visibility, value, lang);
}

export function labelTag(value: string, lang: Lang): string {
  return lookup(tags, value, lang);
}

export function labelRelation(value: string, lang: Lang): string {
  return lookup(relations, value, lang);
}

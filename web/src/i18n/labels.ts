import type { Lang } from "./ui";

type Dict = Record<string, Record<Lang, string>>;

const entityTypes: Dict = {
  book: { ru: "книга", en: "book" },
  cosmology: { ru: "космология", en: "cosmology" },
  event: { ru: "событие", en: "event" },
  era: { ru: "эпоха", en: "era" },
  magic: { ru: "магия", en: "magic" },
  phenomenon: { ru: "явление", en: "phenomenon" },
  technology: { ru: "технология", en: "technology" },
  race: { ru: "раса", en: "ancestry" },
  country: { ru: "государство", en: "state" },
  organization: { ru: "организация", en: "organization" },
  faction: { ru: "фракция", en: "faction" },
  concept: { ru: "концепт", en: "concept" },
  meta: { ru: "мета", en: "meta" },
  edge: { ru: "edge", en: "edge" },
  hindrance: { ru: "hindrance", en: "hindrance" },
  ancestry: { ru: "происхождение", en: "ancestry" },
  power_modifier: { ru: "модификатор силы", en: "power modifier" },
  power_design: { ru: "дизайн силы", en: "power design" },
  setting_rule: { ru: "правило сеттинга", en: "setting rule" },
  campaign: { ru: "кампания", en: "campaign" },
  npc_archetype: { ru: "архетип NPC", en: "NPC archetype" },
};

const statuses: Dict = {
  draft: { ru: "черновик", en: "draft" },
  research: { ru: "исследование", en: "research" },
  discussion: { ru: "обсуждение", en: "discussion" },
  approved: { ru: "утверждено", en: "approved" },
  canon: { ru: "канон", en: "canon" },
  deprecated: { ru: "устарело", en: "deprecated" },
  retconned: { ru: "рекон", en: "retconned" },
  archived: { ru: "архив", en: "archived" },
  experimental: { ru: "эксперимент", en: "experimental" },
};

const importance: Dict = {
  core: { ru: "ядро", en: "core" },
  major: { ru: "важное", en: "major" },
  minor: { ru: "второстепенное", en: "minor" },
  flavor: { ru: "флёр", en: "flavor" },
};

const spoilers: Dict = {
  none: { ru: "без спойлеров", en: "none" },
  soft: { ru: "мягкие спойлеры", en: "soft" },
  hard: { ru: "жёсткие спойлеры", en: "hard" },
  gm: { ru: "только для мастера", en: "GM only" },
};

const visibility: Dict = {
  public: { ru: "публичное", en: "public" },
  player: { ru: "для игроков", en: "player" },
  gm: { ru: "для мастера", en: "GM" },
};

const tags: Dict = {
  ai: { ru: "ИИ", en: "AI" },
  antimagic: { ru: "антимагия", en: "antimagic" },
  cosmology: { ru: "космология", en: "cosmology" },
  cost: { ru: "цена", en: "cost" },
  crime: { ru: "преступность", en: "crime" },
  era: { ru: "эпоха", en: "era" },
  game: { ru: "игра", en: "game" },
  geography: { ru: "география", en: "geography" },
  history: { ru: "история", en: "history" },
  ideology: { ru: "идеология", en: "ideology" },
  information: { ru: "информация", en: "information" },
  magic: { ru: "магия", en: "magic" },
  meta: { ru: "мета", en: "meta" },
  ocean: { ru: "океан", en: "ocean" },
  orbit: { ru: "орбита", en: "orbit" },
  politics: { ru: "политика", en: "politics" },
  races: { ru: "расы", en: "ancestries" },
  religion: { ru: "религия", en: "religion" },
  scavenging: { ru: "скавенджинг", en: "scavenging" },
  style: { ru: "стиль", en: "style" },
  technology: { ru: "технологии", en: "technology" },
  trade: { ru: "торговля", en: "trade" },
  war: { ru: "война", en: "war" },
};

const relations: Dict = {
  part_of: { ru: "входит в", en: "part of" },
  contains: { ru: "содержит", en: "contains" },
  member_of: { ru: "член", en: "member of" },
  leads: { ru: "возглавляет", en: "leads" },
  occurs_during: { ru: "во время", en: "occurs during" },
  occurs_at: { ru: "в месте", en: "occurs at" },
  uses: { ru: "использует", en: "uses" },
  worships: { ru: "почитает", en: "worships" },
  originates_from: { ru: "происходит из", en: "originates from" },
  mentioned_in: { ru: "упоминается в", en: "mentioned in" },
  conflicts_with: { ru: "конфликтует с", en: "conflicts with" },
  allied_with: { ru: "союз с", en: "allied with" },
  successor_of: { ru: "преемник", en: "successor of" },
  caused_by: { ru: "причина", en: "caused by" },
  enables: { ru: "делает возможным", en: "enables" },
  related_to: { ru: "связано с", en: "related to" },
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

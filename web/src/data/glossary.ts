import type { Lang } from "../i18n/ui";

export interface GlossaryTerm {
  id: string;
  term: Record<Lang, string>;
  definition: Record<Lang, string>;
}

/** Mirrors meta/GLOSSARY.md — keep in sync when adding canon terms. */
export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "COS_ETHER",
    term: { ru: "Эфир", en: "Ether" },
    definition: {
      ru: "Слой реальности: вероятности, идеи, архетипы. Сознание → Эфир → вероятность → материя.",
      en: "Layer of reality: probabilities, ideas, archetypes. Consciousness → Ether → probability → matter.",
    },
  },
  {
    id: "COS_VEIL",
    term: { ru: "Вуаль", en: "The Veil" },
    definition: {
      ru: "Граница материи и Эфира. Ослабление с 2170.",
      en: "Boundary between matter and the Ether. Weakening since 2170.",
    },
  },
  {
    id: "COS_ARCHETYPES",
    term: { ru: "Архетипы", en: "Archetypes" },
    definition: {
      ru: "Формы коллективного бессознательного; материализуются после Пробуждения.",
      en: "Forms of the collective unconscious; materialize after the Awakening.",
    },
  },
  {
    id: "EVENT_GREAT_AWAKENING",
    term: { ru: "Великое Пробуждение", en: "Great Awakening" },
    definition: {
      ru: "2170: начало ослабления Вуали.",
      en: "2170: the Veil begins to weaken.",
    },
  },
  {
    id: "EVENT_THIRD_WORLD_WAR",
    term: { ru: "Третья мировая", en: "Third World War" },
    definition: {
      ru: "2325: коллапс экономики, государств, орбиты и глобальной сети.",
      en: "2325: collapse of the economy, most states, orbital infrastructure, and the global network.",
    },
  },
  {
    id: "EVENT_STARFALL",
    term: { ru: "Звёздный Дождь", en: "Starfall" },
    definition: {
      ru: "Падения орбитальных объектов с ИИ, материалами, артефактами.",
      en: "Falls of orbital debris carrying AI, materials, and artifacts.",
    },
  },
  {
    id: "MAG_PROBABILITY",
    term: { ru: "Вероятностная магия", en: "Probability magic" },
    definition: {
      ru: "Магия не ломает физику — меняет вероятность.",
      en: "Magic does not break physics — it shifts probability.",
    },
  },
  {
    id: "PHENO_ETHER_BURNOUT",
    term: { ru: "Эфирное Выгорание", en: "Ether Burnout" },
    definition: {
      ru: "Цена магии: истощение, мутации, потеря памяти и др.",
      en: "The cost of magic: exhaustion, mutations, memory loss, and more.",
    },
  },
  {
    id: "PHENO_PROBABILISTIC_DECAY",
    term: { ru: "Вероятностный Распад", en: "Probabilistic Decay" },
    definition: {
      ru: "Рост ошибок техники под магическим давлением.",
      en: "Rising technological error rates under magical pressure.",
    },
  },
  {
    id: "CONCEPT_ARCANUM",
    term: { ru: "Принцип Arcanum", en: "Arcanum principle" },
    definition: {
      ru: "Взаимное давление магии и высоких технологий; возможны гибриды.",
      en: "Mutual pressure between magic and high technology; hybrids are possible.",
    },
  },
  {
    id: "TECH_NULL_FIELD",
    term: { ru: "Нулевые Поля", en: "Null Fields" },
    definition: {
      ru: "Антимагическая / стабилизационная технология Эгиды.",
      en: "Aegis anti-magic / stabilization technology.",
    },
  },
  {
    id: "CONCEPT_DEAD_INTERNET",
    term: { ru: "Мёртвый Интернет", en: "Dead Internet" },
    definition: {
      ru: "Информационные следы Сети в Эфире.",
      en: "Informational traces of the Net preserved in the Ether.",
    },
  },
  {
    id: "MAG_NETWORK",
    term: { ru: "Сетевые маги", en: "Network mages" },
    definition: {
      ru: "Работа с Мёртвым Интернетом и следами данных.",
      en: "Practitioners who work the Dead Internet and data-traces.",
    },
  },
  {
    id: "CONCEPT_DIVINITY",
    term: { ru: "Божественность", en: "Divinity" },
    definition: {
      ru: "Состояние, не раса; достижима и обратима.",
      en: "A state of being, not a race; attainable and reversible.",
    },
  },
  {
    id: "CONCEPT_DOMAIN",
    term: { ru: "Домен", en: "Domain" },
    definition: {
      ru: "Фундаментальная концепция, к которой привязан бог.",
      en: "A fundamental concept bound to a god.",
    },
  },
  {
    id: "ERA_2435_PRESENT",
    term: { ru: "Земля 2435", en: "Earth 2435" },
    definition: {
      ru: "Текущая эпоха сеттинга.",
      en: "The setting's present era.",
    },
  },
];

export function sortedGlossary(lang: Lang): GlossaryTerm[] {
  return [...glossaryTerms].sort((a, b) =>
    a.term[lang].localeCompare(b.term[lang], lang === "ru" ? "ru" : "en"),
  );
}

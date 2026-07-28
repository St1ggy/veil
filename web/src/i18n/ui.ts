export const languages = {
  ru: "Русский",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "ru";

export function isLang(value: string): value is Lang {
  return value === "ru" || value === "en";
}

const ui = {
  ru: {
    brand: "Veil of Worlds",
    tagline: "Энциклопедия альтернативной Земли 2435",
    navHome: "Главная",
    navAbout: "О мире",
    navSystem: "Система",
    navGlossary: "Глоссарий",
    navCategories: "Разделы",
    glossaryTitle: "Глоссарий",
    glossaryIntro:
      "Ключевые термины мира. Каждый термин ведёт к полной статье энциклопедии.",
    glossaryTerm: "Термин",
    glossaryId: "Идентификатор",
    glossaryDefinition: "Определение",
    glossaryOpen: "Статья",
    searchPlaceholder: "Поиск по коду или названию…",
    articles: "статей",
    allArticles: "Все статьи",
    category: "Раздел",
    status: "Статус",
    type: "Тип",
    importance: "Значимость",
    tags: "Теги",
    relations: "Связи",
    seeAlso: "См. также",
    backHome: "На главную",
    language: "Язык",
    emptyCategory: "В этом разделе пока нет статей.",
    heroTitle: "Атлас мира за Вуалью",
    heroBody:
      "Тех-фэнтези и научное фэнтези на узнаваемой Земле. Магия меняет вероятность. Технологии не исчезли. Цивилизация 2435 года — иная, но непрерывная.",
    explore: "Смотреть разделы",
    featured: "Ключевые статьи",
    structure: "Структура энциклопедии",
    footer: "Veil of Worlds · Земля 2435",
    aboutTitle: "О мире",
    aboutLead:
      "Veil of Worlds — альтернативная Земля после возвращения магии. Не классическое фэнтези и не постапокалипсис: непрерывная история цивилизации, изменившаяся после ослабления Вуали.",
    aboutThemesTitle: "Темы",
    aboutThemes:
      "Сознание, информация, вероятность, эволюция, цена силы, свобода выбора, политика и культура.",
    aboutEraTitle: "Эпоха",
    aboutEra:
      "2170 — Великое Пробуждение. 2325 — Третья мировая и Звёздный Дождь. 2435 — настоящее энциклопедии: восстановленный, но уже другой мир.",
    aboutMagicTitle: "Магия и технологии",
    aboutMagic:
      "Магия не нарушает физику — она меняет вероятность через Эфир и всегда имеет цену. Технологии продолжают существовать: классические, эфирные и гибридные. Их взаимное давление известно как принцип Арканум.",
    systemRelatedTitle: "Статьи энциклопедии по теме",
    openEntity: "Открыть статью",
  },
  en: {
    brand: "Veil of Worlds",
    tagline: "Encyclopedia of alternate Earth, 2435",
    navHome: "Home",
    navAbout: "The World",
    navSystem: "System",
    navGlossary: "Glossary",
    navCategories: "Sections",
    glossaryTitle: "Glossary",
    glossaryIntro:
      "Key terms of the setting. Each entry links to a full encyclopedia article.",
    glossaryTerm: "Term",
    glossaryId: "ID",
    glossaryDefinition: "Definition",
    glossaryOpen: "Article",
    searchPlaceholder: "Search by ID or title…",
    articles: "articles",
    allArticles: "All articles",
    category: "Section",
    status: "Status",
    type: "Type",
    importance: "Importance",
    tags: "Tags",
    relations: "Relations",
    seeAlso: "See also",
    backHome: "Home",
    language: "Language",
    emptyCategory: "No articles in this section yet.",
    heroTitle: "Atlas of the world beyond the Veil",
    heroBody:
      "Tech Fantasy and Science Fantasy on a recognizable Earth. Magic shifts probability. Technology never vanished. Civilization in 2435 is different — but continuous.",
    explore: "Browse sections",
    featured: "Core articles",
    structure: "Encyclopedia structure",
    footer: "Veil of Worlds · Earth 2435",
    aboutTitle: "The World",
    aboutLead:
      "Veil of Worlds is an alternate Earth after the return of magic. Not classic fantasy and not apocalypse: a continuous civilization reshaped when the Veil weakened.",
    aboutThemesTitle: "Themes",
    aboutThemes:
      "Consciousness, information, probability, evolution, the cost of power, free will, politics, and culture.",
    aboutEraTitle: "Era",
    aboutEra:
      "2170 — the Great Awakening. 2325 — the Third World War and Starfall. 2435 — the encyclopedia's present: a recovered world that is no longer the old one.",
    aboutMagicTitle: "Magic and technology",
    aboutMagic:
      "Magic does not break physics — it changes probability through the Ether, and always has a cost. Technology endures: classical, etheric, and hybrid. Their mutual pressure is known as the Arcanum principle.",
    systemRelatedTitle: "Related encyclopedia articles",
    openEntity: "Open article",
  },
} as const;

export type UiKey = keyof (typeof ui)["ru"];

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key];
}

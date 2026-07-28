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
    navAbout: "О проекте",
    navCategories: "Разделы",
    searchPlaceholder: "Поиск по ID или названию…",
    articles: "статей",
    allArticles: "Все статьи",
    category: "Раздел",
    status: "Статус",
    type: "Тип",
    importance: "Значимость",
    relations: "Связи",
    seeAlso: "См. также",
    backHome: "На главную",
    language: "Язык",
    contentLangNotice:
      "Полный текст статьи пока на русском. Английский перевод появится по мере подготовки wiki/en.",
    emptyCategory: "В этом разделе пока нет статей.",
    heroTitle: "Атлас мира за Вуалью",
    heroBody:
      "Tech Fantasy и Science Fantasy на узнаваемой Земле. Магия меняет вероятность. Технологии не исчезли. Цивилизация 2435 года — иная, но непрерывная.",
    explore: "Смотреть разделы",
    featured: "Ключевые статьи",
    structure: "Структура энциклопедии",
    footer: "Источник истины: wiki/ + data/. Сборка Astro.",
    aboutTitle: "О проекте",
    aboutBody:
      "Veil of Worlds — knowledge base оригинального TTRPG-сеттинга и системы на базе SWADE.",
    layersTitle: "Слои репозитория",
    openEntity: "Открыть статью",
  },
  en: {
    brand: "Veil of Worlds",
    tagline: "Encyclopedia of alternate Earth, 2435",
    navHome: "Home",
    navAbout: "About",
    navCategories: "Sections",
    searchPlaceholder: "Search by ID or title…",
    articles: "articles",
    allArticles: "All articles",
    category: "Section",
    status: "Status",
    type: "Type",
    importance: "Importance",
    relations: "Relations",
    seeAlso: "See also",
    backHome: "Home",
    language: "Language",
    contentLangNotice:
      "Full article text is currently in Russian. English wiki translations will arrive over time.",
    emptyCategory: "No articles in this section yet.",
    heroTitle: "Atlas of the world beyond the Veil",
    heroBody:
      "Tech Fantasy and Science Fantasy on a recognizable Earth. Magic shifts probability. Technology never vanished. Civilization in 2435 is different — but continuous.",
    explore: "Browse sections",
    featured: "Core articles",
    structure: "Encyclopedia structure",
    footer: "Source of truth: wiki/ + data/. Built with Astro.",
    aboutTitle: "About",
    aboutBody:
      "Veil of Worlds is a knowledge base for an original TTRPG setting and SWADE-based game system.",
    layersTitle: "Repository layers",
    openEntity: "Open article",
  },
} as const;

export type UiKey = keyof (typeof ui)["ru"];

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key];
}

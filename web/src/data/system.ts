import type { Lang } from "../i18n/ui";

export interface SystemSection {
  title: Record<Lang, string>;
  paragraphs: Record<Lang, string>[];
  items?: { label: Record<Lang, string>; body: Record<Lang, string> }[];
}

/** Public encyclopedia copy about the chosen rules framework. */
export const systemPage = {
  title: {
    ru: "Игровая система",
    en: "Game system",
  },
  lead: {
    ru: "Veil of Worlds построен на Savage Worlds Adventure Edition (SWADE) — лёгкой, быстрой и кинематографичной системе от Pinnacle Entertainment Group. Это не «клон D&D» и не самописное ядро с нуля: официальное ядро SWADE остаётся опорой, а сеттинг раскрывается через предусмотренные точки расширения.",
    en: "Veil of Worlds is built on Savage Worlds Adventure Edition (SWADE) — a fast, cinematic ruleset from Pinnacle Entertainment Group. It is not a D&D clone and not a from-scratch proprietary core: the official SWADE engine stays intact, and the setting expresses itself through the framework’s intended extension points.",
  },
  sections: [
    {
      title: {
        ru: "Почему SWADE",
        en: "Why SWADE",
      },
      paragraphs: [
        {
          ru: "Savage Worlds Adventure Edition — универсальная система приключений: один набор правил покрывает схватки, социальное давление, погони, исследование и массовые сцены без тяжёлой симуляции. Для технофэнтезийной альтернативной Земли 2435 это важно: стол должен уметь переключаться между политикой, караванами, руинами Звёздного Дождя и эфирными кризисами.",
          en: "Savage Worlds Adventure Edition is a general-purpose adventure engine: one ruleset covers fights, social pressure, chases, exploration, and mass scenes without heavy simulation. That fits a tech-fantasy alternate Earth in 2435: the table must move between politics, caravans, Starfall ruins, and etheric crises.",
        },
        {
          ru: "SWADE использует кости с шагами (d4–d12), карты инициативы, очки бэни (Bennies) и режим Дикого карты (Wild Card) для героев и ключевых антагонистов. Темп высокий, провалы часто интересны, а цена силы легко выражается через штрафы, раны, истощение и сюжетные последствия — что совпадает с философией Эфира и Выгорания.",
          en: "SWADE uses stepped dice (d4–d12), card initiative, Bennies, and Wild Card status for heroes and key antagonists. Pace is high, failure is often interesting, and the cost of power maps cleanly onto penalties, wounds, Fatigue, and story fallout — matching Veil’s Ether and Burnout philosophy.",
        },
        {
          ru: "Выбор SWADE зафиксирован в Конституции проекта: долгосрочная цель — оригинальный сеттинг и игровая линия на базе SWADE, пригодные для книги, энциклопедии, VTT и дальнейших форматов.",
          en: "The SWADE choice is fixed in the project Constitution: the long-term goal is an original setting and game line on SWADE, suitable for a setting book, encyclopedia, VTT modules, and further formats.",
        },
      ],
    },
    {
      title: {
        ru: "Главный принцип: ядро не ломаем",
        en: "Core principle: do not break the engine",
      },
      paragraphs: [
        {
          ru: "Ядро SWADE остаётся максимально неизменным. Veil of Worlds не переписывает базовую математику бросков, не заменяет инициативу и не вводит параллельную «главную» систему поверх книги правил.",
          en: "The SWADE core stays as unchanged as possible. Veil of Worlds does not rewrite the basic roll math, replace initiative, or bolt on a parallel “main” system over the core book.",
        },
        {
          ru: "Всё уникальное для мира 2435 выражается через официальные каналы расширения сеттинга: происхождения, рёбра, помехи, мистические фоны, силы, модификаторы сил, снаряжение, транспорт, правила сеттинга и отдельные подсистемы, совместимые с SWADE.",
          en: "Everything unique to Earth 2435 is expressed through official setting-extension channels: Ancestries, Edges, Hindrances, Arcane Backgrounds, Powers, Power Modifiers, gear, vehicles, Setting Rules, and discrete subsystems that remain SWADE-compatible.",
        },
        {
          ru: "Это осознанный отказ от копирования структуры и тропов классического фэнтезийного «подземелья и уровней». Расы мира — не шаблоны из другой системы; магия не «просто работает»; баланс идёт через цену, Распад и политику, а не через уровни заклинаний.",
          en: "This is a deliberate refusal to copy classic dungeon-fantasy structure and tropes. Ancestries are not templates from another game; magic does not “just work”; balance comes from cost, Decay, and politics — not spell levels.",
        },
      ],
    },
    {
      title: {
        ru: "Как мир стыкуется с SWADE",
        en: "How the setting plugs into SWADE",
      },
      paragraphs: [
        {
          ru: "Каждый крупный элемент сеттинга должен иметь игровой след: либо опцию персонажа, либо правило сцены, либо ресурс/ограничение за столом. Правило, которое нельзя обыграть, считается незавершённым.",
          en: "Every major setting element should leave a playable footprint: a character option, a scene rule, or a table resource/constraint. A rule that cannot be played is considered unfinished.",
        },
      ],
      items: [
        {
          label: {
            ru: "Происхождения (Ancestries)",
            en: "Ancestries",
          },
          body: {
            ru: "Народы Земли 2435 — люди, эльфы, гномы, орки, тролли, феи, дракониды, оборотни, конструкты и другие — описываются как происхождения SWADE: набор свойств, бонусов и цены, без переноса чужих расовых шаблонов.",
            en: "Peoples of Earth 2435 — humans, elves, dwarves, orcs, trolls, fae, draconids, shapeshifters, constructs, and others — are expressed as SWADE Ancestries: packages of traits, benefits, and costs, not imported racial templates from other games.",
          },
        },
        {
          label: {
            ru: "Рёбра (Edges)",
            en: "Edges",
          },
          body: {
            ru: "Профессиональные, социальные, техномагические и фракционные преимущества: работа с Нулевыми Полями, сетевые практики, дипломатия полисов, экспедиционные навыки.",
            en: "Professional, social, technomagic, and faction advantages: Null Field work, network practice, polity diplomacy, expedition skills.",
          },
        },
        {
          label: {
            ru: "Помехи (Hindrances)",
            en: "Hindrances",
          },
          body: {
            ru: "Цена силы и травмы мира: Выгорание, зависимость от Эфира, политическая метка, непереносимость Нулевых Полей, долги синдикатам, идеологическая одержимость.",
            en: "The cost of power and world trauma: Burnout, Ether dependence, political marks, Null Field intolerance, syndicate debt, ideological obsession.",
          },
        },
        {
          label: {
            ru: "Мистические фоны (Arcane Backgrounds)",
            en: "Arcane Backgrounds",
          },
          body: {
            ru: "Разные способы касаться Эфира и вероятности: классические практики, сетевые маги, гибридные операторы, ритуальные и институциональные линии. Каждый фон обязан иметь источник, ограничения и последствия.",
            en: "Different ways to touch the Ether and probability: classical practices, network mages, hybrid operators, ritual and institutional lines. Every Background must have a source, limits, and consequences.",
          },
        },
        {
          label: {
            ru: "Силы и модификаторы (Powers / Power Modifiers)",
            en: "Powers / Power Modifiers",
          },
          body: {
            ru: "Эффекты вероятностной магии оформляются как силы SWADE. Модификаторы отражают цену, масштаб, нестабильность и риск Распада — не «бесплатные апгрейды».",
            en: "Probability-magic effects are framed as SWADE Powers. Modifiers capture cost, scale, instability, and Decay risk — not free upgrades.",
          },
        },
        {
          label: {
            ru: "Снаряжение и транспорт (Equipment / Vehicles)",
            en: "Equipment / Vehicles",
          },
          body: {
            ru: "Классическая техника, эфирные устройства, гибриды и антимагические системы Эгиды. Транспорт и караваны — отдельный слой экспедиций и торговли.",
            en: "Classical tech, etheric devices, hybrids, and Aegis anti-magic systems. Vehicles and caravans support expedition and trade play.",
          },
        },
        {
          label: {
            ru: "Правила сеттинга (Setting Rules)",
            en: "Setting Rules",
          },
          body: {
            ru: "Точечные правила мира, которые включают или усиливают жанр за столом: Резонанс, Выгорание, гибриды, Домены, руины, репутация и политика. Они не заменяют главу боя SWADE — они окрашивают сцены.",
            en: "Targeted world rules that switch genre tone on at the table: Resonance, Burnout, hybrids, Domains, ruins, reputation, and politics. They do not replace SWADE’s combat chapter — they color scenes.",
          },
        },
      ],
    },
    {
      title: {
        ru: "Собственные подсистемы Veil",
        en: "Veil’s own subsystems",
      },
      paragraphs: [
        {
          ru: "Поверх SWADE проект вводит собственные правила сеттинга и подсистемы. Ниже — канонический список из Конституции; механики наполняются в игровом слое `game/` и должны оставаться совместимыми с ядром.",
          en: "On top of SWADE, the project adds its own Setting Rules and subsystems. Below is the canonical list from the Constitution; mechanics live in the `game/` layer and must stay compatible with the core.",
        },
      ],
      items: [
        {
          label: { ru: "Эфирный Резонанс", en: "Etheric Resonance" },
          body: {
            ru: "Как сознание и коллективные ожидания усиливают или искажают вероятность в зоне; основа сетевых и ритуальных практик.",
            en: "How consciousness and collective expectation amplify or distort probability in an area; the base for network and ritual practice.",
          },
        },
        {
          label: { ru: "Эфирное Выгорание", en: "Ether Burnout" },
          body: {
            ru: "Цена вмешательства в вероятность: нейронная и телесная нагрузка, длительные помехи, риск потери контроля.",
            en: "The cost of intervening in probability: neural and bodily load, lasting Hindrance-like fallout, risk of losing control.",
          },
        },
        {
          label: { ru: "Гибридные технологии", en: "Hybrid technology" },
          body: {
            ru: "Техника, работающая на стыке классики и Эфира; требует обслуживания, даёт преимущество и подвержена Распаду.",
            en: "Gear that spans classical tech and the Ether; needs upkeep, grants advantage, and is exposed to Decay.",
          },
        },
        {
          label: { ru: "Домены", en: "Domains" },
          body: {
            ru: "Зоны влияния архетипов и вознесённых сущностей; меняют местные законы вероятности и политику контроля.",
            en: "Zones of influence for archetypes and ascended entities; they alter local probability law and control politics.",
          },
        },
        {
          label: { ru: "Вознесение", en: "Ascension" },
          body: {
            ru: "Путь усиления через Эфир и Домены; всегда с ценой, врагами и системными последствиями для мира.",
            en: "A path of power through the Ether and Domains; always priced, opposed, and consequential for the world.",
          },
        },
        {
          label: { ru: "Низвержение", en: "Downfall" },
          body: {
            ru: "Обратная дуга: потеря Домена, Распад влияния, политический и метафизический крах.",
            en: "The reverse arc: loss of a Domain, collapse of influence, political and metaphysical fall.",
          },
        },
        {
          label: { ru: "Исследование руин", en: "Ruin exploration" },
          body: {
            ru: "Сцены в наследстве Третьей мировой и Звёздного Дождя: опасность, артефакты, нестабильный Эфир.",
            en: "Scenes in Third World War and Starfall inheritance: danger, artifacts, unstable Ether.",
          },
        },
        {
          label: { ru: "Экспедиции", en: "Expeditions" },
          body: {
            ru: "Дальние вылазки, логистика, караваны, океанские эфирные штормы и орбитальный мусор как препятствия.",
            en: "Long-range sorties, logistics, caravans, ocean ether storms, and orbital debris as obstacles.",
          },
        },
        {
          label: { ru: "Репутация", en: "Reputation" },
          body: {
            ru: "Как полисы, фракции и сети помнят действия героев; открывает и закрывает доступы.",
            en: "How polities, factions, and networks remember the heroes’ actions; opens and closes access.",
          },
        },
        {
          label: { ru: "Политическое влияние", en: "Political influence" },
          body: {
            ru: "Рычаги внутри государств и орденов: голосования, санкции, лицензии на магию и технику.",
            en: "Levers inside states and orders: votes, sanctions, licenses for magic and technology.",
          },
        },
        {
          label: { ru: "Экономика", en: "Economy" },
          body: {
            ru: "Ресурсы, редкие компоненты, чёрный рынок эфирных следов и цена стабильности техники.",
            en: "Resources, rare components, black markets in ether traces, and the price of technical stability.",
          },
        },
        {
          label: { ru: "Исследования", en: "Research" },
          body: {
            ru: "Научный и оккультный прогресс за столом: лаборатории, полевые замеры Эфира, риск эксперимента.",
            en: "Scientific and occult progress at the table: labs, field Ether measurements, experimental risk.",
          },
        },
      ],
    },
    {
      title: {
        ru: "Магия, техника и принцип Арканум за столом",
        en: "Magic, tech, and the Arcanum principle at the table",
      },
      paragraphs: [
        {
          ru: "В лоре магия меняет вероятность через Эфир и всегда имеет цену. В правилах это означает: силы и фоны не обходят физику «потому что магия», а взаимодействуют с Распадом, Выгоранием и сопротивлением стабильных систем.",
          en: "In the lore, magic changes probability through the Ether and always has a cost. In play that means Powers and Backgrounds do not bypass physics “because magic”; they interact with Decay, Burnout, and the resistance of stable systems.",
        },
        {
          ru: "Принцип Арканум — взаимное давление высокой магии и сложной техники. За столом это источник дилемм: усиливать эфирный эффект и ломать инфраструктуру, держать Нулевые Поля и ограничивать магов, искать гибридный компромисс.",
          en: "The Arcanum principle is the mutual pressure between high magic and complex technology. At the table it is a dilemma engine: push etheric effect and break infrastructure, hold Null Fields and constrain mages, or hunt for a hybrid compromise.",
        },
      ],
    },
    {
      title: {
        ru: "Режимы кампаний",
        en: "Campaign modes",
      },
      paragraphs: [
        {
          ru: "SWADE хорошо держит разные тона одной кампании. Для Veil канонически поддерживаются направления: исследование руин; политика и дипломатия; выживание; торговля; археология; охота за артефактами (в том числе наследие Звёздного Дождя); работа на государства; экспедиции; магические расследования.",
          en: "SWADE handles multiple campaign tones well. Veil canonically supports: ruin exploration; politics and diplomacy; survival; trade; archaeology; artifact hunting (including Starfall inheritance); work for states; expeditions; magical investigations.",
        },
        {
          ru: "Мастер выбирает акцент, но законы мира (Вуаль, Распад, Домены, фракции) должны порождать конфликты во всех режимах — не только «флавор».",
          en: "The GM chooses emphasis, but world laws (the Veil, Decay, Domains, factions) should generate conflict in every mode — not mere flavor.",
        },
      ],
    },
    {
      title: {
        ru: "Чего система сознательно не делает",
        en: "What the system deliberately avoids",
      },
      paragraphs: [
        {
          ru: "Запрещено строить Veil как перекрашенный D&D: классовые уровни, шаблонные «эльфы/орки из книги другого мира», магия без цены, абсолютное добро и зло.",
          en: "Veil must not be built as reskinned D&D: class levels, stock “elves/orcs from another book,” free magic, absolute good and evil.",
        },
        {
          ru: "Запрещено ломать ядро SWADE ради локальной красоты идеи. Если идея требует новой математики бросков — сначала ищите выражение через Edges, Hindrances, Powers и Setting Rules.",
          en: "Breaking the SWADE core for a locally pretty idea is forbidden. If an idea seems to need new roll math, express it first through Edges, Hindrances, Powers, and Setting Rules.",
        },
      ],
    },
    {
      title: {
        ru: "Лицензирование и что нужно за столом",
        en: "Licensing and what you need at the table",
      },
      paragraphs: [
        {
          ru: "Savage Worlds Adventure Edition — коммерческий продукт Pinnacle Entertainment Group. Для игры по правилам SWADE нужна официальная книга правил (и любые лицензированные модули, которые вы используете).",
          en: "Savage Worlds Adventure Edition is a commercial product of Pinnacle Entertainment Group. Playing with SWADE rules requires the official core book (and any licensed supplements you use).",
        },
        {
          ru: "Veil of Worlds — оригинальный сеттинг и дополняющие материалы. Энциклопедия на этом сайте описывает мир и дизайн игровой линии; полный текст правил SWADE здесь не воспроизводится.",
          en: "Veil of Worlds is an original setting and accompanying materials. This encyclopedia describes the world and the design of the game line; it does not reproduce the full SWADE rules text.",
        },
        {
          ru: "Игровые тексты проекта живут в слое `game/` (материалы игрока и мастера). Механические блоки наполняются по мере фиксации канона; энциклопедия уже задаёт, какие законы мира обязаны стать играбельными правилами.",
          en: "Project play texts live in the `game/` layer (player and GM materials). Mechanical blocks fill in as canon locks; the encyclopedia already states which world laws must become playable rules.",
        },
      ],
    },
    {
      title: {
        ru: "Связь с энциклопедией",
        en: "Link to the encyclopedia",
      },
      paragraphs: [
        {
          ru: "Читайте статьи о вероятностной магии, Выгорании, Распаде, принципе Арканум, Доменах, Нулевых Полях и режимах кампаний — это лор-основа, из которой собираются Edges, Powers и Setting Rules.",
          en: "Read the articles on probability magic, Burnout, Decay, the Arcanum principle, Domains, Null Fields, and campaign modes — that lore is the base from which Edges, Powers, and Setting Rules are assembled.",
        },
      ],
    },
  ] satisfies SystemSection[],
  relatedIds: [
    "MAG_PROBABILITY",
    "PHENO_ETHER_BURNOUT",
    "PHENO_PROBABILISTIC_DECAY",
    "CONCEPT_ARCANUM",
    "CONCEPT_DOMAIN",
    "TECH_NULL_FIELD",
    "CONCEPT_CAMPAIGNS",
  ],
} as const;

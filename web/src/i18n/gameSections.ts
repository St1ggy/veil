import type { Lang } from './ui'

export type GameSectionId =
  | 'chargen'
  | 'ancestries'
  | 'edges'
  | 'hindrances'
  | 'powers'
  | 'rules'
  | 'equipment'
  | 'economy'
  | 'primers'
  | 'npc'
  | 'bestiary'
  | 'factions'
  | 'campaigns'
  | 'design'
  | 'systems'

export type GameSection = {
  id: GameSectionId
  /**
  Paths under game/ that belong to this section
  */
  roots: string[]
  label: Record<Lang, string>
  description: Record<Lang, string>
}

export const gameSections: GameSection[] = [
  {
    id: 'chargen',
    roots: ['player/chargen'],
    label: { ru: 'Создание персонажа', en: 'Создание персонажа' },
    description: {
      ru: 'Этапы создания персонажа: происхождение, культура, благосостояние и развитие.',
      en: 'Этапы создания персонажа: происхождение, культура, благосостояние и развитие.',
    },
  },
  {
    id: 'ancestries',
    roots: ['player/ancestries'],
    label: { ru: 'Происхождения', en: 'Происхождения' },
    description: {
      ru: 'Пакеты происхождений, связанные с народами энциклопедии.',
      en: 'Пакеты происхождений, связанные с народами энциклопедии.',
    },
  },
  {
    id: 'edges',
    roots: ['player/edges'],
    label: { ru: 'Черты', en: 'Черты' },
    description: {
      ru: 'Черты мира без перепечатки основных правил «Дневника авантюриста».',
      en: 'Черты мира без перепечатки основных правил «Дневника авантюриста».',
    },
  },
  {
    id: 'hindrances',
    roots: ['player/hindrances'],
    label: { ru: 'Изъяны', en: 'Изъяны' },
    description: {
      ru: 'Изъяны мира и сюжетные ограничения.',
      en: 'Изъяны мира и сюжетные ограничения.',
    },
  },
  {
    id: 'powers',
    roots: ['player/powers', 'player/arcane_backgrounds'],
    label: { ru: 'Силы и Мистические дары', en: 'Силы и Мистические дары' },
    description: {
      ru: 'Мистические дары, проявления Сил и связанные с ними риски.',
      en: 'Мистические дары, проявления Сил и связанные с ними риски.',
    },
  },
  {
    id: 'rules',
    roots: ['player/setting_rules', 'player/rules'],
    label: { ru: 'Правила мира', en: 'Правила мира' },
    description: {
      ru: 'Правила и специальные расширения для игры в «Вуаль Миров».',
      en: 'Правила и специальные расширения для игры в «Вуаль Миров».',
    },
  },
  {
    id: 'equipment',
    roots: ['player/equipment', 'player/vehicles', 'player/crafting'],
    label: { ru: 'Снаряжение', en: 'Снаряжение' },
    description: {
      ru: 'Снаряжение, транспорт и создание предметов.',
      en: 'Снаряжение, транспорт и создание предметов.',
    },
  },
  {
    id: 'economy',
    roots: ['player/economy', 'player/reputation'],
    label: { ru: 'Экономика', en: 'Экономика' },
    description: {
      ru: 'Рынки, дефицит, репутация и экономика фракций.',
      en: 'Рынки, дефицит, репутация и экономика фракций.',
    },
  },
  {
    id: 'primers',
    roots: ['player/primers', 'player/character_options'],
    label: { ru: 'Вводные материалы', en: 'Вводные материалы' },
    description: {
      ru: 'Краткие вводные материалы для игроков и варианты развития персонажа.',
      en: 'Краткие вводные материалы для игроков и варианты развития персонажа.',
    },
  },
  {
    id: 'npc',
    roots: ['npc'],
    label: { ru: 'Персонажи ведущего', en: 'Персонажи ведущего' },
    description: {
      ru: 'Архетипы и открытые игровые сведения о персонажах ведущего.',
      en: 'Архетипы и открытые игровые сведения о персонажах ведущего.',
    },
  },
  {
    id: 'bestiary',
    roots: ['bestiary'],
    label: { ru: 'Бестиарий', en: 'Бестиарий' },
    description: {
      ru: 'Существа и типовые угрозы мира.',
      en: 'Существа и типовые угрозы мира.',
    },
  },
  {
    id: 'factions',
    roots: ['factions'],
    label: { ru: 'Фракции в игре', en: 'Фракции в игре' },
    description: {
      ru: 'Игровое представление фракций на основе канона энциклопедии.',
      en: 'Игровое представление фракций на основе канона энциклопедии.',
    },
  },
  {
    id: 'campaigns',
    roots: ['campaigns'],
    label: { ru: 'Кампании', en: 'Кампании' },
    description: {
      ru: 'Режимы кампаний: детектив, политика, песочница и другие.',
      en: 'Режимы кампаний: детектив, политика, песочница и другие.',
    },
  },
  {
    id: 'design',
    roots: ['design'],
    label: { ru: 'Проектирование', en: 'Проектирование' },
    description: {
      ru: 'Принципы баланса, распределения игровых ресурсов и построения опыта игроков и ведущего.',
      en: 'Принципы баланса, распределения игровых ресурсов и построения опыта игроков и ведущего.',
    },
  },
  {
    id: 'systems',
    roots: ['systems'],
    label: { ru: 'Подсистемы', en: 'Подсистемы' },
    description: {
      ru: 'Отдельные игровые подсистемы мира.',
      en: 'Отдельные игровые подсистемы мира.',
    },
  },
]

export function gameSectionById(id: string): GameSection | undefined {
  return gameSections.find((s) => s.id === id)
}

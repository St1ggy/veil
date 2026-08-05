import type { Lang } from './ui'

export type CategoryId =
  | 'cosmology'
  | 'history'
  | 'magic'
  | 'technology'
  | 'races'
  | 'countries'
  | 'factions'
  | 'concepts'
  | 'phenomena'
  | 'books'
  | 'pregens'
  | 'ascended'
  | 'worldview'

export type CategoryDef = {
  id: CategoryId
  types: string[]
  order: number
  label: Record<Lang, string>
  description: Record<Lang, string>
}

export const categories: CategoryDef[] = [
  {
    id: 'books',
    types: ['book'],
    order: 0,
    label: { ru: 'Книги мира', en: 'Книги мира' },
    description: {
      ru: 'Полный канонический корпус: основы мира, история, география, цивилизация, организации, конфликты и правила игры.',
      en: 'Полный канонический корпус: основы мира, история, география, цивилизация, организации, конфликты и правила игры.',
    },
  },
  {
    id: 'pregens',
    types: [],
    order: 1,
    label: { ru: 'Готовые персонажи', en: 'Готовые персонажи' },
    description: {
      ru: 'Сто готовых героев с портретами, игровыми профилями и фильтрами для быстрого выбора.',
      en: 'Сто готовых героев с портретами, игровыми профилями и фильтрами для быстрого выбора.',
    },
  },
  {
    id: 'ascended',
    types: [],
    order: 2,
    label: { ru: 'Вознесённые', en: 'Вознесённые' },
    description: {
      ru: 'Семьдесят семь известных Вознесённых всех степеней и закрытая запись о Первом.',
      en: 'Семьдесят семь известных Вознесённых всех степеней и закрытая запись о Первом.',
    },
  },
  {
    id: 'worldview',
    types: [],
    order: 3,
    label: { ru: 'Мировоззрение', en: 'Мировоззрение' },
    description: {
      ru: 'Куб выбора: три координаты ценностных ориентиров персонажей, сообществ и организаций.',
      en: 'Куб выбора: три координаты ценностных ориентиров персонажей, сообществ и организаций.',
    },
  },
  {
    id: 'cosmology',
    types: ['cosmology'],
    order: 1,
    label: { ru: 'Космология', en: 'Космология' },
    description: {
      ru: 'Эфир, Вуаль, материальный мир, архетипы.',
      en: 'Эфир, Вуаль, материальный мир, архетипы.',
    },
  },
  {
    id: 'history',
    types: ['event', 'era', 'location'],
    order: 2,
    label: { ru: 'История', en: 'История' },
    description: {
      ru: 'Эпохи, Пробуждение, войны, Звёздный Дождь.',
      en: 'Эпохи, Пробуждение, войны, Звёздный Дождь.',
    },
  },
  {
    id: 'magic',
    types: ['magic'],
    order: 3,
    label: { ru: 'Эфирология', en: 'Эфирология' },
    description: {
      ru: 'Эфирологическое взаимодействие, Домены, спецификации, цена и безопасность применения.',
      en: 'Эфирологическое взаимодействие, Домены, спецификации, цена и безопасность применения.',
    },
  },
  {
    id: 'phenomena',
    types: ['phenomenon'],
    order: 4,
    label: { ru: 'Явления', en: 'Явления' },
    description: {
      ru: 'Выгорание, Вероятностный Распад, эфирные штормы.',
      en: 'Выгорание, Вероятностный Распад, эфирные штормы.',
    },
  },
  {
    id: 'technology',
    types: ['technology'],
    order: 5,
    label: { ru: 'Технологии', en: 'Технологии' },
    description: {
      ru: 'Обычные и гибридные технологии, Нулевые Поля и искусственный интеллект.',
      en: 'Обычные и гибридные технологии, Нулевые Поля и искусственный интеллект.',
    },
  },
  {
    id: 'races',
    types: ['race'],
    order: 6,
    label: { ru: 'Народы', en: 'Народы' },
    description: {
      ru: 'Разумные народы Земли 2435 года: происхождение, физиология, культура и общественное положение.',
      en: 'Разумные народы Земли 2435 года: происхождение, физиология, культура и общественное положение.',
    },
  },
  {
    id: 'countries',
    types: ['country'],
    order: 7,
    label: { ru: 'Государства', en: 'Государства' },
    description: {
      ru: 'Эгида, Вердана, Железная Лига и другие государства и полисы.',
      en: 'Эгида, Вердана, Железная Лига и другие государства и полисы.',
    },
  },
  {
    id: 'factions',
    types: ['organization', 'faction', 'conflict'],
    order: 8,
    label: { ru: 'Фракции', en: 'Фракции' },
    description: {
      ru: 'Ордена, синдикаты, культы и их интересы.',
      en: 'Ордена, синдикаты, культы и их интересы.',
    },
  },
  {
    id: 'concepts',
    types: ['concept', 'meta', 'culture', 'game'],
    order: 9,
    label: { ru: 'Понятия', en: 'Понятия' },
    description: {
      ru: 'Принципы мира, божественность, Домены, кампании.',
      en: 'Принципы мира, божественность, Домены, кампании.',
    },
  },
]

export function categoryById(id: string): CategoryDef | undefined {
  return categories.find((c) => c.id === id)
}

export function categoryForType(type: string | undefined): CategoryDef | undefined {
  if (!type) return undefined

  return categories.find((c) => c.types.includes(type))
}

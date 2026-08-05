import { renderMarkdown } from './markdown'

import type { BookEntry } from './books'

export type GalleryCharacter = {
  id: string
  numberLabel: string
  name: string
  image?: string
  imageAlt: string
  primaryMeta: string
  secondaryMeta: string
  badge: string
  badgeTone: 'active' | 'muted' | 'exceptional'
  html: string
  filters: Record<string, string>
  search: string
}

const romanDegrees: Record<string, string> = { '1': 'I', '2': 'II', '3': 'III', '4': 'IV', '5': 'V', '6': 'VI' }

function degreeLabel(degree: string): string {
  return `${romanDegrees[degree] ?? degree} степень`
}

function fieldValue(body: string, label: string): string {
  const escaped = label.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)

  return (
    body
      .match(new RegExp(String.raw`\*\*${escaped}:\*\*\s*([\s\S]*?)(?=\s*\*\*[^*\n]+:\*\*|\n\s*\n|$)`, 'u'))?.[1]
      ?.replaceAll(/\s+/g, ' ')
      .replace(/[.;]$/u, '')
      .trim() ?? ''
  )
}

function normalizePeople(people: string): string {
  const normalized = people.toLocaleLowerCase('ru')

  if (normalized.startsWith('перевёртыш')) return 'перевёртыш'

  if (normalized.startsWith('конструкт')) return 'конструкт'

  return people.replace(/[.;]$/u, '').trim()
}

function searchText(values: string[]): string {
  return values.join(' ').toLocaleLowerCase('ru').replaceAll('ё', 'е')
}

function compassValues(compass: string): [string, string, string] {
  const values = compass
    .split('·')
    .map((value) => value.trim())
    .filter(Boolean)

  return [values[0] ?? 'неизвестно', values[1] ?? 'неизвестно', values[2] ?? 'неизвестно']
}

function imageSlug(name: string): string {
  const letters: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  }
  const slug = name
    .toLocaleLowerCase('ru')
    .replaceAll(/[а-яё]/gu, (letter) => letters[letter] ?? letter)
    .replaceAll(/[^a-z0-9]+/gu, '-')
    .replaceAll(/^-+|-+$/gu, '')
  const legacyImageSlugs: Record<string, string> = {
    'bran-mednyy': 'bran-medny',
    'halid-nulevoy-chas': 'khalid-nulevoy-chas',
    'kern-bez-treschin': 'kern-bez-treshchin',
    'tor-kaan-schitayuschiy-plamya': 'tor-kaan-schitayushchiy-plamya',
    'spyaschiy-bazalt': 'spyashchiy-bazalt',
    'okean-iduschih-imen': 'okean-idushchih-imen',
    'urg-saan-nesuschiy-den': 'urg-saan-nesushchiy-den',
  }

  return legacyImageSlugs[slug] ?? slug
}

export async function parsePregens(book: BookEntry, imageByNumber: Map<number, string>): Promise<GalleryCharacter[]> {
  const blocks = [...book.body.matchAll(/^###\s+(\d+)\.\s+(.+?)\n([\s\S]*?)(?=^###\s+\d+\.|(?![\s\S]))/gm)]

  return Promise.all(
    blocks.map(async (match) => {
      const number = Number(match[1])
      const name = match[2].trim()
      const body = match[3].trim()
      const people = fieldValue(body, 'Народ')
      const peopleGroup = normalizePeople(people)
      const role = fieldValue(body, 'Роль')
      const profession = fieldValue(body, 'Профессия')
      const gender = fieldValue(body, 'Пол').replace(/[.;]$/u, '').trim()
      const ether = fieldValue(body, 'Эфирологический профиль')
      const compass = fieldValue(body, 'Куб выбора').replace(/[.;]$/u, '').trim()
      const [care, method, change] = compassValues(compass)
      const isMagical = !ether.toLocaleLowerCase('ru').startsWith('отсутствует')

      return {
        id: `pregen-${number}`,
        numberLabel: `№ ${number}`,
        name,
        image: imageByNumber.get(number),
        imageAlt: `Портрет: ${name}`,
        primaryMeta: `${peopleGroup} · ${role}`,
        secondaryMeta: profession,
        badge: isMagical ? 'Связан с Эфиром' : 'Без эфирологии',
        badgeTone: isMagical ? 'active' : 'muted',
        html: await renderMarkdown(body, { swadeTooltips: true }),
        filters: {
          people: peopleGroup,
          ether: isMagical ? 'yes' : 'no',
          gender,
          care,
          method,
          change,
        },
        search: searchText([name, people, role, profession, compass]),
      } satisfies GalleryCharacter
    }),
  )
}

export async function parseAscended(
  book: BookEntry,
  imageBySlug: Map<string, string>,
  firstImage?: string,
): Promise<GalleryCharacter[]> {
  const firstMatch = book.body.match(/^### Первый\n([\s\S]*?)(?=^##\s+\d+\.|(?![\s\S]))/m)
  const firstBody = firstMatch?.[1]?.trim() ?? ''
  const first: GalleryCharacter = {
    id: 'ascended-first',
    numberLabel: 'Особая запись',
    name: 'Первый',
    image: firstImage,
    imageAlt: 'Символическая реконструкция Первого',
    primaryMeta: 'Вознесшийся · вне степеней',
    secondaryMeta: 'Подтверждён только Домен Вознесения',
    badge: 'Вознесшийся',
    badgeTone: 'exceptional',
    html: await renderMarkdown(firstBody, { swadeTooltips: true }),
    filters: {
      people: 'неизвестно',
      degree: 'outside',
      care: 'неизвестно',
      method: 'неизвестно',
      change: 'неизвестно',
    },
    search: searchText(['Первый', 'Вознесшийся', 'Вознесение']),
  }

  const degreeSections = [
    ...book.body.matchAll(/^##\s+\d+\.\s+Вознесённые степени\s+(\d+)\s*\n([\s\S]*?)(?=^##\s+\d+\.|(?![\s\S]))/gm),
  ]
  const ascended: GalleryCharacter[] = []
  let sequence = 0

  for (const sectionMatch of degreeSections) {
    const degree = sectionMatch[1]
    const sectionBody = sectionMatch[2]
    const blocks = [...sectionBody.matchAll(/^###\s+\d+\.\s+(.+?)\n([\s\S]*?)(?=^###\s+\d+\.|(?![\s\S]))/gm)]

    for (const match of blocks) {
      sequence += 1
      const name = match[1].trim()
      const body = match[2].trim()
      const people = fieldValue(body, 'Народ')
      const domains = fieldValue(body, 'Домены')
      const status = fieldValue(body, 'Статус')
      const compass = fieldValue(body, 'Куб выбора').replace(/[.;]$/u, '').trim()
      const [care, method, change] = compassValues(compass)
      const peopleGroup = normalizePeople(people)

      ascended.push({
        id: `ascended-${sequence}`,
        numberLabel: `№ ${sequence} · степень ${degree}`,
        name,
        image: imageBySlug.get(imageSlug(name)),
        imageAlt: `Портрет Вознесённого: ${name}`,
        primaryMeta: peopleGroup,
        secondaryMeta: domains || status,
        badge: degreeLabel(degree),
        badgeTone: degree === '6' ? 'exceptional' : 'active',
        html: await renderMarkdown(body, { swadeTooltips: true }),
        filters: {
          people: peopleGroup,
          degree,
          care,
          method,
          change,
        },
        search: searchText([name, people, domains, status, compass]),
      })
    }
  }

  return [first, ...ascended]
}

export function fieldOptions(characters: GalleryCharacter[], field: string): string[] {
  return [
    ...new Set(
      characters
        .map((item) => item.filters[field])
        .filter((value) => value && value.toLocaleLowerCase('ru') !== 'неизвестно'),
    ),
  ].sort((a, b) => a.localeCompare(b, 'ru', { numeric: true }))
}

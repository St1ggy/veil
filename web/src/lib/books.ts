import { type CollectionEntry, getCollection } from 'astro:content'

import { withBase } from './wiki'

import type { Lang } from '../i18n/ui'

export type BookEntry = CollectionEntry<'rawBooks'>

export type BookSection = {
  book: BookEntry
  title: string
  slug: string
  level: number
  markdown: string
  summary: string
  order: number
}

const SECTION_NAMES: Record<string, string> = {
  '00_meta': 'О проекте',
  '01_foundations': 'Основы мира',
  '02_world': 'Мир',
  '03_civilization': 'Цивилизация',
  '04_organizations': 'Организации',
  '05_conflicts': 'Конфликты и безопасность',
  '06_game': 'Игра',
}

export function slugify(value: string): string {
  return (
    value
      .toLocaleLowerCase('ru')
      .replaceAll(/[№#]/g, '')
      .replaceAll(/[^а-яёa-z0-9]+/g, '-')
      .replaceAll(/^-|-$/g, '') || 'section'
  )
}

export async function getBooks(): Promise<BookEntry[]> {
  return (await getCollection('rawBooks')).sort((a, b) => a.id.localeCompare(b.id, 'ru', { numeric: true }))
}

export function bookGroup(book: BookEntry): string {
  return SECTION_NAMES[book.id.split('/', 1)[0]] ?? 'Другие книги'
}

export function bookHref(lang: Lang, id: string): string {
  return withBase(`${lang}/book/${encodeURIComponent(id)}`)
}

export function articleHref(lang: Lang, section: BookSection): string {
  return `${bookHref(lang, section.book.data.id)}#${section.slug}`
}

export function plainText(markdown: string): string {
  return markdown
    .replaceAll(/```[\s\S]*?```/g, ' ')
    .replaceAll(/[#>*_`|\[\]()]/g, ' ')
    .replaceAll(/\s+/g, ' ')
    .trim()
}

export function bookSummary(book: BookEntry): string {
  const body = book.body ?? ''
  const paragraph_ = body
    .replace(/^---[\s\S]*?---\s*/u, '')
    .split(/\n\s*\n/u)
    .map((paragraph) => plainText(paragraph))
    .filter((paragraph) => paragraph.length > 70)
    .find(
      (paragraph) =>
        !/^(?:назначение документа|настоящий документ|данный документ|этот документ|книга содержит)/iu.test(paragraph),
    )
  const text = (paragraph_ ?? plainText(body)).replace(book.data.title, '').trim()

  return text.slice(0, 220).replace(/\s+\S*$/u, '') + (text.length > 220 ? '…' : '')
}

export function bookHighlights(book: BookEntry): string[] {
  return sectionsOf(book)
    .filter((section) => !/^назначение документа$/iu.test(section.title))
    .slice(0, 3)
    .map((section) => section.title)
}

const SECTION_ACCENTS: Record<string, string> = {
  'О проекте': 'oklch(0.74 0.12 80)',
  'Основы мира': 'oklch(0.74 0.11 165)',
  Мир: 'oklch(0.74 0.11 235)',
  Цивилизация: 'oklch(0.74 0.12 305)',
  Организации: 'oklch(0.76 0.12 55)',
  'Конфликты и безопасность': 'oklch(0.71 0.14 25)',
  Игра: 'oklch(0.74 0.12 135)',
}

export function bookAccent(book: BookEntry): string {
  return SECTION_ACCENTS[bookGroup(book)] ?? 'oklch(0.72 0.11 210)'
}

export function sectionsOf(book: BookEntry): BookSection[] {
  const body = book.body ?? ''
  const matches = [...body.matchAll(/^(#{2,4})\s+(.+?)\s*$/gm)]
  const used = new Map<string, number>()

  return matches
    .map((match, order) => {
      const start = (match.index ?? 0) + match[0].length
      let end = body.length
      const level = match[1].length

      for (const following of matches.slice(order + 1)) {
        if (following[1].length <= level) {
          end = following.index ?? end
          break
        }
      }
      const rawTitle = match[2].trim()
      const title = rawTitle.replace(/^\d+(?:\.\d+)*\.\s*/, '').trim()
      // Astro assigns heading ids from the full heading, including its section number.
      // Keep the same source here so table-of-contents links target the rendered book.
      const base = slugify(rawTitle)
      const number = (used.get(base) ?? 0) + 1

      used.set(base, number)
      const slug = number === 1 ? base : `${base}-${number}`
      const markdown = body.slice(start, end).trim()
      const summary = plainText(markdown)
        .slice(0, 280)
        .replace(/\s+\S*$/, '')

      return { book, title, slug, level, markdown, summary, order }
    })
    .filter((section) => section.markdown.length > 40)
}

export function allSections(books: BookEntry[]): BookSection[] {
  return books.flatMap(sectionsOf)
}

export function relatedSections(current: BookSection, all: BookSection[]): BookSection[] {
  const words = new Set(
    slugify(current.title)
      .split('-')
      .filter((word) => word.length > 4),
  )

  return all
    .filter((candidate) => candidate !== current)
    .map((candidate) => ({
      candidate,
      score:
        slugify(candidate.title)
          .split('-')
          .filter((word) => words.has(word)).length + (candidate.book.data.id === current.book.data.id ? 0.5 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ candidate }) => candidate)
}

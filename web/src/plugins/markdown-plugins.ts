import { fileURLToPath } from 'node:url'
import { defineMdastPlugin } from 'satteri'

import { automaticSwadeTerms, swadeBook } from '../data/swadeTerms'

const wikilinkPattern = /\[\[([A-Z][A-Z0-9_]*)(?:\|([^\]]+))?\]\]/g
const escape = (value: string) => value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)

type MdastInline =
  | { type: 'text'; value: string }
  | { type: 'html'; value: string }
  | { type: 'link'; url: string; children: { type: 'text'; value: string }[] }

/**
 * Wikilinks become relative sibling entity URLs: ./ID
 * (entity pages live under /{lang}/entity/{ID})
 */
export function wikilinksPlugin() {
  return defineMdastPlugin({
    name: 'wikilinks',
    text(node, ctx) {
      if (!node.value?.includes('[[')) return

      const value = node.value
      const children: MdastInline[] = []
      let last = 0
      let match: RegExpExecArray | null

      wikilinkPattern.lastIndex = 0
      while ((match = wikilinkPattern.exec(value)) !== null) {
        if (match.index > last) {
          children.push({ type: 'text', value: value.slice(last, match.index) })
        }

        const id = match[1]
        const label = match[2] || id

        children.push({
          type: 'link',
          url: `./${id}`,
          children: [{ type: 'text', value: label }],
        })
        last = match.index + match[0].length
      }

      if (children.length === 0) return

      if (last < value.length) {
        children.push({ type: 'text', value: value.slice(last) })
      }

      replaceTextNode(ctx, node, children)
    },
  })
}

/**
 * Factory so each document gets a fresh `seen` set for first-occurrence tooltips.
 */
export function swadeTooltipsPlugin() {
  const seen = new Set<string>()

  return defineMdastPlugin({
    name: 'swade-tooltips',
    text(node, ctx) {
      const sourcePath = ctx.fileURL ? fileURLToPath(ctx.fileURL).replaceAll('\\', '/') : ''

      if (!sourcePath.includes('06_game/')) return

      const parent = ctx.parent(node)

      // Keep headings as plain text: injected HTML changes Astro's generated id
      // and would make the book table of contents point at a non-existent anchor.
      if (!parent || ['heading', 'link', 'code', 'inlineCode'].includes(parent.type)) return

      let value = node.value
      const children: MdastInline[] = []

      while (value) {
        let best: { ru: string; original: string; match: RegExpExecArray } | null = null

        for (const [ru, original] of automaticSwadeTerms) {
          if (seen.has(ru)) continue

          const match = new RegExp(String.raw`(?<![\p{L}\p{N}])${escape(ru)}(?![\p{L}\p{N}])`, 'u').exec(value)

          if (match && (!best || match.index < best.match.index)) best = { ru, original, match }
        }

        if (!best) {
          children.push({ type: 'text', value })
          break
        }

        if (best.match.index) children.push({ type: 'text', value: value.slice(0, best.match.index) })

        const label = best.match[0]

        children.push({
          type: 'html',
          value: `<abbr class="term-tooltip" data-tooltip="[${best.original}][${swadeBook}]" data-tooltip-kind="swade" tabindex="0">${label}</abbr>`,
        })
        seen.add(best.ru)
        value = value.slice(best.match.index + label.length)
      }

      replaceTextNode(ctx, node, children)
    },
  })
}

function replaceTextNode(
  ctx: {
    setProperty: (node: { type: string; value: string }, key: 'value', value: string) => void
    insertBefore: (node: { type: string }, nodes: MdastInline[]) => void
    removeNode: (node: { type: string }) => void
  },
  node: { type: string; value: string },
  children: MdastInline[],
): void {
  if (children.length === 0) return

  if (children.length === 1 && children[0].type === 'text') {
    if (children[0].value !== node.value) ctx.setProperty(node, 'value', children[0].value)

    return
  }

  if (children.length > 1 || children[0]?.type !== 'text') {
    // eslint-disable-next-line unicorn/prefer-modern-dom-apis -- Sätteri visitor API, not DOM
    ctx.insertBefore(node, children)
    ctx.removeNode(node)
  }
}

/**
 * Shared plugin list for astro.config and runtime markdown.
 */
export function contentMdastPlugins() {
  return [wikilinksPlugin(), swadeTooltipsPlugin]
}

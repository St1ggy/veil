import { createSatteriMarkdownProcessor } from '@astrojs/markdown-satteri'

import { contentMdastPlugins } from '../plugins/markdown-plugins'

import { decorateDiceNotation } from './dice'

import type { MarkdownRenderer } from '@astrojs/internal-helpers/markdown'

const virtualGameFile = new URL('file:///virtual/rawBooks/world_bible/06_game/runtime.md')

let rendererPromise: Promise<MarkdownRenderer> | undefined

function getRenderer(): Promise<MarkdownRenderer> {
  rendererPromise ??= createSatteriMarkdownProcessor({
    mdastPlugins: contentMdastPlugins(),
  })

  return rendererPromise
}

export async function renderMarkdown(markdown: string, options: { swadeTooltips?: boolean } = {}): Promise<string> {
  const renderer = await getRenderer()
  const prepared = decorateDiceNotation(markdown)
  const result = await renderer.render(prepared, {
    fileURL: options.swadeTooltips ? virtualGameFile : undefined,
  })

  return result.code
}

/**
 * Convert [[ENTITY_ID]] / [[ID|label]] to encyclopedia links, then render Markdown.
 */
export async function renderGameMarkdown(md: string, entityHrefFor: (id: string) => string): Promise<string> {
  const withLinks = md.replaceAll(/\[\[([A-Z][A-Z0-9_]*)(?:\|([^\]]+))?\]\]/g, (_m, id: string, label?: string) => {
    const text = label || id

    return `[${text}](${entityHrefFor(id)})`
  })

  return renderMarkdown(withLinks)
}

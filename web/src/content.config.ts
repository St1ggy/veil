import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const relation = z.object({
  type: z.string(),
  target: z.string(),
})

const wikiSchema = z
  .object({
    id: z.string(),
    type: z.string().optional(),
    title: z.string(),
    status: z.string().optional(),
    version: z.union([z.number(), z.string()]).optional(),
    created: z.union([z.string(), z.date()]).optional(),
    updated: z.union([z.string(), z.date()]).optional(),
    authors: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    aliases: z.array(z.string()).optional(),
    summary: z.string().optional(),
    importance: z.string().optional(),
    spoilers: z.string().optional(),
    visibility: z.string().optional(),
    relations: z.array(relation).optional(),
    timeline: z.record(z.string(), z.any()).optional(),
    book_section: z.string().optional(),
    book_order: z.number().optional(),
    source_path: z.string().optional(),
  })
  .loose()

const wiki = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '!**/_templates/**', '!**/en/**'],
    base: '.generated/wiki',
  }),
  schema: wikiSchema,
})

const rawBooks = defineCollection({
  loader: glob({
    pattern: ['**/*.md'],
    base: '../rawBooks/world_bible',
  }),
  schema: z
    .object({
      id: z.string(),
      title: z.string(),
      status: z.string().optional(),
      version: z.union([z.number(), z.string()]).optional(),
      category: z.string().optional(),
      parent: z.string().optional(),
      previous: z.array(z.string()).optional(),
      next: z.array(z.string()).optional(),
      related: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
    })
    .loose(),
})

export const collections = { wiki, rawBooks }

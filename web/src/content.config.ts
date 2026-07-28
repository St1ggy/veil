import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const relation = z.object({
  type: z.string(),
  target: z.string(),
});

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
  })
  .passthrough();

const wiki = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "!_templates/**", "!en/**"],
    base: "../wiki",
  }),
  schema: wikiSchema,
});

const wikiEn = defineCollection({
  loader: glob({
    pattern: ["**/*.md"],
    base: "../wiki/en",
  }),
  schema: wikiSchema,
});

export const collections = { wiki, wikiEn };

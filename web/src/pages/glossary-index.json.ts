import { publishedGlossary } from '../lib/glossary'

import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const terms = await publishedGlossary('ru')

  return Response.json(
    terms.map(({ name, definition, href, automatic }) => ({ name, definition, href, automatic })),
    {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    },
  )
}

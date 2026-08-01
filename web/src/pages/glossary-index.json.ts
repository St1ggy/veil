import type { APIRoute } from "astro";
import { publishedGlossary } from "../lib/glossary";

export const GET: APIRoute = async () => {
  const terms = await publishedGlossary("ru");
  return new Response(JSON.stringify(terms.map(({ name, definition, href }) => ({ name, definition, href }))), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};

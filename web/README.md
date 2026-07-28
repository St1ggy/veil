# Veil web (Astro)

Static encyclopedia from `../wiki/**/*.md`.

## Routes

| Path | Purpose |
|------|---------|
| `/` | Redirect → `/ru` |
| `/ru`, `/en` | Home + category grid |
| `/{lang}/category/{id}` | Section listing |
| `/{lang}/entity/{ID}` | Article |
| `/{lang}/about` | About |
| `/{lang}/glossary` | Glossary (canonical terms) |

Languages: UI fully bilingual. Article bodies are Russian until `wiki` gains EN mirrors; EN uses Latin aliases for titles.

## Commands

```bash
npm install
npm run dev
npm run build    # → ../site
```

Root: `make site`.

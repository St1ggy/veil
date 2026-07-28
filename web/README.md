# Veil web (Astro)

Static encyclopedia built from `../wiki/**/*.md` (Russian) and `../wiki/en/**/*.md` (English).

## Routes

| Path | Purpose |
|------|---------|
| `/` | Redirect → `/ru` |
| `/ru`, `/en` | Home + category grid |
| `/{lang}/category/{id}` | Section listing |
| `/{lang}/entity/{ID}` | Article |
| `/{lang}/about` | About the world |
| `/{lang}/system` | SWADE game system (detailed) |
| `/{lang}/glossary` | Glossary |

UI, metadata labels (type / status / tags / relations), and article bodies are bilingual.

## Commands

```bash
npm install
npm run dev
npm run build    # → ../site
```

Root: `make site`.

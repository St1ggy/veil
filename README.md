# Veil

Worldbuilding knowledge base for an original TTRPG setting: **Earth 2435** after the Veil weakened and magic (probability / Ether) returned.

## Governance

Read before contributing lore:

1. [`meta/PROJECT_CONSTITUTION.md`](meta/PROJECT_CONSTITUTION.md)
2. [`meta/DESIGN_PRINCIPLES.md`](meta/DESIGN_PRINCIPLES.md)
3. [`meta/RULES.md`](meta/RULES.md)

## Architecture

Three source layers (see `meta/ADR/0001-three-layer-sot.md`):

| Layer | Path | Role |
|-------|------|------|
| Facts | `data/` | YAML entities, IDs, relations |
| Encyclopedia | `wiki/` | Markdown prose |
| Books | `books/` | Typst PDF volumes |
| Game | `game/` | Player / GM materials |
| Meta | `meta/` | Rules and process |

Generated (do not edit): `out/`, `site/`, `api/`, `graphs/`, `data/_index/`.

## Quick start

```bash
python3 -m venv .venv
.venv/bin/pip install PyYAML jsonschema python-frontmatter
cd web && npm install && cd ..
make validate
make index
make pdf
make site
make api
```

Requires: Python 3.11+, Node.js 22+, [Typst](https://typst.app/).

Site source: [`web/`](web/) (Astro). Build output: `site/`.

## Add an entity

1. Read Constitution + Design Principles + `meta/RULES.md`
2. Answer the six creation questions in the Constitution
3. Copy a template from `wiki/_templates/`
4. Create matching `data/**/*.yaml` with the same `id`
5. Keep `status` at `draft` or `research` until review

## License

Lore and creative content: All Rights Reserved. Tooling: MIT. See `LICENSE` and `meta/ADR/0003-licensing.md`.

# Roadmap

## Foundation (done in scaffold)

- [x] Three-layer architecture ADR
- [x] Meta rules, schemas, templates
- [x] Cursor rules and skills
- [x] GitHub templates and CI stubs
- [x] ADR-0005: game layer as mechanical SoT
- [x] Setting Book SDK scaffold (`game/`, `meta/game/`)

## Encyclopedia MVP

- [x] Core cosmology and history in data+wiki (seed approved)
- [x] First countries, races, factions
- [x] Link graph and timeline under `graphs/` (via `make index`)

## Setting Book SDK

- [x] Core integration docs (`meta/game/`)
- [x] Catalog skeleton + schemas + templates
- [x] Chargen / Ancestries / Edges / Hindrances / AB / Powers design scaffolds
- [x] Setting Rules catalog (design docs)
- [x] Equipment / Vehicles / Crafting / Economy play layer scaffolds
- [x] NPC / Bestiary / Factions play / Campaigns scaffolds
- [x] GM toolkit seeds + generators
- [x] Design philosophies + qualitative budgets
- [x] PH / GM Guide / Setting Book Typst shells
- [x] `make index` / `make api` export mechanical (`game/`) IDs
- [x] Spoiler lint: gm content outside `game/gm/` is an error
- [ ] Fill mechanical content (still no SWADE reprint; add Veil stats later under policy)
- [ ] Generate `/system` TOC from `game/` automatically

## Player primer

- [x] `game/player/primers` session-zero primer
- [x] Player handbook Typst volume (SDK shell)

## GM secrets

- [x] GM guide volume (SDK shell)
- [x] Spoiler lint enforced hard in CI (`canon_status` errors for gm outside `game/gm/`)

## Public site

- [x] Static site from wiki (Astro in `web/`)
- [x] System page (SWADE design overview)
- [x] JSON API dump (`make api`) — extend for game IDs later

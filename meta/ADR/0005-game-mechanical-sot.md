# ADR-0005: Game layer as mechanical SoT

## Status

Accepted

## Context

ADR-0001 defines three world layers (`data` / `wiki` / `books`). The project also maintains `game/` for SWADE-compatible Setting Book mechanics and spoilers. Public design copy lived in Constitution and `web/src/data/system.ts` while `game/` stayed empty.

## Decision

1. **World SoT** remains `data/` + `wiki/` (encyclopedia facts and prose).
2. **Mechanical SoT** is `game/` — Setting Book design docs, mechanical entity YAML, player/GM play materials.
3. **`books/`** composes world + game sources; does not invent mechanical canon.
4. **`web/src/data/system.ts`** is a public overview; long-term it should mirror `game/` TOC, not be a second SoT.
5. Mechanical entities use dedicated ID prefixes (`EDGE_`, `HIND_`, `AB_`, `POWER_`, `SR_`, …) and link to lore via `relations`.

## Consequences

- Lore stays encyclopedic; play design lives under `game/`.
- Validators treat game YAML as first-class IDs.
- No reproduction of SWADE core rules text; only Veil extension design.

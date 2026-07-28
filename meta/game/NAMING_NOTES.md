# Naming notes (Setting Book SDK)

## `organization` vs `faction`

- Lore SoT uses `type: organization` with prefix `ORG_` for live entities.
- Schema/template `faction` / prefix `FAC_` remain for generic faction aggregates if needed.
- Play layer uses `FPAC_*` (`faction_pack`) linked to `ORG_*` via `lore_targets`.

Do not create parallel encyclopedia articles that duplicate the same org under both `FAC_` and `ORG_`.

## `monster` vs `creature`

- Prefer `wiki/_templates/creature.md` + `CRT_` / `type: creature` for new lore beasts.
- `wiki/_templates/monster.md` is a legacy alias; new work should use `creature`.
- Mechanical bestiary seeds use `BEST_*` under `game/bestiary/` and link to `CRT_*` when lore exists.

## Spells vs Powers

- Lore may use `SPELL_*` for encyclopedia “заклинания”.
- Setting Book power *design* uses `POWER_*` / `PMOD_*` (trappings/risks), never a reprint of SWADE core powers.

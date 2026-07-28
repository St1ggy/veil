#import "../../lib/veil.typ": *

#show: apply-veil-style

= Setting Book (SDK shell)

Оболочка собственной книги сеттинга Veil of Worlds.

Совместима с Savage Worlds Adventure Edition как базовым движком.
Ядро SWADE не пересказывается. Здесь — оглавление собственного контента.

== Governance

- Конституция: `meta/PROJECT_CONSTITUTION.md`
- Mechanical SoT ADR: `meta/ADR/0005-game-mechanical-sot.md`
- Integration: `meta/game/`

== World encyclopedia

Лор собирается из `data/` + `wiki/` (не дублировать здесь длинную прозу).

== Game SDK map

- Character creation: `game/player/chargen/`
- Ancestries: `game/player/ancestries/`
- Edges / Hindrances: `game/player/edges/`, `game/player/hindrances/`
- Arcane Backgrounds / Powers design: `game/player/arcane_backgrounds/`, `game/player/powers/`
- Setting Rules: `game/player/setting_rules/`
- Equipment / Vehicles / Crafting / Economy: соответствующие каталоги в `game/player/`
- Design & budgets: `game/design/`
- Campaigns: `game/campaigns/`
- Factions play: `game/factions/`
- GM toolkit: `game/gm/`

== Public overview

Сайт: страница «Система» (`web/src/data/system.ts`).

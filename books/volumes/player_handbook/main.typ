#import "../../lib/veil.typ": *

#show: apply-veil-style

= Player Handbook (SDK shell)

Краткий справочник игрока. Секреты мастера сюда не входят.

Полный механический SoT: каталог `game/player/`.

== Primer

#include "../../../game/player/primers/what-locals-know.typ"

== Character creation

См. design docs в `game/player/chargen/` (Character Creation SDK).

== Ancestries

Пакеты `ANC_*` в `game/player/ancestries/` связаны с лор-расами `RACE_*`.

== Edges and Hindrances

Каталоги `game/player/edges/` и `game/player/hindrances/` — design seeds без reprint core SWADE.

== Arcane Backgrounds

`game/player/arcane_backgrounds/`

== Setting Rules (player-facing index)

Индекс: `game/player/setting_rules/README.md` и отдельные `SR_*`.

== Equipment and vehicles

`game/player/equipment/`, `game/player/vehicles/`

== Crafting and economy (play)

`game/player/crafting/`, `game/player/economy/`, `game/player/reputation/`

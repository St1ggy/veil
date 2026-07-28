# Схема идентификаторов

Формат: `{TYPE}_{NAME}` — `UPPER_SNAKE`, ASCII, стабильный.

## Префиксы

| Префикс | Тип |
|---------|-----|
| `COS_` | Космология |
| `RACE_` | Раса / народ |
| `CRT_` | Существо |
| `NPC_` | NPC |
| `HIST_` | Историческая фигура |
| `REG_` | Регион |
| `CITY_` | Город |
| `SITE_` | Локация / сайт |
| `BIOME_` | Биом |
| `COUNTRY_` | Государство |
| `STATE_` | Полит. сущность ≠ country |
| `ORG_` | Организация |
| `REL_` | Религия |
| `FAC_` | Фракция (общий) |
| `TECH_` | Технология / система |
| `AI_` | ИИ |
| `DEV_` | Устройство |
| `MAG_` | Магическая система / практика |
| `SPELL_` | Заклинание |
| `ART_` | Артефакт |
| `PHENO_` | Явление |
| `EVENT_` | Событие |
| `ERA_` | Эпоха |
| `RES_` | Ресурс |
| `CUR_` | Валюта |
| `ECON_` | Экономический концепт |
| `LANG_` | Язык |
| `CUL_` | Культура |
| `CONCEPT_` | Сквозное понятие |
| `GOD_` | Божество |
| `ANC_` | Ancestry package (game) |
| `EDGE_` | Edge (game) |
| `HIND_` | Hindrance (game) |
| `AB_` | Arcane Background (game) |
| `POWER_` | Power design doc / trapping package (game) |
| `PMOD_` | Power Modifier design (game) |
| `SR_` | Setting Rule (game) |
| `EQ_` | Equipment (game) |
| `VEH_` | Vehicle (game) |
| `CRAFT_` | Crafting blueprint / rule (game) |
| `NPCARCH_` | NPC archetype (game) |
| `BEST_` | Bestiary entry (game) |
| `FPAC_` | Faction play pack (game) |
| `CAMP_` | Campaign frame (game) |
| `ADV_` | Adventure (game/gm) |
| `PLOT_` | Plot / quest arc (game/gm) |
| `ENC_` | Encounter (game/gm) |
| `GEN_` | Generator / random table (game/gm) |
| `BUDGET_` | Balance budget doc (game/design) |

## Правила

1. После `approved` ID не переименовывается
2. Display name меняется через `title` / `aliases`
3. Один ID — одна сущность
4. Имя в ID — краткое латинское мнемоническое (`COS_ETHER`, не `COS_THE_FUNDAMENTAL_ETHER`)

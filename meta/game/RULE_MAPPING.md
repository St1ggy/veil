---
title: Rule Mapping
status: approved
version: 0.1
created: '2026-07-29'
updated: '2026-07-29'
purpose: |
  Карта «лор-сущность → точка расширения SWADE Setting Book».
scope: |
  Только маппинг типов; без пересказа правил SWADE.
related:
  - meta/game/EXTENSION_POINTS.md
  - meta/PROJECT_CONSTITUTION.md
changelog:
  - date: '2026-07-29'
    note: Initial SDK scaffold.
---

# Rule Mapping

## Назначение

Карта «лор-сущность → точка расширения SWADE Setting Book».

## Область ответственности

Только маппинг типов; без пересказа правил SWADE.

## Связанные документы

- `meta/game/EXTENSION_POINTS.md`
- `meta/PROJECT_CONSTITUTION.md`


## Карта

| Лор | Extension point |
|-----|-----------------|
| `RACE_*` | Ancestry package (`ANC_*`) |
| `MAG_*` | Arcane Background (`AB_*`), Power themes |
| `PHENO_*` | Setting Rules (`SR_*`), Hindrances |
| `TECH_*` | Edges, Equipment, Vehicles |
| `ORG_*` / `FAC_*` | Faction play packs, Faction Edges |
| `CONCEPT_DOMAIN` / `GOD_*` | Domain / Divine Edges & SR |
| `CONCEPT_ARCANUM` | Cross-cutting SR + balance budgets |
| `CONCEPT_CAMPAIGNS` | Campaign frames (`CAMP_*`) |
| `CRT_*` / `NPC_*` | Bestiary / NPC archetypes |
| `ART_*` / `DEV_*` | Equipment / relics |

## История изменений

| Дата | Изменение |
|------|-----------|
| 2026-07-29 | Initial SDK scaffold |

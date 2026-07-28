---
title: Core Integration
status: approved
version: 0.1
created: '2026-07-29'
updated: '2026-07-29'
purpose: |
  Как лор (data/wiki) стыкуется с механическим слоем game/.
scope: |
  Политика связей ID, mechanical flag, запрет дублирования прозы.
related:
  - meta/ADR/0005-game-mechanical-sot.md
  - meta/ID_SCHEME.md
  - meta/PROJECT_CONSTITUTION.md
changelog:
  - date: '2026-07-29'
    note: Initial SDK scaffold.
---

# Core Integration

## Назначение

Как лор (data/wiki) стыкуется с механическим слоем game/.

## Область ответственности

Политика связей ID, mechanical flag, запрет дублирования прозы.

## Связанные документы

- `meta/ADR/0005-game-mechanical-sot.md`
- `meta/ID_SCHEME.md`
- `meta/PROJECT_CONSTITUTION.md`


## Правила

1. Энциклопедия описывает мир; `game/` описывает, как мир играется.
2. Механическая запись ссылается на лор через `relations` (`implements`, `derives_from`, `uses`, `related_to`).
3. Не копировать длинную wiki-прозу в game-файлы — только design notes и play hooks.
4. Поле `mechanical: true` на lore-сущности означает: есть playable footprint в `game/`.
5. Публичная страница `/system` не является SoT.

## История изменений

| Дата | Изменение |
|------|-----------|
| 2026-07-29 | Initial SDK scaffold |

---
name: create-adventure
description: Создать приключение Veil в game/gm/adventures (ADV_). Use when user asks to create приключение.
---

# Создать приключение

## Когда использовать

Пользователь просит добавить приключение.

## Шаги

1. Прочитай `meta/RULES.md`, `meta/ID_SCHEME.md`, `meta/game/QUALITY_GATE.md`, `meta/SPOILER_POLICY.md`
2. ID с префиксом `ADV_`
3. Статус только `draft` или `research`
4. Создай:
   - `game/gm/adventures/{id_lower}.yaml`
   - `game/gm/adventures/{slug}.md`
5. Пометь `visibility: gm`, `spoilers: gm`
6. Можно сослаться на `books/templates/adventure.typ` для публикации
7. Не копируй SWADE; не добавляй числовые статы core
8. Отчитайся: пути + ID

## Выход

Файлы в `game/gm/adventures/`.

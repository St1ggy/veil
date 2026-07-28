---
name: create-quest
description: Создать квест/сюжетную арку Veil в game/gm/plots (PLOT_). Use when user asks to create квест or plot.
---

# Создать квест (plot)

## Когда использовать

Пользователь просит добавить квест / сюжетную арку.

## Шаги

1. Прочитай `meta/RULES.md`, `meta/ID_SCHEME.md`, `meta/game/QUALITY_GATE.md`, `meta/SPOILER_POLICY.md`
2. ID с префиксом `PLOT_`
3. Статус только `draft` или `research`
4. Скопируй шаблон из `game/_templates/` при наличии или соседний plot
5. Создай пару:
   - `game/gm/plots/{id_lower}.yaml`
   - `game/gm/plots/{slug}.md`
6. `visibility: gm`, `spoilers: gm` если секрет
7. Свяжи с лором через `relations` / `lore_targets`
8. Не ставь `approved`/`canon`; не копируй текст SWADE; не добавляй dice/PP/damage core
9. Отчитайся: пути + ID

## Выход

Файлы в `game/gm/plots/`, без коммита без просьбы.

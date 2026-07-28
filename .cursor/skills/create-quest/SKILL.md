---
name: create-quest
description: Создать квест в сеттинге Veil (data + wiki, статус draft). Use when user asks to create квест.
---

# Создать квест

## Когда использовать

Пользователь просит добавить новую сущность: квест.

## Шаги

1. Прочитай `meta/RULES.md`, `meta/ID_SCHEME.md`, `meta/CANON_POLICY.md`
2. Выбери уникальный ID. Префикс ID: `EVENT_`
3. Статус только `draft` или `research`
4. Создай файл по образцу соседних в целевой папке
5. Создай пару:
   - `game/gm/plots/{id_lower}.yaml`
   - `game/gm/plots/{slug}.md` с тем же `id`
6. Заполни обязательные секции; неизвестное — явный TODO
7. Добавь `relations` где возможно
8. Не ставь `approved`/`canon`
9. Кратко отчитайся: пути файлов + ID

## Выход

Файлы data/wiki (или game/), без коммита без просьбы.

---
name: create-biome
description: Создать биом в сеттинге Veil (data + wiki, статус draft). Use when user asks to create биом.
---

# Создать биом

## Когда использовать

Пользователь просит добавить новую сущность: биом.

## Шаги

1. Прочитай `meta/RULES.md`, `meta/ID_SCHEME.md`, `meta/CANON_POLICY.md`
2. Выбери уникальный ID. Префикс ID: `BIOME_`
3. Статус только `draft` или `research`
4. Скопируй шаблон `wiki/_templates/biome.md`
5. Создай пару:
   - `data/locations/biomes/{id_lower}.yaml`
   - `wiki/locations/{slug}.md` с тем же `id`
6. Заполни обязательные секции; неизвестное — явный TODO
7. Добавь `relations` где возможно
8. Не ставь `approved`/`canon`
9. Кратко отчитайся: пути файлов + ID

## Выход

Файлы data/wiki (или game/), без коммита без просьбы.

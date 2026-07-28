---
name: create-npc
description: Создать NPC в сеттинге Veil (data + wiki, статус draft). Use when user asks to create NPC.
---

# Создать NPC

## Когда использовать

Пользователь просит добавить новую сущность: NPC.

## Шаги

1. Прочитай `meta/RULES.md`, `meta/ID_SCHEME.md`, `meta/CANON_POLICY.md`
2. Выбери уникальный ID. Префикс ID: `NPC_`
3. Статус только `draft` или `research`
4. Скопируй шаблон `wiki/_templates/character.md`
5. Создай пару:
   - `data/characters/{id_lower}.yaml`
   - `wiki/characters/{slug}.md` с тем же `id`
6. Заполни обязательные секции; неизвестное — явный TODO
7. Добавь `relations` где возможно
8. Не ставь `approved`/`canon`
9. Кратко отчитайся: пути файлов + ID

## Выход

Файлы data/wiki (или game/), без коммита без просьбы.

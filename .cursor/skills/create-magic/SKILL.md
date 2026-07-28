---
name: create-magic
description: Создать магическую систему/практику в сеттинге Veil (data + wiki, статус draft). Use when user asks to create магическую систему/практику.
---

# Создать магическую систему/практику

## Когда использовать

Пользователь просит добавить новую сущность: магическую систему/практику.

## Шаги

1. Прочитай `meta/RULES.md`, `meta/ID_SCHEME.md`, `meta/CANON_POLICY.md`
2. Выбери уникальный ID. Префикс ID: `MAG_`
3. Статус только `draft` или `research`
4. Скопируй шаблон `wiki/_templates/magic.md`
5. Создай пару:
   - `data/magic/systems/{id_lower}.yaml`
   - `wiki/magic/{slug}.md` с тем же `id`
6. Заполни обязательные секции; неизвестное — явный TODO
7. Добавь `relations` где возможно
8. Не ставь `approved`/`canon`
9. Кратко отчитайся: пути файлов + ID

## Выход

Файлы data/wiki (или game/), без коммита без просьбы.

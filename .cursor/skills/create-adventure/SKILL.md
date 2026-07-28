---
name: create-adventure
description: Создать приключение в сеттинге Veil (data + wiki, статус draft). Use when user asks to create приключение.
---

# Создать приключение

## Когда использовать

Пользователь просит добавить новую сущность: приключение.

## Шаги

1. Прочитай `meta/RULES.md`, `meta/ID_SCHEME.md`, `meta/CANON_POLICY.md`
2. Выбери уникальный ID. ID по `meta/ID_SCHEME.md` или локальный slug для game/
3. Статус только `draft` или `research`
4. Создай файл по образцу соседних в целевой папке
5. Создай пару:
   - `game/gm/adventures/{id_lower}.yaml`
   - `game/gm/adventures/{slug}.md` с тем же `id`
6. Заполни обязательные секции; неизвестное — явный TODO
7. Добавь `relations` где возможно
8. Не ставь `approved`/`canon`
9. Кратко отчитайся: пути файлов + ID

## Выход

Файлы data/wiki (или game/), без коммита без просьбы.

# Spoiler policy

## Уровни

| Уровень | Где хранить | Frontmatter |
|---------|-------------|-------------|
| Публичный лор | `wiki/`, `data/` с `visibility: public` | `spoilers: none` |
| Игрок (безопасно) | `game/player/` | — |
| Мастер | `game/gm/` | `spoilers: gm`, `visibility: gm` |

## Правила

1. Секреты сюжета, истинные мотивы богов, скрытые механики мира — только `game/gm/` или статьи с `spoilers: gm`
2. Player primer не цитирует gm-файлы
3. Typst: макрос `#gm[...]` только в `books/volumes/gm_guide/`
4. CI / validate: предупреждение, если `spoilers: gm` лежит вне `game/gm/` и wiki с явным статусом
5. PDF player handbook собирается без gm-томов

## Lint

Скрипт `scripts/validate/canon_status.py` проверяет `visibility`/`spoilers` согласованность путей.

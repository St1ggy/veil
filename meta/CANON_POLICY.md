# Политика канона

## Жизненный цикл

```
draft → research → discussion → approved → canon
                ↘ experimental ↗
canon → deprecated → archived
canon → retconned → archived
```

| Статус | Смысл | Цитировать в canon-статьях |
|--------|-------|--------------------------|
| `draft` | Черновик | Нет |
| `research` | Сбор фактов | Нет |
| `discussion` | На обсуждении | Нет (как предложение) |
| `approved` | Принято, ждёт фиксации | Ограниченно |
| `canon` | Утверждённый канон | Да |
| `experimental` | Пробный шар | Нет |
| `deprecated` | Устарело | Нет (`successor_id`) |
| `retconned` | Отменено | Нет |
| `archived` | Холодное хранение | Нет |

## Повышение статуса

1. Автор создаёт entity со статусом `draft` или `research`
2. Issue / discussion для `discussion`
3. Owner (CODEOWNERS) переводит в `approved`, затем `canon`
4. AI и контрибьюторы **не** ставят `canon` самостоятельно

## Изменение канона

- Мелкие правки прозы без смены фактов: PR
- Смена фактов: issue `contradiction` или `retcon-proposal`
- Retcon: `status: retconned`, `retcon_reason`, запись в CHANGELOG, копия в `archive/retconned/` при необходимости

## Поля

- `status` (обязательно)
- `canon_since` (дата перевода в canon)
- `successor_id`, `retcon_reason` (при необходимости)

# Типы связей

В `relations`:

```yaml
relations:
  - type: part_of
    target: REG_EXAMPLE
```

## Каталог типов

| type | Смысл | Типичный субъект → объект |
|------|-------|---------------------------|
| `part_of` | Входит в | city → region/country |
| `contains` | Содержит | region → city (обычно generate) |
| `member_of` | Член | character → org |
| `leads` | Возглавляет | character → org |
| `occurs_during` | Во время | event → era/event |
| `occurs_at` | В месте | event → location |
| `uses` | Использует | faction → tech/magic |
| `worships` | Исповедует / почитает | character/faction → religion/god |
| `originates_from` | Происходит из | race/character → location |
| `mentioned_in` | Упоминается в | entity → event/article (часто generate) |
| `conflicts_with` | Конфликтует | faction ↔ faction |
| `allied_with` | Союз | faction ↔ faction |
| `successor_of` | Преемник | country → country |
| `caused_by` | Причина | event → event/entity |
| `enables` | Делает возможным | tech/magic → phenomenon |
| `related_to` | Слабая связь | any → any |

Обратные индексы генерируются скриптами, не дублируются вручную (кроме явно двусторонних `allied_with` / `conflicts_with`).

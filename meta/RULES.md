# Правила проекта Veil

Версия: 1.1

Этот документ — операционные правила репозитория.

**Выше по приоритету:**

1. [PROJECT_CONSTITUTION.md](PROJECT_CONSTITUTION.md) — закон проекта
2. [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md) — принципы дизайна

При конфликте с RULES побеждает Конституция.

## Слои истины

| Слой | Путь | За что отвечает |
|------|------|-----------------|
| Факты | `data/**/*.yaml` | ID, статусы, даты, связи, числа |
| Проза | `wiki/**/*.md` | Энциклопедические статьи |
| Книги | `books/` | Typst-сборки PDF (не первичный канон) |
| Игра | `game/` | Механики, приключения, секреты |
| Процесс | `meta/` | Правила, схемы, ADR |

Производное (`out/`, `site/`, `api/`, `graphs/`, `data/_index/`) не редактируется вручную.

## Стиль

Энциклопедический тон: факты → последствия → открытые вопросы.

Русский язык — primary. Английские имена — в `aliases` / `name_en`.

Нельзя: клише без объяснения, элементы без последствий, события без влияния на мир.

Подробнее: [STYLEGUIDE.md](STYLEGUIDE.md), [writing](../.cursor/rules/writing.mdc).

## Терминология

Канонические термины только из [GLOSSARY.md](GLOSSARY.md): Эфир, Вуаль, Великое Пробуждение, принцип Arcanum и др.

Новый термин = ADR или запись в глоссарий до массового использования.

## Единицы, даты, время

См. [UNITS_AND_DATES.md](UNITS_AND_DATES.md).

- СИ; расстояния в км; население — числом
- Даты в data: `YYYY` или `YYYY-MM-DD`
- В прозе: «2170 год»
- Эры: `pre-awakening`, `awakening`, `fragmentation`, `2435-present`

## Имена

- `title` — каноническое отображаемое имя (обычно кириллица)
- `aliases` — варианты
- ID — латиница `UPPER_SNAKE` по [ID_SCHEME.md](ID_SCHEME.md)

## Сущности

Государства, расы, организации, магия, технологии создаются только:

1. по шаблону из `wiki/_templates/`
2. с минимальным YAML в `data/`
3. со статусом не выше `draft` / `research` без ревью

## Статьи

Обязателен YAML frontmatter ([METADATA_SCHEMA.md](METADATA_SCHEMA.md)).

Тело — по шаблону типа. В конце: «Открытые вопросы», «См. также».

## Канон

Поток: Proposal → Discussion → Approved → Canon.

Самовольное повышение статуса запрещено.

Изменение канона: issue + CODEOWNERS. Retcon → статус + CHANGELOG + опц. `archive/retconned/`.

Подробнее: [CANON_POLICY.md](CANON_POLICY.md).

## Именование файлов и папок

См. [NAMING.md](NAMING.md).

- wiki/books пути: `kebab-case`
- data файлы: `{id-lower}.yaml` или `{descriptive}.yaml`, поле `id` внутри обязательно

## Ссылки

См. [LINK_TYPES.md](LINK_TYPES.md).

- wiki: `[[ID]]` или относительный markdown-link
- data: `relations:` с `type` + `target`
- Запрещены «голые» URL как замена внутренних ID

## Статусы

`draft` → `research` → `discussion` → `approved` → `canon`

Также: `experimental`, `deprecated`, `retconned`, `archived`.

## Версионирование

- Сущности: целое `version` + `updated`
- Схемы и тома книг: semver
- Git tags: `books/world-bible@0.2.0`

## Spoilers

См. [SPOILER_POLICY.md](SPOILER_POLICY.md).

Игрокам: `game/player/`, wiki без `spoilers: gm`.

Мастеру: `game/gm/`, `spoilers: gm` / `visibility: gm`.

# Metadata schema

Общие поля для `data/*.yaml` и YAML frontmatter в `wiki/*.md`.

| Поле | Тип | Обязательно | Назначение |
|------|-----|-------------|------------|
| `id` | string | да | Стабильный ID |
| `type` | string | да | Тип сущности (`country`, `race`, …) |
| `title` | string | да | Отображаемое имя |
| `status` | enum | да | Статус канона |
| `version` | integer | да | Ревизия сущности (начиная с 1) |
| `created` | date | да | Дата создания записи |
| `updated` | date | да | Дата последнего изменения |
| `authors` | string[] | нет | Авторы |
| `tags` | string[] | нет | Теги |
| `aliases` | string[] | нет | Альтернативные имена |
| `summary` | string | рекомендуется | 1–2 предложения |
| `importance` | enum | нет | `core` \| `major` \| `minor` \| `flavor` |
| `spoilers` | enum | нет | `none` \| `player` \| `gm` (default `none`) |
| `visibility` | enum | нет | `public` \| `gm` (default `public`) |
| `related` | string[] | нет | Грубый список ID |
| `relations` | object[] | рекомендуется | Типизированные связи |
| `timeline` | object | по типу | `date` / `date_start` / `date_end` / `era` |
| `sources` | string[] | нет | Ссылки на research |
| `mechanical` | bool | нет | Есть игровые статы |
| `successor_id` | string | нет | Замена при deprecated |
| `retcon_reason` | string | нет | Причина retcon |
| `canon_since` | date | нет | Когда стало canon |

Typed FK по типу статьи: `region`, `race`, `faction`, `country`, `capital_id` и т.д. — см. JSON Schema в `data/_schemas/`.

**Не использовать** отдельное поле `canon: bool` — достаточно `status`.

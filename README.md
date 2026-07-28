# Veil

[![Deploy site](https://github.com/St1ggy/veil/actions/workflows/build-site.yml/badge.svg)](https://github.com/St1ggy/veil/actions/workflows/build-site.yml)
[![Pages](https://img.shields.io/badge/pages-st1ggy.github.io%2Fveil-1f4d3a)](https://st1ggy.github.io/veil/)

**English:** [README.en.md](README.en.md)

Энциклопедия: [RU](https://st1ggy.github.io/veil/ru/) · [EN](https://st1ggy.github.io/veil/en/)

База знаний сеттинга оригинальной настольной ролевой игры: **Земля 2435** после ослабления Вуали и возвращения магии (вероятность / Эфир).

## Управление каноном

Перед правками лора прочитайте:

1. [`meta/PROJECT_CONSTITUTION.md`](meta/PROJECT_CONSTITUTION.md)
2. [`meta/DESIGN_PRINCIPLES.md`](meta/DESIGN_PRINCIPLES.md)
3. [`meta/RULES.md`](meta/RULES.md)

## Архитектура

Три слоя источников (см. `meta/ADR/0001-three-layer-sot.md`):

| Слой | Путь | Роль |
|------|------|------|
| Факты | `data/` | YAML-сущности, ID, связи |
| Энциклопедия | `wiki/` | Проза на Markdown (RU) |
| EN-зеркало | `wiki/en/` | Английские статьи для сайта |
| Книги | `books/` | Тома Typst → PDF |
| Игра | `game/` | Материалы игрока / мастера |
| Мета | `meta/` | Правила и процесс |

Генерируется (не править вручную): `out/`, `site/`, `api/`, `graphs/`, `data/_index/`.

## Быстрый старт

```bash
python3 -m venv .venv
.venv/bin/pip install PyYAML jsonschema python-frontmatter
cd web && npm install && cd ..
make validate
make index
make pdf
make site
make api
```

Нужно: Python 3.11+, Node.js 22+, [Typst](https://typst.app/).

Исходники сайта: [`web/`](web/) (Astro). Сборка: `site/`.

## Как добавить сущность

1. Прочитать Конституцию, принципы дизайна и `meta/RULES.md`
2. Ответить на шесть вопросов создания из Конституции
3. Скопировать шаблон из `wiki/_templates/`
4. Создать парный `data/**/*.yaml` с тем же `id`
5. Держать `status` на `draft` или `research` до ревью
6. Для EN-сайта добавить зеркало в `wiki/en/` с тем же `id`

## Лицензия

Лор и творческий контент: All Rights Reserved. Инструменты: MIT. См. `LICENSE` и `meta/ADR/0003-licensing.md`.

# Именование

## Папки

- `kebab-case`: `magic_and_technology` → лучше `magic-and-technology` в wiki; в books volumes допустим `snake` как в плане (`02_magic_and_technology`)
- data категории: множественное число по смыслу (`races/`, `cities/`)

## Файлы data

- Предпочтительно: `{id}.yaml` в нижнем регистре с сохранением подчёркиваний: `cos_ether.yaml`
- Либо короткое мнемоническое имя при условии уникального `id` внутри

## Файлы wiki

- `kebab-case.md` согласованный с сущностью: `ether.md`, `great-awakening.md`
- Frontmatter `id` обязателен и совпадает с data

## Typst

- Тома: `books/volumes/{nn}_{slug}/main.typ`
- Lib: `books/lib/*.typ`

## Запрещено

- Пробелы в путях
- Кириллица в путях файлов
- Переименование файла без обновления ссылок и индексов

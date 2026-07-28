# ADR-0002: Identifier scheme

## Status

Accepted

## Context

Entities need stable cross-references for wiki, data, API, and automation.

## Decision

IDs use `{TYPE}_{NAME}` in `UPPER_SNAKE` ASCII. Prefixes are defined in `meta/ID_SCHEME.md`. After status `approved`, IDs are immutable; display names change via `title`/`aliases`.

## Consequences

- File names may be kebab-case; the `id` field inside YAML/frontmatter is authoritative
- Retargeting requires `successor_id` / relation `successor_of`, not renaming

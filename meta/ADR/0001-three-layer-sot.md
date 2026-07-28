# ADR-0001: Three-layer source of truth

## Status

Accepted

## Context

Veil is a long-lived TTRPG IP (Earth 2435). Content must feed PDF books, wiki, JSON API, generators, and VTT. A single format cannot serve humans, machines, and publications equally well.

## Decision

Adopt three source layers:

1. `data/` — YAML structured facts (IDs, relations, dates, status) — machine SoT
2. `wiki/` — Markdown encyclopedia prose — human SoT
3. `books/` — Typst volumes — publication assembly only (not primary canon)

Derived outputs (`out/`, `site/`, `api/`, `graphs/`, `data/_index/`) are never edited by hand.

Every canonical entity shares one stable `id` across data and wiki.

## Consequences

- Authors maintain pairs for `approved`/`canon` entities
- CI validates schema, IDs, relations, and data↔wiki parity
- Typst books import/compose; they do not invent new canon

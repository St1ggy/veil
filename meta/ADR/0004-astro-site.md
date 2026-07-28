# ADR-0004: Astro for the public encyclopedia site

## Status

Accepted

## Context

Hand-written HTML generation (`scripts/generate/site.py`) does not scale for styling, layouts, or markdown features.

## Decision

Use Astro in `web/` as the site generator. Content is loaded from `wiki/**/*.md` via the Content Layer glob loader. Build output goes to `site/` (generated; never edit by hand).

## Consequences

- Requires Node.js for `make site`
- Wikilinks `[[ID]]` resolved by a remark plugin to `/entity/ID`
- Python site generator is deprecated

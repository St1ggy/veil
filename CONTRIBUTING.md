# Contributing

## Before you write

1. Read `meta/PROJECT_CONSTITUTION.md` and `meta/DESIGN_PRINCIPLES.md`
2. Read `meta/RULES.md` and `meta/CANON_POLICY.md`
3. Use templates in `wiki/_templates/`
4. Never set `status: canon` in a PR unless you are a CODEOWNER and the change was approved

## PR flow

1. Branch from `main`
2. Add/update `data/` + `wiki/` pairs for entities at `approved`/`canon`
3. Run `make validate`
4. Fill the PR template checklist
5. Link related issues

## Canon changes

Factual changes to `canon` entities require an issue (`contradiction` or retcon proposal) and CODEOWNER approval.

## Commits

Prefer focused commits: one entity or one tooling concern per commit when practical.

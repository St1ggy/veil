#!/usr/bin/env python3
"""Validate relations targets and wiki [[ID]] links."""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from veil_lib import (  # noqa: E402
    WIKILINK_RE,
    iter_wiki_files,
    load_all_entities,
    load_wiki_by_id,
    parse_wiki,
)


def main() -> int:
    errors = 0
    warnings = 0
    entities = load_all_entities()
    wiki = load_wiki_by_id()
    known = set(entities) | set(wiki)

    for eid, doc in entities.items():
        for rel in doc.get("relations") or []:
            if not isinstance(rel, dict):
                print(f"ERROR {eid}: bad relation {rel!r}")
                errors += 1
                continue
            target = rel.get("target")
            if target not in known:
                print(f"ERROR {eid}: broken relation target {target}")
                errors += 1

    for path in iter_wiki_files():
        meta, body = parse_wiki(path)
        for match in WIKILINK_RE.finditer(body):
            target = match.group(1)
            if target not in known:
                print(f"WARN {path.relative_to(ROOT)}: missing [[{target}]]")
                warnings += 1

    if errors:
        print(f"links: {errors} error(s), {warnings} warning(s)")
        return 1
    print(f"links: ok ({warnings} warning(s))")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

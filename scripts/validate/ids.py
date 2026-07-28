#!/usr/bin/env python3
"""Check unique IDs and ID format."""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from veil_lib import ID_RE, iter_data_files, load_wiki_by_id, load_yaml  # noqa: E402


def main() -> int:
    errors = 0
    seen: dict[str, str] = {}
    for path in iter_data_files():
        doc = load_yaml(path)
        if not isinstance(doc, dict) or "id" not in doc:
            print(f"ERROR {path}: missing id")
            errors += 1
            continue
        eid = doc["id"]
        if not ID_RE.match(str(eid)):
            print(f"ERROR {path}: invalid id format {eid!r}")
            errors += 1
        if eid in seen:
            print(f"ERROR duplicate id {eid}: {seen[eid]} and {path}")
            errors += 1
        else:
            seen[eid] = str(path)

    wiki = load_wiki_by_id()
    for eid, meta in wiki.items():
        if eid == "WIKI_HOME":
            continue
        if not ID_RE.match(str(eid)):
            print(f"ERROR wiki {meta['_path']}: invalid id {eid!r}")
            errors += 1
        if eid in seen and seen[eid].startswith("data/"):
            continue
        # wiki-only ids are allowed for meta/draft pages
    if errors:
        print(f"ids: {errors} error(s)")
        return 1
    print(f"ids: ok ({len(seen)} data ids)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

#!/usr/bin/env python3
"""Canon status and data↔wiki parity for approved/canon; spoiler path checks."""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from veil_lib import iter_game_files, load_all_entities, load_wiki_by_id, load_yaml  # noqa: E402

PARITY_STATUSES = {"approved", "canon"}
# Machine-only / aggregate types do not require a wiki pair
NO_WIKI_TYPES = {"timeline", "index", "meta"}
# Book articles are generated from canonical rawBooks chapters and intentionally have no data entity.
NO_DATA_WIKI_TYPES = {"book"}


def main() -> int:
    errors = 0
    warnings = 0
    entities = load_all_entities()
    wiki = load_wiki_by_id()

    for eid, doc in entities.items():
        status = doc.get("status")
        if status in PARITY_STATUSES and eid not in wiki and doc.get("type") not in NO_WIKI_TYPES:
            print(f"ERROR {eid}: status={status} but no wiki article")
            errors += 1
        spoilers = doc.get("spoilers", "none")
        visibility = doc.get("visibility", "public")
        path = doc.get("_path", "")
        if (spoilers == "gm" or visibility == "gm") and not path.startswith("game/gm"):
            print(f"WARN {eid}: gm spoiler in data path {path}")
            warnings += 1

    for eid, meta in wiki.items():
        if eid == "WIKI_HOME":
            continue
        status = meta.get("status")
        if status in PARITY_STATUSES and eid not in entities and meta.get("type") not in NO_DATA_WIKI_TYPES:
            print(f"ERROR wiki {meta['_path']}: status={status} but no data entity")
            errors += 1
        spoilers = meta.get("spoilers", "none")
        visibility = meta.get("visibility", "public")
        wpath = meta.get("_path", "")
        if (spoilers == "gm" or visibility == "gm") and "game/gm" not in wpath:
            print(f"ERROR {eid}: gm spoilers/visibility outside game/gm ({wpath})")
            errors += 1

    for path in iter_game_files():
        doc = load_yaml(path)
        if not isinstance(doc, dict):
            continue
        spoilers = doc.get("spoilers", "none")
        visibility = doc.get("visibility", "public")
        rel = str(path.relative_to(ROOT))
        if (spoilers == "gm" or visibility == "gm") and not rel.startswith("game/gm/"):
            print(f"ERROR {doc.get('id', path)}: gm content must live under game/gm/ ({rel})")
            errors += 1

    if errors:
        print(f"canon_status: {errors} error(s), {warnings} warning(s)")
        return 1
    print(f"canon_status: ok ({warnings} warning(s))")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

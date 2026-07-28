#!/usr/bin/env python3
"""Canon status and data↔wiki parity for approved/canon; spoiler path checks."""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from veil_lib import load_all_entities, load_wiki_by_id  # noqa: E402

PARITY_STATUSES = {"approved", "canon"}
# Machine-only / aggregate types do not require a wiki pair
NO_WIKI_TYPES = {"timeline", "index", "meta"}


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
            # data may hold gm flags but prefer game/gm for secrets
            print(f"WARN {eid}: gm spoiler in data path {path}")
            warnings += 1

    for eid, meta in wiki.items():
        if eid == "WIKI_HOME":
            continue
        status = meta.get("status")
        if status in PARITY_STATUSES and eid not in entities:
            print(f"ERROR wiki {meta['_path']}: status={status} but no data entity")
            errors += 1
        if meta.get("spoilers") == "gm" and "game/gm" not in meta.get("_path", ""):
            # allowed in wiki with flag, but warn
            print(f"WARN {eid}: gm spoilers in public wiki path {meta['_path']}")
            warnings += 1

    if errors:
        print(f"canon_status: {errors} error(s), {warnings} warning(s)")
        return 1
    print(f"canon_status: ok ({warnings} warning(s))")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

#!/usr/bin/env python3
"""Generate data/_index JSON files."""
from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from veil_lib import load_all_entities, load_wiki_by_id  # noqa: E402

OUT = ROOT / "data" / "_index"


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    entities = load_all_entities()
    wiki = load_wiki_by_id()

    by_id = {}
    for eid, doc in entities.items():
        by_id[eid] = {
            "id": eid,
            "type": doc.get("type"),
            "title": doc.get("title"),
            "status": doc.get("status"),
            "data_path": doc.get("_path"),
            "wiki_path": wiki.get(eid, {}).get("_path"),
            "tags": doc.get("tags") or [],
        }
    (OUT / "by-id.json").write_text(json.dumps(by_id, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    by_tag: dict[str, list[str]] = defaultdict(list)
    for eid, doc in entities.items():
        for tag in doc.get("tags") or []:
            by_tag[tag].append(eid)
    (OUT / "by-tag.json").write_text(
        json.dumps({k: sorted(v) for k, v in sorted(by_tag.items())}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"indexes: wrote {len(by_id)} entities")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

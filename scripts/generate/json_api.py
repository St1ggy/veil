#!/usr/bin/env python3
"""Export entities as JSON API dump."""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from veil_lib import load_all_entities, load_wiki_by_id  # noqa: E402

API = ROOT / "api"


def main() -> int:
    API.mkdir(parents=True, exist_ok=True)
    entities = load_all_entities()
    wiki = load_wiki_by_id()

    clean = {}
    for eid, doc in entities.items():
        item = {k: v for k, v in doc.items() if not k.startswith("_")}
        item["wiki_path"] = wiki.get(eid, {}).get("_path")
        clean[eid] = item
        (API / f"{eid}.json").write_text(json.dumps(item, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    (API / "index.json").write_text(
        json.dumps({"entities": sorted(clean.keys()), "count": len(clean)}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    (API / "entities.json").write_text(json.dumps(clean, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"api: exported {len(clean)} entities")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

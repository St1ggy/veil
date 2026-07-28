#!/usr/bin/env python3
"""Generate data/_index JSON files (lore + mechanical)."""
from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from veil_lib import load_all_entities, load_game_entities, load_wiki_by_id  # noqa: E402

OUT = ROOT / "data" / "_index"


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    entities = load_all_entities()
    game = load_game_entities()
    wiki = load_wiki_by_id()

    by_id = {}
    for eid, doc in entities.items():
        by_id[eid] = {
            "id": eid,
            "source": "data",
            "type": doc.get("type"),
            "title": doc.get("title"),
            "status": doc.get("status"),
            "data_path": doc.get("_path"),
            "wiki_path": wiki.get(eid, {}).get("_path"),
            "mechanical": doc.get("mechanical"),
            "mechanical_id": doc.get("mechanical_id"),
            "tags": doc.get("tags") or [],
        }
    for eid, doc in game.items():
        by_id[eid] = {
            "id": eid,
            "source": "game",
            "type": doc.get("type"),
            "title": doc.get("title"),
            "status": doc.get("status"),
            "game_path": doc.get("_path"),
            "tags": doc.get("tags") or [],
            "lore_targets": doc.get("lore_targets") or [],
        }
    (OUT / "by-id.json").write_text(json.dumps(by_id, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    by_tag: dict[str, list[str]] = defaultdict(list)
    for eid, doc in list(entities.items()) + list(game.items()):
        for tag in doc.get("tags") or []:
            by_tag[tag].append(eid)
    (OUT / "by-tag.json").write_text(
        json.dumps({k: sorted(set(v)) for k, v in sorted(by_tag.items())}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    game_index = {
        eid: {
            "id": eid,
            "type": doc.get("type"),
            "title": doc.get("title"),
            "status": doc.get("status"),
            "path": doc.get("_path"),
            "category": doc.get("category"),
        }
        for eid, doc in sorted(game.items())
    }
    (OUT / "by-game-id.json").write_text(
        json.dumps(game_index, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    print(f"indexes: wrote {len(entities)} data + {len(game)} game entities")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

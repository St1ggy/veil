#!/usr/bin/env python3
"""Generate table of contents for wiki."""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from veil_lib import load_wiki_by_id  # noqa: E402

OUT = ROOT / "graphs" / "toc.json"


def main() -> int:
    wiki = load_wiki_by_id()
    items = [
        {
            "id": eid,
            "title": meta.get("title"),
            "path": meta.get("_path"),
            "status": meta.get("status"),
            "type": meta.get("type"),
        }
        for eid, meta in sorted(wiki.items(), key=lambda x: x[1].get("_path", ""))
    ]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"pages": items}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"toc: {len(items)} pages")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

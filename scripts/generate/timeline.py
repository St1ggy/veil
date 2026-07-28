#!/usr/bin/env python3
"""Generate timeline JSON from events/eras."""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from veil_lib import load_all_entities  # noqa: E402

OUT = ROOT / "graphs" / "timeline.json"


def main() -> int:
    entities = load_all_entities()
    events = []
    eras = []
    for eid, doc in entities.items():
        timeline = doc.get("timeline") or {}
        item = {
            "id": eid,
            "title": doc.get("title"),
            "type": doc.get("type"),
            "status": doc.get("status"),
            **timeline,
        }
        if doc.get("type") == "event":
            events.append(item)
        elif doc.get("type") == "era":
            eras.append(item)
    events.sort(key=lambda e: str(e.get("date") or e.get("date_start") or ""))
    payload = {"eras": eras, "events": events}
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"timeline: {len(eras)} eras, {len(events)} events")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

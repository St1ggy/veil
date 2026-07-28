#!/usr/bin/env python3
"""Heuristic contradiction checks (dates / missing eras)."""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from veil_lib import load_all_entities  # noqa: E402


def main() -> int:
    warnings = 0
    entities = load_all_entities()
    awakening = entities.get("EVENT_GREAT_AWAKENING")
    if awakening:
        date = (awakening.get("timeline") or {}).get("date")
        if date and str(date) != "2170":
            print(f"WARN EVENT_GREAT_AWAKENING date is {date}, expected 2170")
            warnings += 1

    for eid, doc in entities.items():
        timeline = doc.get("timeline") or {}
        era = timeline.get("era")
        if era and not any(
            e.get("timeline", {}).get("era") == era
            for e in entities.values()
            if e.get("type") == "era"
        ):
            # eras use timeline.era as their own code
            if not any(e.get("id", "").startswith("ERA_") and era in (e.get("timeline") or {}).values() for e in entities.values()):
                print(f"WARN {eid}: era {era!r} has no matching ERA_ entity")
                warnings += 1

    print(f"contradictions: ok ({warnings} warning(s))")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

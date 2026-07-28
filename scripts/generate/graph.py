#!/usr/bin/env python3
"""Generate relation graph JSON."""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from veil_lib import load_all_entities  # noqa: E402

OUT = ROOT / "graphs" / "graph.json"
OUT_DIR = ROOT / "data" / "_index"


def main() -> int:
    entities = load_all_entities()
    nodes = []
    edges = []
    for eid, doc in entities.items():
        nodes.append({"id": eid, "title": doc.get("title"), "type": doc.get("type"), "status": doc.get("status")})
        for rel in doc.get("relations") or []:
            edges.append({"source": eid, "target": rel.get("target"), "type": rel.get("type")})
    graph = {"nodes": nodes, "edges": edges}
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(graph, ensure_ascii=False, indent=2) + "\n"
    OUT.write_text(payload, encoding="utf-8")
    (OUT_DIR / "graph.json").write_text(payload, encoding="utf-8")
    print(f"graph: {len(nodes)} nodes, {len(edges)} edges")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

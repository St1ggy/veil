#!/usr/bin/env python3
"""Validate game/ mechanical YAML against game/_schemas/mechanical_entity.schema.json."""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))

from veil_lib import GAME, ID_RE, iter_game_files, load_all_entities, load_game_entities, load_yaml  # noqa: E402

try:
    import jsonschema
except ImportError:
    print("ERROR: jsonschema required")
    sys.exit(1)


def main() -> int:
    schema_path = GAME / "_schemas" / "mechanical_entity.schema.json"
    if not schema_path.exists():
        print(f"ERROR missing schema {schema_path}")
        return 1
    schema = json.loads(schema_path.read_text(encoding="utf-8"))
    validator = jsonschema.Draft202012Validator(schema)

    errors = 0
    files = iter_game_files()
    lore = load_all_entities()
    game_ents = load_game_entities()

    for path in files:
        doc = load_yaml(path)
        if not isinstance(doc, dict) or "id" not in doc:
            print(f"ERROR {path}: missing id")
            errors += 1
            continue
        for err in sorted(validator.iter_errors(doc), key=lambda e: e.path):
            print(f"ERROR {path}: {err.message}")
            errors += 1
        eid = doc["id"]
        if not ID_RE.match(eid):
            print(f"ERROR {path}: invalid id {eid!r}")
            errors += 1
        for rel in doc.get("relations") or []:
            if not isinstance(rel, dict):
                continue
            target = rel.get("target")
            if not target:
                continue
            if target not in lore and target not in game_ents:
                print(f"WARN {path}: relation target {target} not found in data/ or game/")
        for dep in doc.get("dependencies") or []:
            if dep not in lore and dep not in game_ents and dep != eid:
                print(f"WARN {path}: dependency {dep} not found")
        for lt in doc.get("lore_targets") or []:
            if lt not in lore:
                print(f"WARN {path}: lore_target {lt} not in data/")

    # duplicate game ids
    seen: dict[str, Path] = {}
    for path in files:
        doc = load_yaml(path)
        if not isinstance(doc, dict) or "id" not in doc:
            continue
        eid = doc["id"]
        if eid in seen:
            print(f"ERROR duplicate game id {eid}: {seen[eid]} and {path}")
            errors += 1
        else:
            seen[eid] = path
        if eid in lore:
            print(f"ERROR game id {eid} collides with data entity")
            errors += 1

    if errors:
        print(f"game_schema: {errors} error(s)")
        return 1
    print(f"game_schema: ok ({len(files)} files, {len(seen)} ids)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

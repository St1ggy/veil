#!/usr/bin/env python3
"""Validate data YAML against entity.schema.json."""
from __future__ import annotations

import json
import sys
from pathlib import Path

from jsonschema import Draft202012Validator

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from veil_lib import iter_data_files, load_yaml  # noqa: E402

SCHEMA_PATH = ROOT / "data" / "_schemas" / "entity.schema.json"


def main() -> int:
    schema = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
    validator = Draft202012Validator(schema)
    errors = 0
    for path in iter_data_files():
        doc = load_yaml(path)
        if not isinstance(doc, dict):
            print(f"ERROR {path}: not a mapping")
            errors += 1
            continue
        for err in sorted(validator.iter_errors(doc), key=lambda e: list(e.path)):
            print(f"ERROR {path}: {err.message}")
            errors += 1
    if errors:
        print(f"schema: {errors} error(s)")
        return 1
    print(f"schema: ok ({len(iter_data_files())} files)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

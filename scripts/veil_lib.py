#!/usr/bin/env python3
"""Shared helpers for Veil tooling."""
from __future__ import annotations

import re
from pathlib import Path
from typing import Any

import yaml

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
WIKI = ROOT / "wiki"

SKIP_DIR_NAMES = {"_schemas", "_index", "_templates"}
# Localized mirrors under wiki/en are site content; RU wiki remains the canon pair for data.

ID_RE = re.compile(r"^[A-Z][A-Z0-9]*(_[A-Z0-9]+)+$")
WIKILINK_RE = re.compile(r"\[\[([A-Z][A-Z0-9_]*)(?:\|[^\]]+)?\]\]")


def load_yaml(path: Path) -> Any:
    with path.open(encoding="utf-8") as f:
        return yaml.safe_load(f)


def iter_data_files() -> list[Path]:
    files: list[Path] = []
    for path in DATA.rglob("*.yaml"):
        if any(part in SKIP_DIR_NAMES for part in path.parts):
            continue
        files.append(path)
    return sorted(files)


def iter_wiki_files() -> list[Path]:
    files: list[Path] = []
    for path in WIKI.rglob("*.md"):
        if any(part in SKIP_DIR_NAMES for part in path.parts):
            continue
        # Skip English mirror: validators use Russian wiki as the SoT pair for data.
        try:
            if path.relative_to(WIKI).parts[0] == "en":
                continue
        except ValueError:
            pass
        if path.name.startswith("_") and path.name != "_home.md":
            continue
        files.append(path)
    return sorted(files)


def parse_wiki(path: Path) -> tuple[dict[str, Any] | None, str]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return None, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return None, text
    meta = yaml.safe_load(parts[1]) or {}
    return meta, parts[2]


def load_all_entities() -> dict[str, dict[str, Any]]:
    entities: dict[str, dict[str, Any]] = {}
    for path in iter_data_files():
        doc = load_yaml(path)
        if not isinstance(doc, dict) or "id" not in doc:
            continue
        eid = doc["id"]
        entities[eid] = {**doc, "_path": str(path.relative_to(ROOT)), "_source": "data"}
    return entities


def load_wiki_by_id() -> dict[str, dict[str, Any]]:
    out: dict[str, dict[str, Any]] = {}
    for path in iter_wiki_files():
        meta, _ = parse_wiki(path)
        if not meta or "id" not in meta:
            continue
        out[meta["id"]] = {**meta, "_path": str(path.relative_to(ROOT))}
    return out

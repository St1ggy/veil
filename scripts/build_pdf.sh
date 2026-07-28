#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
mkdir -p out

compile() {
  local main="$1"
  local out="$2"
  echo "typst compile $main -> $out"
  typst compile --root "$ROOT" "$main" "$out"
}

compile books/volumes/00_world_rules/main.typ out/00_world_rules.pdf
compile books/volumes/01_world_bible/main.typ out/01_world_bible.pdf
compile books/volumes/02_magic_and_technology/main.typ out/02_magic_and_technology.pdf
compile books/volumes/03_history/main.typ out/03_history.pdf
compile books/volumes/04_races_and_factions/main.typ out/04_races_and_factions.pdf
compile books/volumes/player_handbook/main.typ out/player_handbook.pdf
compile books/volumes/gm_guide/main.typ out/gm_guide.pdf
compile books/volumes/setting_book/main.typ out/setting_book.pdf

echo "pdf: done"
ls -la out/*.pdf

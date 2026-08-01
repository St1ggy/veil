#!/usr/bin/env python3
"""Replace Russian entity article prose with canonical rawBooks material."""

from __future__ import annotations

from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[2]
BOOKS = ROOT / "rawBooks" / "world_bible"
WIKI = ROOT / "wiki"

SOURCE_BY_SLUG = {
    "arcanum-principle": "01_foundations/00_foundation/02_core_principles.md",
    "bottom-up-design": "00_meta/00_project_vision.md",
    "campaign-modes": "06_game/01_campaigns/84_campaign_types.md",
    "dead-internet": "03_civilization/02_culture/54_media.md",
    "divinity": "01_foundations/01_cosmology/09_ascension.md",
    "archetypes": "01_foundations/00_foundation/05_major_themes.md",
    "material-world": "01_foundations/01_cosmology/10_reality.md",
    "pure-code-order": "04_organizations/03_religious/69_religious_organizations.md",
    "resonance-syndicate": "04_organizations/04_independent/71_secret_organizations.md",
    "return-cult": "04_organizations/03_religious/69_religious_organizations.md",
    "fragmentation": "02_world/00_history/22_the_great_collapse.md",
    "third-world-war": "02_world/00_history/22_the_great_collapse.md",
    "starfall": "02_world/00_history/21_the_return_of_ether.md",
    "shapeshifters": "03_civilization/00_peoples/45_shapeshifters.md",
    "ocean-ether-storms": "02_world/01_geography/28_oceans.md",
    "network-mages": "01_foundations/03_engineering/18_infrastructure.md",
    "probabilistic-decay": "05_conflicts/02_threats/78_etheric_anomalies.md",
    "ether-burnout": "05_conflicts/02_threats/80_catastrophes.md",
    "probability-magic": "01_foundations/01_cosmology/08_etherological_interaction.md",
    "ai-categories": "01_foundations/00_foundation/03_earth_2435.md",
    "null-fields": "01_foundations/03_engineering/17_devices.md",
    "post-awakening-tech": "01_foundations/03_engineering/13_etherological_engineering.md",
    "hybrid-tech": "01_foundations/03_engineering/13_etherological_engineering.md",
}


def split_frontmatter(text: str) -> tuple[str, str]:
    match = re.match(r"^(---\n.*?\n---\n?)(.*)$", text, re.S)
    return (match.group(1), match.group(2)) if match else ("", text)


def title_from_frontmatter(frontmatter: str) -> str:
    match = re.search(r"^title:\s*(.+?)\s*$", frontmatter, re.M)
    return match.group(1).strip(" '\"") if match else ""


def book_body(path: Path) -> str:
    return split_frontmatter(path.read_text(encoding="utf-8"))[1].strip()


def heading_sections(markdown: str):
    matches = list(re.finditer(r"^(#{1,6})\s+(.+?)\s*$", markdown, re.M))
    for index, match in enumerate(matches):
        level = len(match.group(1))
        end = len(markdown)
        for following in matches[index + 1 :]:
            if len(following.group(1)) <= level:
                end = following.start()
                break
        yield match.group(2).strip(), markdown[match.end() : end].strip()


def normalize(value: str) -> str:
    return re.sub(r"[^а-яёa-z0-9]+", " ", value.casefold()).strip()


def exact_section(title: str, corpus: list[tuple[Path, str]]) -> tuple[str, Path] | None:
    wanted = normalize(title)
    for path, body in corpus:
        for heading, section in heading_sections(body):
            if normalize(heading) == wanted and section:
                return section, path
    return None


def main() -> None:
    corpus = [(path, book_body(path)) for path in sorted(BOOKS.rglob("*.md"))]
    changed = 0
    for path in sorted(WIKI.rglob("*.md")):
        relative = path.relative_to(WIKI)
        if relative.parts[0] in {"books", "en", "_templates"} or path.name.startswith("_"):
            continue
        frontmatter, _ = split_frontmatter(path.read_text(encoding="utf-8"))
        if not frontmatter:
            continue
        title = title_from_frontmatter(frontmatter)
        found = exact_section(title, corpus)
        if found:
            content, source = found
        else:
            source_name = SOURCE_BY_SLUG.get(path.stem)
            if not source_name:
                raise RuntimeError(f"No canonical source mapping for {relative}")
            source = BOOKS / source_name
            content = book_body(source)
            content = re.sub(r"^#\s+.+?\n+", "", content, count=1)
        source_rel = source.relative_to(BOOKS)
        body = (
            f"# {title}\n\n"
            f"> Статья синхронизирована с канонической книгой "
            f"`rawBooks/world_bible/{source_rel}`.\n\n"
            f"{content.strip()}\n"
        )
        path.write_text(frontmatter.rstrip() + "\n\n" + body, encoding="utf-8")
        changed += 1
    print(f"entity wiki: {changed} article(s) synchronized")


if __name__ == "__main__":
    main()

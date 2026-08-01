#!/usr/bin/env python3
"""Build transient wiki articles from canonical rawBooks."""
from __future__ import annotations

from dataclasses import dataclass
from hashlib import sha1
from pathlib import Path
import re
import shutil

ROOT = Path(__file__).resolve().parents[2]
BOOKS = ROOT / "rawBooks" / "world_bible"
WIKI = ROOT / "web" / ".generated" / "wiki"
GROUP_TYPES = {"00_meta": "meta", "01_foundations": "concept", "02_world": "concept", "03_civilization": "culture", "04_organizations": "organization", "05_conflicts": "conflict", "06_game": "game"}
STOP = {"который", "которая", "которые", "этого", "этой", "через", "между", "после", "перед", "мира", "мире", "часть", "общие", "основные", "работа", "система", "системы"}

@dataclass
class Article:
    article_id: str
    title: str
    body: str
    source: Path
    order: int
    group: str
    slug: str
    related: list[str]

def split_frontmatter(text: str) -> tuple[str, str]:
    match = re.match(r"^---\n.*?\n---\n?", text, re.S)
    return (match.group(0), text[match.end():]) if match else ("", text)

def fm_value(frontmatter: str, name: str, fallback: str = "") -> str:
    match = re.search(rf"^{re.escape(name)}:\s*(.+?)\s*$", frontmatter, re.M)
    return match.group(1).strip(" '\"") if match else fallback

def slugify(value: str) -> str:
    table = str.maketrans({
        "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "yo",
        "ж": "zh", "з": "z", "и": "i", "й": "y", "к": "k", "л": "l", "м": "m",
        "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
        "ф": "f", "х": "h", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "sch",
        "ъ": "", "ы": "y", "ь": "", "э": "e", "ю": "yu", "я": "ya",
    })
    value = value.casefold().translate(table)
    return re.sub(r"[^a-z0-9]+", "-", value).strip("-")[:90] or "article"

def plain(value: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"[`*_#>\[\]()]", " ", value)).strip()

def tokens(value: str) -> set[str]:
    return {word for word in re.findall(r"[а-яёa-z]{5,}", value.casefold()) if word not in STOP}

def article_type(article: Article) -> str:
    parts = article.source.relative_to(BOOKS).parts
    stem = article.source.stem
    if "01_cosmology" in parts:
        return "cosmology"
    if stem in {"12_etherology", "08_etherological_interaction", "07_domain_resonance", "89_etheric_specifications"}:
        return "magic"
    if "03_engineering" in parts or stem in {"17_devices", "18_infrastructure", "19_energy", "57_industry"}:
        return "technology"
    if "00_history" in parts:
        return "event"
    if stem in {"27_climate", "28_oceans", "78_etheric_anomalies", "79_entities"}:
        return "phenomenon"
    if "00_peoples" in parts:
        return "race"
    if stem in {"31_states", "32_city_states"}:
        return "country"
    if parts[0] == "04_organizations":
        return "organization"
    if parts[0] == "05_conflicts":
        return "conflict"
    return GROUP_TYPES.get(article.group, "concept")

def extract_articles() -> list[Article]:
    articles: list[Article] = []
    seen_bodies: set[str] = set()
    for source in sorted(BOOKS.rglob("*.md")):
        frontmatter, body = split_frontmatter(source.read_text(encoding="utf-8"))
        book_id = fm_value(frontmatter, "id", str(source.relative_to(BOOKS)))
        group = source.relative_to(BOOKS).parts[0]
        matches = list(re.finditer(r"^(#{2,4})\s+(.+?)\s*$", body, re.M))
        used: dict[str, int] = {}
        for index, match in enumerate(matches):
            end = matches[index + 1].start() if index + 1 < len(matches) else len(body)
            section = body[match.end():end].strip()
            if len(plain(section)) < 45:
                continue
            fingerprint = re.sub(r"\s+", " ", plain(section).casefold().replace("ё", "е"))
            if fingerprint in seen_bodies:
                continue
            seen_bodies.add(fingerprint)
            title = re.sub(r"^\d+(?:\.\d+)*\.\s*", "", match.group(2)).strip()
            base = slugify(title)
            used[base] = used.get(base, 0) + 1
            slug = base if used[base] == 1 else f"{base}-{used[base]}"
            article_id = "ART_" + sha1(f"{book_id}:{index + 1}:{title}".encode()).hexdigest()[:14].upper()
            articles.append(Article(article_id, title, section, source, index + 1, group, slug, []))
    return articles

def connect(articles: list[Article]) -> None:
    title_tokens = {article.article_id: tokens(article.title) for article in articles}
    for article in articles:
        own = title_tokens[article.article_id]
        ranked = []
        for candidate in articles:
            if candidate is article:
                continue
            same_book = candidate.source == article.source
            overlap = len(own & title_tokens[candidate.article_id])
            adjacent = same_book and abs(candidate.order - article.order) <= 2
            score = overlap * 4 + (2 if adjacent else 0) + (0.25 if same_book else 0)
            if score > 0:
                ranked.append((score, candidate.title.casefold(), candidate))
        ranked.sort(key=lambda row: (-row[0], row[1], row[2].article_id))
        article.related = [candidate.article_id for _, _, candidate in ranked[:12]]

def clear_articles() -> None:
    if WIKI.exists():
        shutil.rmtree(WIKI)
    WIKI.mkdir(parents=True, exist_ok=True)

def write(articles: list[Article]) -> None:
    clear_articles()
    (WIKI / "_home.md").write_text("---\nid: WIKI_HOME\ntitle: Энциклопедия «Вуали Миров»\ntype: meta\nstatus: canon\n---\n# Энциклопедия «Вуали Миров»\n\nВсе статьи автоматически собраны из канонических книг мира.\n", encoding="utf-8")
    for article in articles:
        rel_source = article.source.relative_to(BOOKS)
        directory = WIKI / "generated" / article.group / article.source.stem
        directory.mkdir(parents=True, exist_ok=True)
        summary = plain(article.body)[:240].rsplit(" ", 1)[0]
        relation_lines = "\n".join(f"  - type: related\n    target: {target}" for target in article.related) or "  []"
        safe_title = article.title.replace('"', "'")
        safe_summary = summary.replace('"', "'")
        text = f'''---
id: {article.article_id}
type: {article_type(article)}
title: "{safe_title}"
status: canon
version: 1.0.0
visibility: public
summary: "{safe_summary}"
book_section: "{safe_title}"
book_order: {article.order}
source_path: "rawBooks/world_bible/{rel_source}"
relations:
{relation_lines}
---
# {article.title}

{article.body.strip()}
'''
        (directory / f"{article.order:03d}-{article.slug}.md").write_text(text, encoding="utf-8")

def main() -> None:
    articles = extract_articles()
    connect(articles)
    write(articles)
    print(f"wiki rebuilt from scratch: {len(articles)} articles")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Build a structured JSON corpus from the wiki's Markdown files.

Output is designed to be uploaded to Cloudflare KV and injected into the
chatbot's system prompt so Claude can answer questions grounded in wiki content.

Usage:
    python scripts/build_corpus.py              # writes to scripts/corpus.json
    python scripts/build_corpus.py --out /tmp/corpus.json
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path

# Directories excluded from the wiki build (mirrors _config.yml exclude list)
EXCLUDE_DIRS = {
    "ingest",
    "_site",
    ".jekyll-cache",
    "vendor",
    "node_modules",
    ".claude",
    ".git",
    ".github",
    "scripts",
}

# Individual files to skip
EXCLUDE_FILES = {
    "README.md",
    "IMPROVEMENTS.md",
    "WIKI_PLATFORM_OPTIONS.md",
    "GITHUB_ACTIONS_SETUP.md",
    "JUST_THE_DOCS_MIGRATION.md",
}

FRONT_MATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)
KRAMDOWN_ANCHOR_RE = re.compile(r"\{:\s*#([\w-]+)\s*\}")
HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)(?:\s*\{:.*\})?\s*$", re.MULTILINE)


def parse_front_matter(text: str) -> dict:
    """Extract YAML front matter as a simple key-value dict (no PyYAML dependency)."""
    m = FRONT_MATTER_RE.match(text)
    if not m:
        return {}
    fm = {}
    for line in m.group(1).splitlines():
        line = line.strip()
        if ":" in line and not line.startswith("#"):
            key, _, val = line.partition(":")
            val = val.strip().strip("\"'")
            if val.lower() == "true":
                val = True
            elif val.lower() == "false":
                val = False
            fm[key.strip()] = val
    return fm


def extract_anchors(text: str) -> list[str]:
    """Return all explicit kramdown anchors and heading-derived anchors."""
    anchors = []

    # Explicit kramdown anchors: {: #some-id}
    for m in KRAMDOWN_ANCHOR_RE.finditer(text):
        anchors.append(m.group(1))

    # Heading-derived anchors (Just the Docs auto-generates these)
    for m in HEADING_RE.finditer(text):
        heading_text = m.group(2).strip()
        # Remove inline markup for slug generation
        slug = re.sub(r"[^a-z0-9\s-]", "", heading_text.lower())
        slug = re.sub(r"\s+", "-", slug.strip())
        if slug and slug not in anchors:
            anchors.append(slug)

    return anchors


def strip_front_matter(text: str) -> str:
    """Remove YAML front matter block from content."""
    return FRONT_MATTER_RE.sub("", text, count=1)


def build_corpus(wiki_root: Path) -> list[dict]:
    """Walk the wiki and build the corpus entries."""
    pages = []

    for md_path in sorted(wiki_root.rglob("*.md")):
        rel = md_path.relative_to(wiki_root)

        # Skip excluded directories
        if any(part in EXCLUDE_DIRS for part in rel.parts):
            continue

        # Skip excluded files
        if rel.name in EXCLUDE_FILES:
            continue

        text = md_path.read_text(encoding="utf-8")
        fm = parse_front_matter(text)

        # Skip pages without a permalink (not published)
        permalink = fm.get("permalink")
        if not permalink:
            continue

        # Skip nav-excluded pages that aren't the homepage
        if fm.get("nav_exclude") is True and permalink != "/":
            continue

        content = strip_front_matter(text).strip()
        anchors = extract_anchors(text)

        pages.append(
            {
                "title": fm.get("title", rel.stem),
                "url": permalink,
                "parent": fm.get("parent", ""),
                "anchors": anchors,
                "content": content,
            }
        )

    return pages


def corpus_to_prompt_text(pages: list[dict]) -> str:
    """Format the corpus for injection into a system prompt."""
    sections = []
    for page in pages:
        anchor_str = ", ".join(page["anchors"]) if page["anchors"] else "(none)"
        header = f'[PAGE: {page["title"]} | URL: {page["url"]}]'
        header += f"\n[ANCHORS: {anchor_str}]"
        sections.append(f"{header}\n\n{page['content']}")
    return "\n\n---\n\n".join(sections)


def main():
    parser = argparse.ArgumentParser(description="Build wiki corpus JSON for chatbot")
    parser.add_argument(
        "--root",
        type=Path,
        default=Path(__file__).resolve().parent.parent,
        help="Wiki root directory (default: repo root)",
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=None,
        help="Output JSON path (default: scripts/corpus.json)",
    )
    parser.add_argument(
        "--prompt-text",
        action="store_true",
        help="Also output the formatted prompt text to corpus_prompt.txt",
    )
    args = parser.parse_args()

    out_path = args.out or (args.root / "scripts" / "corpus.json")

    pages = build_corpus(args.root)

    # Write structured JSON
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(pages, f, indent=2, ensure_ascii=False)

    # Stats
    total_chars = sum(len(p["content"]) for p in pages)
    total_anchors = sum(len(p["anchors"]) for p in pages)
    print(f"Corpus built: {len(pages)} pages, {total_chars:,} chars, {total_anchors} anchors")
    print(f"Estimated tokens: ~{total_chars // 4:,}")
    print(f"Written to: {out_path}")

    # Optionally write prompt-formatted text
    if args.prompt_text:
        prompt_path = out_path.with_name("corpus_prompt.txt")
        prompt_text = corpus_to_prompt_text(pages)
        with open(prompt_path, "w", encoding="utf-8") as f:
            f.write(prompt_text)
        print(f"Prompt text written to: {prompt_path}")


if __name__ == "__main__":
    main()

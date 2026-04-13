#!/usr/bin/env python3
"""
Build a JSON graph of wiki page connectivity for the interactive site map.

Walks all published Markdown files, extracts internal links, and outputs
a nodes + edges structure consumed by the D3.js sitemap visualisation.

Usage:
    python scripts/build_sitemap.py              # writes to _data/sitemap-graph.json
    python scripts/build_sitemap.py --out /tmp/sitemap-graph.json
"""

import argparse
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

# ── Reused from build_corpus.py ──────────────────────────────────────────────

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

EXCLUDE_FILES = {
    "README.md",
    "IMPROVEMENTS.md",
    "WIKI_PLATFORM_OPTIONS.md",
    "GITHUB_ACTIONS_SETUP.md",
    "JUST_THE_DOCS_MIGRATION.md",
}

FRONT_MATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)

# Matches markdown links whose target starts with / (internal wiki links)
INTERNAL_LINK_RE = re.compile(r"\[([^\]]*)\]\((/[^)]+)\)")

# ── Section colour mapping ───────────────────────────────────────────────────

SECTION_MAP = {
    "Overview": "Overview",
    "Workflows": "Workflows",
    "Standards": "Standards",
    "Tools": "Tools",
}


def parse_front_matter(text: str) -> dict:
    """Extract YAML front matter as a simple key-value dict."""
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


def resolve_section(fm: dict) -> str:
    """Determine the top-level section a page belongs to."""
    # Walk up the parent chain
    for key in ("grand_parent", "parent", "title"):
        val = fm.get(key, "")
        if isinstance(val, str):
            for section_name in SECTION_MAP:
                if section_name.lower() in val.lower():
                    return section_name
    return "Home"


def normalise_target(href: str) -> str:
    """Normalise a link target: strip anchors, ensure .html extension."""
    # Remove fragment
    href = href.split("#")[0]
    # Ensure trailing .html
    if not href.endswith(".html") and not href.endswith("/"):
        href = href.rstrip("/") + ".html"
    # Normalise trailing slash for root
    if href == "/":
        return "/"
    return href


def build_graph(wiki_root: Path) -> dict:
    """Two-pass algorithm: collect nodes, then edges."""

    # ── Pass 1: Nodes ────────────────────────────────────────────────────────
    nodes = {}       # permalink → {id, title, section}
    excluded = set() # permalinks of pages intentionally excluded from graph

    for md_path in sorted(wiki_root.rglob("*.md")):
        rel = md_path.relative_to(wiki_root)

        if any(part in EXCLUDE_DIRS for part in rel.parts):
            continue
        if rel.name in EXCLUDE_FILES:
            continue

        text = md_path.read_text(encoding="utf-8")
        fm = parse_front_matter(text)

        permalink = fm.get("permalink")
        if not permalink:
            continue

        # Include nav-excluded pages only if they're the homepage
        if fm.get("nav_exclude") is True and permalink != "/":
            continue

        # Skip Quick Start / Quick Reference index pages (noise in the graph)
        title = fm.get("title", "")
        if isinstance(title, str) and ("quick reference" in title.lower()
                                       or "quick start" in title.lower()):
            excluded.add(permalink)
            continue

        nodes[permalink] = {
            "id": permalink,
            "title": fm.get("title", rel.stem),
            "section": resolve_section(fm),
            "degree": 0,
            "_path": str(md_path),  # internal, stripped before output
        }

    # ── Pass 2: Edges ────────────────────────────────────────────────────────
    edge_set = set()  # (source, target) tuples for dedup
    broken = []

    for permalink, node in nodes.items():
        text = Path(node["_path"]).read_text(encoding="utf-8")

        for m in INTERNAL_LINK_RE.finditer(text):
            target_raw = m.group(2)
            target = normalise_target(target_raw)

            if target == permalink:
                continue  # skip self-links

            if target in excluded:
                continue  # linked page intentionally excluded from graph

            if target not in nodes:
                broken.append((permalink, target_raw))
                continue

            pair = tuple(sorted([permalink, target]))
            edge_set.add(pair)

    # ── Compute degree ───────────────────────────────────────────────────────
    for src, tgt in edge_set:
        nodes[src]["degree"] += 1
        nodes[tgt]["degree"] += 1

    # ── Build output ─────────────────────────────────────────────────────────
    node_list = []
    for n in nodes.values():
        node_list.append({
            "id": n["id"],
            "title": n["title"],
            "section": n["section"],
            "degree": n["degree"],
        })

    edge_list = [{"source": s, "target": t} for s, t in sorted(edge_set)]

    # ── Report broken links ──────────────────────────────────────────────────
    if broken:
        print(f"WARNING: {len(broken)} broken internal link(s):", file=sys.stderr)
        for src, tgt in broken:
            print(f"  {src} → {tgt}", file=sys.stderr)

    return {"nodes": node_list, "edges": edge_list}


def main():
    parser = argparse.ArgumentParser(description="Build sitemap graph JSON")
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
        help="Output JSON path (default: _data/sitemap-graph.json)",
    )
    args = parser.parse_args()

    out_path = args.out or (args.root / "_data" / "sitemap-graph.json")

    graph = build_graph(args.root)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(graph, f, indent=2, ensure_ascii=False)

    print(f"Sitemap graph: {len(graph['nodes'])} nodes, {len(graph['edges'])} edges")
    print(f"Written to: {out_path}")


if __name__ == "__main__":
    main()

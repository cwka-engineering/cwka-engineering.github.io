#!/usr/bin/env python3
"""
Build structured JSON corpora from the wiki's Markdown files.

Supports multi-corpus output. "general" is the superset corpus -- every
published page, with no corpus_tags filtering -- since FE is the primary
audience for the public/FE-facing Wiki Assistant and that assistant should be
able to answer from the whole wiki. "fe-release" and "fe-submittal" are
narrower opt-in subsets (via corpus_tags in front matter) that feed the
internal FE diagnostic/summarize tools, where a smaller, more targeted corpus
is worth the tradeoff.

Output is uploaded to Cloudflare KV and injected into the chatbot's system
prompt so Claude can answer questions grounded in wiki content.

Usage:
    python scripts/build_corpus.py              # builds all corpora under repo root
    python scripts/build_corpus.py --out-dir /tmp
    python scripts/build_corpus.py --tag fe-release  # build a single tag

Legacy single-output mode (backward compat):
    python scripts/build_corpus.py --out corpus.json --prompt-text
"""

import argparse
import json
import re
from pathlib import Path

try:
    import yaml as _yaml
    def _load_yaml(path: Path) -> dict:
        with open(path, encoding="utf-8") as f:
            return _yaml.safe_load(f)
except ImportError:
    _load_yaml = None  # type: ignore[assignment]

# Corpora to build.  Tag name must match the corpus_tags values used in front
# matter and the KV key suffix used in the Cloudflare worker (wiki-corpus-<tag>).
DEFINED_TAGS = ["general", "fe-release", "fe-submittal"]

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
    """Extract YAML front matter as a simple key-value dict (no PyYAML dependency).

    Supports:
      - Scalar strings, booleans
      - Inline YAML lists: corpus_tags: [general, fe-release]
    """
    m = FRONT_MATTER_RE.match(text)
    if not m:
        return {}
    fm: dict = {}
    for line in m.group(1).splitlines():
        line = line.strip()
        if ":" not in line or line.startswith("#"):
            continue
        key, _, val = line.partition(":")
        val = val.strip().strip("\"'")
        if val.lower() == "true":
            val = True
        elif val.lower() == "false":
            val = False
        elif val.startswith("[") and val.endswith("]"):
            # Inline YAML list: [item1, item2]
            val = [
                item.strip().strip("\"'")
                for item in val[1:-1].split(",")
                if item.strip()
            ]
        fm[key.strip()] = val
    return fm


def get_page_tags(fm: dict) -> list[str]:
    """Return the corpus tags for a page. Defaults to ['general'] if unset."""
    tags = fm.get("corpus_tags")
    if tags is None:
        return ["general"]
    if isinstance(tags, list):
        return [str(t) for t in tags if t]
    # Scalar fallback (e.g. corpus_tags: general without brackets)
    s = str(tags).strip()
    return [s] if s else ["general"]


def extract_anchors(text: str) -> list[str]:
    """Return all explicit kramdown anchors and heading-derived anchors."""
    anchors: list[str] = []

    # Explicit kramdown anchors: {: #some-id}
    for m in KRAMDOWN_ANCHOR_RE.finditer(text):
        anchors.append(m.group(1))

    # Heading-derived anchors (Just the Docs auto-generates these)
    for m in HEADING_RE.finditer(text):
        heading_text = m.group(2).strip()
        slug = re.sub(r"[^a-z0-9\s-]", "", heading_text.lower())
        slug = re.sub(r"\s+", "-", slug.strip())
        if slug and slug not in anchors:
            anchors.append(slug)

    return anchors


def strip_front_matter(text: str) -> str:
    """Remove YAML front matter block from content."""
    return FRONT_MATTER_RE.sub("", text, count=1)


HOW_WE_WORK_URL = "/onboarding/how-we-work.html"


def format_dept_corpus(dept_data: dict) -> str:
    """Format _data/departments.yml into corpus-friendly prose for the chatbot.

    Each department gets a headed section with transient roles (if any), primary
    responsibilities, supporting responsibilities, and top collaboration partners.
    Department codes are used as headings so the chatbot can surface deep links
    like /onboarding/how-we-work.html#E.
    """
    lines: list[str] = [
        "## Department Responsibilities and Collaboration Map",
        "",
        "The following describes each CWK/DFW department's responsibilities and key "
        "collaboration partners. Navigate directly to any department using a URL anchor, "
        "e.g. /onboarding/how-we-work.html#E opens the Engineering panel.",
        "",
    ]

    depts = dept_data.get("departments", {})
    edges = dept_data.get("edges", [])

    for code, dept in depts.items():
        name = dept.get("name", code)
        lines.append(f"### {name} ({code})")
        lines.append(f"Deep link: {HOW_WE_WORK_URL}#{code}")
        lines.append("")

        # Transient roles (Engineering only in current data)
        roles = dept.get("roles") or []
        if roles:
            lines.append("**Transient designations:**")
            for role in roles:
                lines.append(
                    f"- **{role['code']} — {role['name']}:** {role['note']}"
                )
            lines.append("")

        tasks = dept.get("tasks", [])
        primary = [t for t in tasks if t.get("level") == 1]
        supporting = [t for t in tasks if t.get("level") == 2]

        if primary:
            lines.append("**Primary responsibilities:**")
            for t in primary:
                entry = f"- {t['task']}"
                if t.get("collab"):
                    entry += f" (collaborates with: {t['collab']})"
                lines.append(entry)
            lines.append("")

        if supporting:
            lines.append("**Supporting responsibilities:**")
            for t in supporting:
                entry = f"- {t['task']}"
                if t.get("collab"):
                    entry += f" (with: {t['collab']})"
                lines.append(entry)
            lines.append("")

        # Derive top collaborators from edges
        collabs: list[tuple[str, int]] = []
        for e in edges:
            if e["source"] == code:
                collabs.append((e["target"], e["weight"]))
            elif e["target"] == code:
                collabs.append((e["source"], e["weight"]))
        collabs.sort(key=lambda x: -x[1])
        if collabs:
            top = ", ".join(f"{c} ×{w}" for c, w in collabs[:5])
            lines.append(f"**Top collaborators:** {top}")
            lines.append("")

    return "\n".join(lines)


def augment_org_viz(pages: list[dict], wiki_root: Path) -> None:
    """Append department corpus text to the How We Work page entry, if present.

    Reads _data/departments.yml and folds the full department data into the
    how-we-work corpus entry so the wiki chatbot (/api/chat) can answer questions
    about department responsibilities and surface deep links.

    Only touches the 'general' corpus (how-we-work carries no corpus_tags, so it
    defaults to general). Other tagged corpora (fe-release, fe-submittal) are
    unaffected.
    """
    if _load_yaml is None:
        print(
            "[warn] PyYAML not installed — skipping org-viz department corpus augmentation. "
            "Run: pip install pyyaml"
        )
        return

    dept_yml = wiki_root / "_data" / "departments.yml"
    if not dept_yml.exists():
        return

    try:
        dept_data = _load_yaml(dept_yml)
    except Exception as exc:
        print(f"[warn] Could not parse {dept_yml}: {exc}")
        return

    dept_codes = list(dept_data.get("departments", {}).keys())
    dept_text = format_dept_corpus(dept_data)

    for page in pages:
        if page["url"] == HOW_WE_WORK_URL:
            page["content"] = page["content"] + "\n\n" + dept_text
            # Add department codes as navigable anchors (e.g. #E, #PM, #PUR)
            for code in dept_codes:
                if code not in page["anchors"]:
                    page["anchors"].append(code)
            break


def build_corpus(wiki_root: Path, tag: str | None = None) -> list[dict]:
    """Walk the wiki and build corpus entries.

    tag=None   — all non-excluded pages, no filtering. Used to build the
                 "general" superset corpus (see module docstring).
    tag='foo'  — only pages whose corpus_tags include 'foo'
                 (untagged pages default to ['general'])
    """
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

        # Skip pages explicitly excluded from the corpus
        if fm.get("corpus_exclude") is True:
            continue

        # Filter by tag if requested
        if tag is not None:
            if tag not in get_page_tags(fm):
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

    augment_org_viz(pages, wiki_root)
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


def main() -> None:
    parser = argparse.ArgumentParser(description="Build wiki corpus JSON for chatbot")
    parser.add_argument(
        "--root",
        type=Path,
        default=Path(__file__).resolve().parent.parent,
        help="Wiki root directory (default: repo root)",
    )
    parser.add_argument(
        "--out-dir",
        type=Path,
        default=None,
        help="Output directory for corpus files (default: repo root)",
    )
    parser.add_argument(
        "--tag",
        type=str,
        default=None,
        help=f"Build a single corpus tag. Available: {', '.join(DEFINED_TAGS)}",
    )
    # Legacy single-output flags — kept for backward compatibility
    parser.add_argument(
        "--out",
        type=Path,
        default=None,
        help="(Legacy) Single output JSON path; builds all pages with no tag filter.",
    )
    parser.add_argument(
        "--prompt-text",
        action="store_true",
        help="(Legacy) Also write corpus_prompt.txt alongside --out.",
    )
    args = parser.parse_args()

    # ------------------------------------------------------------------
    # Legacy single-output mode (--out supplied)
    # ------------------------------------------------------------------
    if args.out:
        out_path = args.out
        pages = build_corpus(args.root)
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(pages, f, indent=2, ensure_ascii=False)
        total_chars = sum(len(p["content"]) for p in pages)
        print(
            f"[all] {len(pages)} pages, {total_chars:,} chars "
            f"(~{total_chars // 4:,} tokens) → {out_path}"
        )
        if args.prompt_text:
            prompt_path = out_path.with_name("corpus_prompt.txt")
            with open(prompt_path, "w", encoding="utf-8") as f:
                f.write(corpus_to_prompt_text(pages))
            print(f"Prompt text → {prompt_path}")
        return

    # ------------------------------------------------------------------
    # Multi-corpus mode
    # ------------------------------------------------------------------
    out_dir = args.out_dir or args.root
    tags_to_build = [args.tag] if args.tag else DEFINED_TAGS

    for tag in tags_to_build:
        # "general" is the superset corpus (every published page, no filter) --
        # it's what the public/FE-facing Wiki Assistant reads from, and FE is
        # the primary audience for that assistant, so it should see everything.
        # fe-release/fe-submittal stay as narrower opt-in subsets feeding the
        # internal FE diagnostic/summarize tools.
        pages = build_corpus(args.root, tag=None if tag == "general" else tag)
        safe_tag = tag.replace("-", "_")  # filesystem-safe variant

        json_path = out_dir / f"corpus_{safe_tag}.json"
        prompt_path = out_dir / f"corpus_{safe_tag}_prompt.txt"

        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(pages, f, indent=2, ensure_ascii=False)

        prompt_text = corpus_to_prompt_text(pages)
        with open(prompt_path, "w", encoding="utf-8") as f:
            f.write(prompt_text)

        total_chars = sum(len(p["content"]) for p in pages)
        total_anchors = sum(len(p["anchors"]) for p in pages)
        print(
            f"[{tag}] {len(pages)} pages, {total_chars:,} chars "
            f"(~{total_chars // 4:,} tokens), {total_anchors} anchors "
            f"→ {prompt_path}"
        )


if __name__ == "__main__":
    main()

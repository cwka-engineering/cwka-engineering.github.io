const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  ExternalHyperlink, PageBreak, Header, Footer, PageNumber,
  LevelFormat, TabStopType, TabStopPosition
} = require("docx");
const fs = require("fs");

// ── Helpers ──────────────────────────────────────────────────────────────────

const BLUE       = "2563EB";
const DARK_BLUE  = "1E3A5F";
const LIGHT_BLUE = "DBEAFE";
const MID_BLUE   = "BFDBFE";
const LIGHT_GRAY = "F3F4F6";
const MID_GRAY   = "E5E7EB";
const DARK_GRAY  = "374151";
const CODE_BG    = "F1F5F9";

const PAGE_W  = 12240; // 8.5"
const PAGE_H  = 15840; // 11"
const MARGIN  = 1080;  // 0.75"
const CONTENT = PAGE_W - MARGIN * 2; // 10,080

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: BLUE, space: 6 } },
    children: [new TextRun({ text, bold: true, size: 32, color: DARK_BLUE, font: "Arial" })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 80 },
    children: [new TextRun({ text, bold: true, size: 26, color: DARK_BLUE, font: "Arial" })]
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 60 },
    children: [new TextRun({ text, bold: true, size: 22, color: "1D4ED8", font: "Arial" })]
  });
}

function p(runs, opts = {}) {
  const children = typeof runs === "string"
    ? [new TextRun({ text: runs, size: 22, font: "Arial", color: DARK_GRAY })]
    : runs;
  return new Paragraph({ spacing: { after: 100 }, ...opts, children });
}

function run(text, opts = {}) {
  return new TextRun({ text, size: 22, font: "Arial", color: DARK_GRAY, ...opts });
}

function bold(text, color) {
  return new TextRun({ text, size: 22, font: "Arial", bold: true, color: color || DARK_GRAY });
}

function code(text) {
  return new TextRun({ text, size: 20, font: "Courier New", color: "1E3A5F" });
}

function link(text, url) {
  return new ExternalHyperlink({
    link: url,
    children: [new TextRun({ text, size: 22, font: "Arial", color: BLUE, underline: {} })]
  });
}

function bullet(runs, level = 0) {
  const children = typeof runs === "string"
    ? [run(runs)]
    : runs;
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { after: 60 },
    children
  });
}

function codeBlock(lines) {
  return new Table({
    width: { size: CONTENT, type: WidthType.DXA },
    columnWidths: [CONTENT],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
      left: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
      right: { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" },
    },
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { fill: CODE_BG, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        children: lines.map(line =>
          new Paragraph({
            spacing: { after: 0 },
            children: [code(line)]
          })
        )
      })]
    })]
  });
}

function spacer(pts = 120) {
  return new Paragraph({ spacing: { after: pts }, children: [] });
}

function callout(label, text, fillColor = LIGHT_BLUE, borderColor = BLUE) {
  return new Table({
    width: { size: CONTENT, type: WidthType.DXA },
    columnWidths: [CONTENT],
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { fill: fillColor, type: ShadingType.CLEAR },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 6, color: borderColor },
          bottom: { style: BorderStyle.SINGLE, size: 6, color: borderColor },
          left: { style: BorderStyle.SINGLE, size: 6, color: borderColor },
          right: { style: BorderStyle.SINGLE, size: 6, color: borderColor },
        },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [new Paragraph({
          spacing: { after: 0 },
          children: [
            bold(label + "  ", borderColor),
            run(text)
          ]
        })]
      })]
    })]
  });
}

function twoColTable(rows, col1W, col2W, headerRow) {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" };
  const borders = { top: border, bottom: border, left: border, right: border };
  const tableRows = [];

  if (headerRow) {
    tableRows.push(new TableRow({
      children: headerRow.map((txt, i) => new TableCell({
        width: { size: i === 0 ? col1W : col2W, type: WidthType.DXA },
        shading: { fill: DARK_BLUE, type: ShadingType.CLEAR },
        borders,
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ spacing: { after: 0 },
          children: [new TextRun({ text: txt, bold: true, size: 20, font: "Arial", color: "FFFFFF" })] })]
      }))
    }));
  }

  rows.forEach((row, ri) => {
    tableRows.push(new TableRow({
      children: row.map((txt, i) => new TableCell({
        width: { size: i === 0 ? col1W : col2W, type: WidthType.DXA },
        shading: { fill: ri % 2 === 0 ? "FFFFFF" : LIGHT_GRAY, type: ShadingType.CLEAR },
        borders,
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ spacing: { after: 0 },
          children: [typeof txt === "string"
            ? new TextRun({ text: txt, size: 20, font: "Arial", color: DARK_GRAY })
            : txt] })]
      }))
    }));
  });

  return new Table({
    width: { size: CONTENT, type: WidthType.DXA },
    columnWidths: [col1W, col2W],
    rows: tableRows
  });
}

// ── Document ─────────────────────────────────────────────────────────────────

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u2022",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }, {
          level: 1, format: LevelFormat.BULLET, text: "\u25E6",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 360 } } }
        }]
      },
      {
        reference: "numbered",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22, color: DARK_GRAY } }
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal",
        run: { size: 32, bold: true, font: "Arial", color: DARK_BLUE },
        paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal",
        run: { size: 26, bold: true, font: "Arial", color: DARK_BLUE },
        paragraph: { spacing: { before: 280, after: 80 }, outlineLevel: 1 }
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal",
        run: { size: 22, bold: true, font: "Arial", color: "1D4ED8" },
        paragraph: { spacing: { before: 200, after: 60 }, outlineLevel: 2 }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_W, height: PAGE_H },
        margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: MID_GRAY, space: 4 } },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: "Wiki Chatbot Implementation Reference", size: 18, font: "Arial", color: "9CA3AF" })
          ]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: MID_GRAY, space: 4 } },
          spacing: { before: 80 },
          children: [
            new TextRun({ text: "Page ", size: 18, font: "Arial", color: "9CA3AF" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Arial", color: "9CA3AF" }),
            new TextRun({ text: " of ", size: 18, font: "Arial", color: "9CA3AF" }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, font: "Arial", color: "9CA3AF" }),
            new TextRun({ text: "   |   CWK/DFW Engineering", size: 18, font: "Arial", color: "9CA3AF" })
          ]
        })]
      })
    },
    children: [

      // ── Cover ────────────────────────────────────────────────────────────

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 1440, after: 240 },
        children: [new TextRun({ text: "Wiki Chatbot", bold: true, size: 56, font: "Arial", color: DARK_BLUE })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [new TextRun({ text: "Implementation Reference", bold: true, size: 48, font: "Arial", color: BLUE })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 480 },
        children: [new TextRun({ text: "Claude-Powered Q&A Widget for Static Sites", size: 28, font: "Arial", color: "6B7280", italics: true })]
      }),

      // Rule
      new Table({
        width: { size: CONTENT, type: WidthType.DXA },
        columnWidths: [CONTENT],
        rows: [new TableRow({ children: [new TableCell({
          width: { size: CONTENT, type: WidthType.DXA },
          shading: { fill: BLUE, type: ShadingType.CLEAR },
          margins: { top: 2, bottom: 2, left: 0, right: 0 },
          children: [new Paragraph({ children: [] })]
        })] })]
      }),

      spacer(480),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [new TextRun({ text: "CWK/DFW Engineering Department", size: 22, font: "Arial", color: DARK_GRAY })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [new TextRun({ text: "April 2026", size: 22, font: "Arial", color: "6B7280" })]
      }),

      // Page break before content
      new Paragraph({ children: [new PageBreak()] }),

      // ── 1. Overview ──────────────────────────────────────────────────────

      h1("1. Overview"),

      p([
        run("This document describes a reusable pattern for adding an AI-powered chatbot to any static site (Jekyll, Hugo, Docusaurus, plain HTML) that answers natural-language questions "),
        bold("grounded exclusively in the site's own content"),
        run(". No hallucination, no off-topic answers — just accurate, cited responses with deep-links to the source page and anchor.")
      ]),

      spacer(80),

      callout("Key principle:", "The chatbot uses the full site corpus in the system prompt rather than RAG/embeddings, making it simple, accurate, and inexpensive for small-to-medium documentation sites (up to ~150K tokens).", LIGHT_BLUE, BLUE),

      spacer(160),

      h2("Use Case: CWK/DFW Engineering Wiki"),

      p([
        run("The reference implementation powers the Engineering Department wiki at "),
        link("cwka-engineering.github.io", "https://cwka-engineering.github.io"),
        run(". The wiki has 76 pages, ~67K tokens, and 105 anchored \u201CHow do I\u201D sections. Engineers ask natural-language questions; the chatbot answers with citations that deep-link directly to the relevant anchor.")
      ]),

      spacer(200),

      // ── 2. Architecture ──────────────────────────────────────────────────

      h1("2. Architecture"),

      h2("Three-Component System"),

      spacer(80),

      // Component cards
      twoColTable([
        ["Frontend Widget", "Vanilla JS + CSS injected into every page. Floating chat button \u2192 expandable panel. SSE streaming, inline markdown renderer, sessionStorage persistence. Zero dependencies."],
        ["Cloudflare Worker", "TypeScript serverless function at the edge. Receives chat requests, loads corpus from KV, calls Anthropic API, proxies SSE stream back to client. API key never exposed."],
        ["Corpus Pipeline", "Python script walks .md files, extracts metadata and anchors, outputs structured JSON + formatted prompt text. GitHub Action uploads to Cloudflare KV on every push to main."],
      ], 2800, 7280, ["Component", "Responsibility"]),

      spacer(240),

      h2("Request Flow"),

      codeBlock([
        "Browser (chat-widget.js)",
        "  \u2502  POST /api/chat  {messages: [...]}",
        "  \u2193",
        "Cloudflare Worker",
        "  \u2502  1. Check CORS + rate limit (KV)",
        "  \u2502  2. Load corpus from WIKI_CORPUS KV",
        "  \u2502  3. Build system prompt (rules + corpus)",
        "  \u2502  4. Call Anthropic API with stream: true",
        "  \u2502  5. Transform SSE \u2192 simplified data: {\"text\":\"...\"} stream",
        "  \u2193",
        "Client receives SSE stream",
        "  \u2502  Parse text deltas \u2192 append to bubble innerHTML",
        "  \u2502  On [DONE]: save to sessionStorage",
        "",
        "GitHub Action (on .md push to main)",
        "  \u2502  python build_corpus.py \u2192 corpus_prompt.txt",
        "  \u2193",
        "  wrangler kv key put --remote \"wiki-corpus-prompt\" \u2192 Cloudflare KV",
        "  Worker reads updated corpus on next request",
      ]),

      spacer(200),

      // ── 3. Full Corpus vs RAG ────────────────────────────────────────────

      h1("3. Full Corpus vs. RAG"),

      h2("Why Full Corpus in System Prompt"),

      bullet([bold("Fits in context: "), run("~67K tokens comfortably inside Claude\u2019s 200K window")]),
      bullet([bold("Prompt caching: "), run("Anthropic caches the corpus block for 5 minutes at ~90% cost reduction on cache hits")]),
      bullet([bold("No retrieval failures: "), run("Claude sees every page \u2014 no semantic mismatch or chunking errors")]),
      bullet([bold("Cross-page synthesis: "), run("Claude can combine information from multiple pages in one response")]),
      bullet([bold("Zero infrastructure: "), run("No vector database, embeddings pipeline, or chunking logic to maintain")]),

      spacer(120),

      h2("When to Use RAG Instead"),

      bullet("Corpus exceeds ~150K tokens (roughly 4\xD7 the current wiki size)"),
      bullet("Multiple distinct knowledge bases requiring selective retrieval"),
      bullet("Real-time data that can\u2019t be batched into a static corpus"),

      spacer(120),

      h2("Cost Model"),

      twoColTable([
        ["Input tokens per request", "~67K system prompt + ~1K user/history = ~68K"],
        ["Cache hit (after first req in 5 min)", "~90% discount on cached tokens"],
        ["Claude Haiku 4.5 \u2014 cached cost/req", "~$0.003\u2013$0.006"],
        ["Claude Haiku 4.5 \u2014 100\u2013200 req/day, 22 days", "~$2\u2013$6/month"],
        ["Claude Sonnet 4.5 \u2014 same usage", "~$15\u2013$30/month"],
        ["Cloudflare Worker + KV", "Free tier (100K req/day)"],
      ], 4000, 6080, ["Item", "Estimate"]),

      spacer(200),

      // ── 4. System Prompt Design ──────────────────────────────────────────

      h1("4. System Prompt Design"),

      h2("Structure"),

      p("The system prompt is assembled by the Cloudflare Worker on each request:"),

      spacer(80),

      codeBlock([
        "SYSTEM PROMPT",
        "\u251C\u2500 Grounding rules (small \u2014 not cached separately)",
        "\u2502   \u2022 Answer ONLY from wiki content",
        "\u2502   \u2022 Cite every claim as a markdown link (URL + anchor)",
        "\u2502   \u2022 Decline gracefully if topic not covered",
        "\u2502   \u2022 Keep answers concise (1\u20134 paragraphs)",
        "\u2502",
        "\u2514\u2500 <wiki-corpus> block  \u2190 marked cache_control: ephemeral",
        "    [PAGE: Part Naming | URL: /workflows/.../part-naming.html]",
        "    [ANCHORS: how-to-group-parts, how-to-generate-names, ...]",
        "    # Part Naming",
        "    ...full markdown content...",
        "    ---",
        "    [PAGE: Takeoffs | URL: /workflows/.../takeoffs.html]",
        "    ...",
        "    </wiki-corpus>",
      ]),

      spacer(120),

      h2("Prompt Caching"),

      p("The corpus block is passed to the Anthropic API with a cache_control field:"),

      codeBlock([
        "system: [",
        "  {",
        "    type: \"text\",",
        "    text: systemPrompt,",
        "    cache_control: { type: \"ephemeral\" }",
        "  }",
        "]",
      ]),

      spacer(80),

      p([
        run("Cloudflare Workers are stateless, so there is no server-side caching. However, Anthropic\u2019s prompt cache works at the "),
        bold("API level"),
        run(" \u2014 any request with the same cached block content within the 5-minute window gets the discount, regardless of which Worker instance handles it.")
      ]),

      spacer(200),

      // ── 5. Corpus Pipeline ───────────────────────────────────────────────

      h1("5. Corpus Build Pipeline"),

      h2("build_corpus.py Logic"),

      p("The Python script (no external dependencies) runs in GitHub Actions on every push:"),

      spacer(80),

      new Paragraph({ numbering: { reference: "numbered", level: 0 }, spacing: { after: 60 },
        children: [run("Walk all .md files, skipping excluded dirs (ingest/, _site/, vendor/, scripts/, chatbot-worker/)")] }),
      new Paragraph({ numbering: { reference: "numbered", level: 0 }, spacing: { after: 60 },
        children: [run("Parse YAML front matter with regex (no PyYAML dependency)")] }),
      new Paragraph({ numbering: { reference: "numbered", level: 0 }, spacing: { after: 60 },
        children: [run("Skip pages without permalink or with nav_exclude: true")] }),
      new Paragraph({ numbering: { reference: "numbered", level: 0 }, spacing: { after: 60 },
        children: [run("Extract anchors: explicit Kramdown {: #anchor-id} AND heading-derived slugs")] }),
      new Paragraph({ numbering: { reference: "numbered", level: 0 }, spacing: { after: 60 },
        children: [run("Output JSON array of {title, url, parent, anchors[], content}")] }),
      new Paragraph({ numbering: { reference: "numbered", level: 0 }, spacing: { after: 60 },
        children: [run("Generate corpus_prompt.txt for KV upload")] }),

      spacer(120),

      h2("Anchor Extraction and Deep-Links"),

      p([
        run("Explicit Kramdown anchors ("),
        code("{: #how-to-...}"),
        run(") on \u201CHow do I\u201D sections become deep-link targets in citations:")
      ]),

      codeBlock([
        "# In the wiki Markdown:",
        "## How do I generate part names?",
        "{: #how-to-generate-names}",
        "",
        "# In the chatbot citation:",
        "[Part Naming \u2014 Generate Names]",
        "(/workflows/fabrication-engineer/part-naming.html#how-to-generate-names)",
      ]),

      spacer(120),

      h2("GitHub Action (sync-corpus.yml)"),

      twoColTable([
        ["Trigger", "Push to main when **.md or build_corpus.py changes; also workflow_dispatch"],
        ["Gate", "CHATBOT_ENABLED repository variable must equal 'true'"],
        ["Steps", "Install wrangler@4 \u2192 run build_corpus.py \u2192 upload with --remote flag"],
        ["Secrets needed", "CLOUDFLARE_API_TOKEN, CF_ACCOUNT_ID, CF_KV_NAMESPACE_ID"],
        ["Variables needed", "CHATBOT_ENABLED = true (in Actions Variables, not Codespaces Secrets)"],
      ], 3000, 7080, ["Setting", "Value"]),

      spacer(200),
      new Paragraph({ children: [new PageBreak()] }),

      // ── 6. Cloudflare Worker Details ─────────────────────────────────────

      h1("6. Cloudflare Worker Details"),

      h2("KV Namespaces"),

      twoColTable([
        ["WIKI_CORPUS", "Stores the formatted corpus prompt text under key \"wiki-corpus-prompt\". Populated by GitHub Action. Worker reads this on every chat request."],
        ["RATE_LIMIT", "Stores per-IP arrays of Unix timestamps. Used to enforce 20 requests/minute limit. Keys expire after 120 seconds."],
      ], 2800, 7280, ["Namespace", "Purpose"]),

      spacer(160),

      h2("Rate Limiting"),

      p([
        run("Uses a sliding window algorithm. Key: "),
        code("rl:{ip}"),
        run(". On each request: prune timestamps older than 60 seconds, check count, append current timestamp. Returns HTTP 429 with user-friendly message if over limit.")
      ]),

      spacer(120),

      h2("CORS"),

      bullet([run("Reads "), code("Origin"), run(" header, compares to "), code("ALLOWED_ORIGIN"), run(" env var")]),
      bullet([run("Also allows "), code("localhost:*"), run(" for local development with "), code("wrangler dev")]),
      bullet("Handles OPTIONS preflight with HTTP 204"),

      spacer(120),

      h2("SSE Stream Transformation"),

      p("The Worker transforms Anthropic\u2019s verbose SSE format into a simpler format the client parses:"),

      codeBlock([
        "// Anthropic sends:",
        "data: {\"type\":\"content_block_delta\",\"delta\":{\"type\":\"text_delta\",\"text\":\"To \"}}",
        "",
        "// Worker re-emits as:",
        "data: {\"text\":\"To \"}",
        "",
        "// Client appends text tokens to bubble innerHTML in real time"
      ]),

      spacer(120),

      h2("Error Responses"),

      twoColTable([
        ["HTTP 503", "Corpus not found in KV \u2014 Worker deployed before corpus was uploaded"],
        ["HTTP 429", "Rate limited \u2014 returns friendly message, not generic error"],
        ["HTTP 502", "Claude API call failed \u2014 user-friendly message, error logged to Worker console"],
        ["HTTP 404", "Any path other than POST /api/chat"],
      ], 1800, 8280, ["Status", "Meaning"]),

      spacer(200),

      // ── 7. Frontend Widget ───────────────────────────────────────────────

      h1("7. Frontend Widget"),

      h2("Chat Panel Structure"),

      codeBlock([
        "<button class=\"cwk-chat-toggle\">  \u2190 56\xD756px, bottom-right, z-index 9999",
        "",
        "<div class=\"cwk-chat-panel\">       \u2190 420\xD7540px (full-width on mobile)",
        "  <div class=\"cwk-chat-header\">    \u2190 \"Wiki Assistant\" + close button",
        "  <div class=\"cwk-chat-messages\">  \u2190 scrollable message list",
        "    .cwk-chat-message-user          \u2190 right-aligned, blue background",
        "    .cwk-chat-message-assistant     \u2190 left-aligned, gray background",
        "  <div class=\"cwk-chat-input-area\"> \u2190 textarea + Send button",
      ]),

      spacer(120),

      h2("Inline Markdown Renderer"),

      p("No external library. A ~50-line regex pipeline handles:"),

      twoColTable([
        ["HTML entity escaping", "Prevents XSS from corpus content"],
        ["Fenced code blocks (``` ... ```)", "Renders as <pre><code>"],
        ["Inline code (`...`)", "Renders as <code>"],
        ["Bold (**...**) and italic (*...*)", "Renders as <strong> / <em>"],
        ["Links ([text](url))", "Renders as <a> with target=\"_top\" (not _blank)"],
        ["Unordered and ordered lists", "Line-by-line detection \u2192 <ul>/<ol>/<li>"],
        ["Paragraphs", "Remaining non-empty lines \u2192 <p>"],
      ], 4000, 6080, ["Pattern", "Behavior"]),

      spacer(120),

      h2("Theme Compatibility"),

      p("The widget uses CSS custom properties from Just the Docs, so dark/light mode toggle works automatically:"),

      codeBlock([
        "--body-background-color   \u2192  panel background",
        "--body-text-color         \u2192  message text",
        "--link-color              \u2192  button color, focus borders",
        "--border-color            \u2192  panel border, input border",
        "--sidebar-color           \u2192  assistant bubble background",
      ]),

      spacer(80),

      callout("Adaptation note:", "Replace these variable names with your framework's equivalent custom properties. If your theme doesn't use CSS custom properties, add explicit light/dark class overrides.", LIGHT_BLUE, BLUE),

      spacer(120),

      h2("Session Persistence"),

      bullet([run("Messages stored in "), code("sessionStorage"), run(" under key "), code("cwk-chat-messages")]),
      bullet("Conversation survives wiki page navigation within the same browser tab"),
      bullet([run("Cleared automatically when tab closes ("), code("sessionStorage"), run(", not "), code("localStorage"), run(")")]),
      bullet("Last 20 messages sent to API (older history pruned before API call)"),

      spacer(200),
      new Paragraph({ children: [new PageBreak()] }),

      // ── 8. Deployment ────────────────────────────────────────────────────

      h1("8. Deployment Guide"),

      h2("Prerequisites"),

      bullet("Cloudflare account (free tier sufficient)"),
      bullet("Anthropic API key"),
      bullet("Static site on GitHub Pages (or any host)"),
      bullet([run("Node.js + npm (for wrangler CLI: "), code("npm install -g wrangler@4"), run(")")]),
      bullet("Python 3.9+ (for build_corpus.py)"),

      spacer(120),

      h2("One-Time Setup"),

      h3("Step 1: Create KV namespaces"),

      codeBlock([
        "cd chatbot-worker",
        "npx wrangler login",
        "npx wrangler kv namespace create WIKI_CORPUS",
        "npx wrangler kv namespace create RATE_LIMIT",
        "# Copy the returned IDs into wrangler.toml",
      ]),

      spacer(80),

      h3("Step 2: Set the Anthropic API key"),

      codeBlock([
        "npx wrangler secret put ANTHROPIC_API_KEY",
        "# Paste your key at the interactive prompt",
        "# IMPORTANT: must be run interactively \u2014 not from CI",
      ]),

      spacer(80),

      h3("Step 3: Deploy the Worker"),

      codeBlock([
        "npm install",
        "npx wrangler deploy",
        "# Note the workers.dev URL in the output",
      ]),

      spacer(80),

      h3("Step 4: Seed the corpus"),

      codeBlock([
        "cd ..",
        "python scripts/build_corpus.py --prompt-text",
        "npx wrangler kv key put \\",
        "  --namespace-id=\"<WIKI_CORPUS_ID>\" \\",
        "  --remote \\",
        "  \"wiki-corpus-prompt\" \\",
        "  --path=scripts/corpus_prompt.txt",
      ]),

      spacer(80),

      h3("Step 5: Update widget URL and wire into site"),

      codeBlock([
        "# In assets/js/chat-widget.js, update:",
        ": \"https://your-worker.your-subdomain.workers.dev\";",
        "",
        "# In _includes/head_custom.html, add:",
        "<link rel=\"stylesheet\" href=\"/assets/css/chat-widget.css\">",
        "<script defer src=\"/assets/js/chat-widget.js\"></script>",
      ]),

      spacer(80),

      h3("Step 6: Add GitHub secrets and variable"),

      p("In your repo: Settings \u2192 Secrets and variables \u2192 Actions"),

      twoColTable([
        ["CLOUDFLARE_API_TOKEN", "Secret \u2014 create at dash.cloudflare.com/profile/api-tokens with Workers KV write permission"],
        ["CF_ACCOUNT_ID", "Secret \u2014 your Cloudflare account ID (visible in wrangler output)"],
        ["CF_KV_NAMESPACE_ID", "Secret \u2014 the WIKI_CORPUS namespace ID from Step 1"],
        ["CHATBOT_ENABLED", "Variable (not secret) \u2014 set to true to activate the sync workflow"],
      ], 3200, 6880, ["Name", "Details"]),

      spacer(200),

      // ── 9. Adapting to Other Sites ───────────────────────────────────────

      h1("9. Adapting to Other Static Sites"),

      twoColTable([
        ["build_corpus.py", "Adjust EXCLUDE_DIRS for your site's folder structure. Update front matter parsing if your site uses different fields (e.g., Hugo uses 'slug' instead of 'permalink')."],
        ["chat-widget.js", "Update API_URL constant or use the meta tag override pattern: <meta name=\"cwk-chat-api\" content=\"https://...\">"],
        ["chat-widget.css", "Replace --body-background-color, --link-color, etc. with your theme's CSS custom properties."],
        ["wrangler.toml", "Update ALLOWED_ORIGIN to your site's domain. Adjust MAX_REQUESTS_PER_MINUTE as needed."],
        ["System prompt rules", "Customize the grounding rules in the Worker for your content domain (tone, citation style, length limits)."],
        ["Anchor extraction", "If your site uses a different anchor convention, update the KRAMDOWN_ANCHOR_RE regex in build_corpus.py."],
      ], 2800, 7280, ["File", "Adaptation"]),

      spacer(200),
      new Paragraph({ children: [new PageBreak()] }),

      // ── 10. Files Reference ──────────────────────────────────────────────

      h1("10. Files Reference"),

      h2("Jekyll Repo"),

      twoColTable([
        ["assets/js/chat-widget.js", "Floating chat panel, SSE parsing, inline markdown rendering, sessionStorage"],
        ["assets/css/chat-widget.css", "Widget styling using CSS custom properties for theme compatibility"],
        ["scripts/build_corpus.py", "Extracts wiki pages into JSON + prompt text for Cloudflare KV"],
        [".github/workflows/sync-corpus.yml", "Auto-syncs corpus to KV on push to main when .md files change"],
        ["_includes/head_custom.html", "Loads widget CSS and JS on every page"],
        ["_config.yml", "Exclude chatbot-worker/ and scripts/ from Jekyll build"],
      ], 4000, 6080, ["File", "Purpose"]),

      spacer(160),

      h2("Cloudflare Worker (chatbot-worker/)"),

      twoColTable([
        ["src/index.ts", "Worker logic: CORS, rate limiting, KV read, Claude API proxy, SSE streaming"],
        ["wrangler.toml", "KV namespace bindings, environment variables (ALLOWED_ORIGIN, CLAUDE_MODEL), Worker name"],
        ["package.json", "wrangler@4 and @cloudflare/workers-types as devDependencies"],
        ["tsconfig.json", "TypeScript config targeting Cloudflare Workers runtime"],
      ], 3200, 6880, ["File", "Purpose"]),

      spacer(200),

      // ── 11. Maintenance ──────────────────────────────────────────────────

      h1("11. Maintenance"),

      h2("Routine Tasks"),

      twoColTable([
        ["Monthly", "Check Anthropic console for API spend. Review Cloudflare Worker request counts."],
        ["Quarterly", "Check Anthropic release notes for newer model versions. Update CLAUDE_MODEL in wrangler.toml and redeploy."],
        ["As needed", "If site grows significantly, re-run build_corpus.py --prompt-text and check token count against the 150K threshold."],
      ], 2000, 8080, ["Frequency", "Task"]),

      spacer(120),

      h2("Model Updates"),

      p("Update one line in wrangler.toml and redeploy:"),

      codeBlock([
        "# wrangler.toml",
        "CLAUDE_MODEL = \"claude-haiku-4-5-20251001\"   # old",
        "CLAUDE_MODEL = \"claude-haiku-5-20260101\"     # new (example)",
        "",
        "# Then:",
        "npx wrangler deploy",
      ]),

      spacer(120),

      h2("Corpus Sync"),

      p([
        run("Automatic \u2014 GitHub Action runs on every push to "),
        code("main"),
        run(" that changes "),
        code(".md"),
        run(" files. Manual trigger also available via "),
        code("workflow_dispatch"),
        run(" in the Actions tab.")
      ]),

      spacer(120),

      h2("Scaling"),

      p([
        bold("Current approach handles well up to ~150K token corpus"),
        run(" (roughly 4\xD7 the current wiki size). Beyond that:")
      ]),

      bullet("Chunk corpus by section (Overview, Workflows, Standards, Tools)"),
      bullet("Add client-side Lunr.js pre-filter to select the relevant section before sending to Worker"),
      bullet("Or adopt a proper RAG pipeline (embeddings + vector store)"),

      spacer(200),
      new Paragraph({ children: [new PageBreak()] }),

      // ── 12. Gotchas ──────────────────────────────────────────────────────

      h1("12. Gotchas & Lessons Learned"),

      spacer(80),

      callout("1.", "Empty id fields in wrangler.toml (id = \"\") block ALL wrangler commands including login. Comment out [[kv_namespaces]] sections until you have real IDs from 'wrangler kv namespace create'.", LIGHT_BLUE, BLUE),
      spacer(80),
      callout("2.", "Shell inline comments (#) in npx wrangler commands get parsed as command arguments. Example: 'npx wrangler kv namespace create WIKI_CORPUS  # copy id' fails. Run commands without trailing comments.", LIGHT_BLUE, BLUE),
      spacer(80),
      callout("3.", "wrangler kv key put defaults to LOCAL storage. Always pass --remote flag for production KV uploads.", LIGHT_BLUE, BLUE),
      spacer(80),
      callout("4.", "GitHub Actions secrets and Codespaces secrets are different stores. The sync workflow needs secrets in Actions (Settings \u2192 Secrets and variables \u2192 Actions), not Codespaces.", LIGHT_BLUE, BLUE),
      spacer(80),
      callout("5.", "wrangler secret put in non-interactive CI contexts (GitHub Actions, Claude Code) uploads an empty string as the secret value. Always run this command interactively in a terminal where you can paste the key.", "FEF3C7", "D97706"),
      spacer(80),
      callout("6.", "wrangler v3 and v4 have different kv subcommand syntax. Use wrangler@4: 'kv key put' (no colon), 'kv namespace create'. v3 uses 'kv:key put'.", LIGHT_BLUE, BLUE),
      spacer(80),
      callout("7.", "The workers.dev subdomain must be registered in the Cloudflare dashboard before the first deploy. The deploy error output contains the onboarding URL \u2014 open it in your browser, register a subdomain, then redeploy.", LIGHT_BLUE, BLUE),
      spacer(80),
      callout("8.", "The CHATBOT_ENABLED gate in the GitHub Action workflow must be a repository Variable (not a Secret). If you accidentally create it as a Secret, the workflow condition 'vars.CHATBOT_ENABLED == true' will never match.", LIGHT_BLUE, BLUE),

      spacer(200),

      // ── End ──────────────────────────────────────────────────────────────

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 480, after: 0 },
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: MID_GRAY, space: 8 } },
        children: [
          new TextRun({ text: "CWK/DFW Engineering Department  \u2022  April 2026", size: 18, font: "Arial", color: "9CA3AF", italics: true })
        ]
      })

    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const outPath = "C:\\Users\\cmarhoover\\Documents\\GitHub\\cwka-engineering.github.io\\chatbot-reference.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Written:", outPath);
});

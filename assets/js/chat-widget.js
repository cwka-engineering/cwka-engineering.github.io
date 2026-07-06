/**
 * CWK/DFW Engineering Wiki — Chat Widget
 *
 * Vanilla JS, zero dependencies.  Communicates with the Cloudflare Worker
 * backend via SSE streaming.
 */

(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Configuration
  // ---------------------------------------------------------------------------

  // The Worker URL.  In production this points to the deployed Cloudflare Worker.
  // During local development you can override via a <meta> tag:
  //   <meta name="cwk-chat-api" content="http://localhost:8787">
  const API_URL = (() => {
    const meta = document.querySelector('meta[name="cwk-chat-api"]');
    return meta
      ? meta.getAttribute("content")
      : "https://cwka-wiki-chatbot.cmarhoover.workers.dev";
  })();

  const SESSION_KEY = "cwk-chat-messages";
  const EXPAND_KEY = "cwk-chat-expanded";
  const MAX_HISTORY = 20; // max messages sent to API

  const EXPAND_ICON =
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>";
  const COLLAPSE_ICON =
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>";

  // ---------------------------------------------------------------------------
  // Lightweight Markdown → HTML (handles bold, links, inline code, lists)
  // ---------------------------------------------------------------------------

  function md(text) {
    // Escape HTML entities first
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Code blocks (``` ... ```)
    html = html.replace(/```[\s\S]*?```/g, function (match) {
      const code = match.slice(3, -3).trim();
      return "<pre><code>" + code + "</code></pre>";
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

    // Italic
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

    // Links [text](url)
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_top">$1</a>'
    );

    // Split into lines for block-level processing
    const lines = html.split("\n");
    let result = "";
    let inList = false;
    let listType = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const ulMatch = line.match(/^[-*]\s+(.*)/);
      const olMatch = line.match(/^\d+\.\s+(.*)/);

      if (ulMatch) {
        if (!inList || listType !== "ul") {
          if (inList) result += "</" + listType + ">";
          result += "<ul>";
          inList = true;
          listType = "ul";
        }
        result += "<li>" + ulMatch[1] + "</li>";
      } else if (olMatch) {
        if (!inList || listType !== "ol") {
          if (inList) result += "</" + listType + ">";
          result += "<ol>";
          inList = true;
          listType = "ol";
        }
        result += "<li>" + olMatch[1] + "</li>";
      } else {
        if (inList) {
          result += "</" + listType + ">";
          inList = false;
        }
        const trimmed = line.trim();
        if (trimmed === "") {
          // Skip empty lines between paragraphs
        } else {
          result += "<p>" + trimmed + "</p>";
        }
      }
    }
    if (inList) result += "</" + listType + ">";

    return result;
  }

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  let messages = []; // {role, content}
  let isStreaming = false;

  // Restore from sessionStorage
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) messages = JSON.parse(stored);
  } catch {
    // ignore
  }

  function saveMessages() {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
    } catch {
      // ignore quota errors
    }
  }

  // ---------------------------------------------------------------------------
  // DOM construction
  // ---------------------------------------------------------------------------

  function buildWidget() {
    // Toggle button
    const toggle = document.createElement("button");
    toggle.className = "cwk-chat-toggle";
    toggle.setAttribute("aria-label", "Open wiki assistant");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML =
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>' +
      "</svg>";

    // Chat panel
    const panel = document.createElement("div");
    panel.className = "cwk-chat-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Wiki assistant chat");

    panel.innerHTML =
      '<div class="cwk-chat-header">' +
      '  <span class="cwk-chat-header-title">Wiki Assistant</span>' +
      '  <div class="cwk-chat-header-actions">' +
      '    <button class="cwk-chat-expand" aria-label="Expand chat" aria-pressed="false">' + EXPAND_ICON + "</button>" +
      '    <button class="cwk-chat-close" aria-label="Close chat">&times;</button>' +
      "  </div>" +
      "</div>" +
      '<div class="cwk-chat-messages" role="log" aria-live="polite"></div>' +
      '<div class="cwk-chat-input-area">' +
      '  <textarea class="cwk-chat-input" placeholder="Ask a question about the wiki..." rows="1" aria-label="Your question"></textarea>' +
      '  <button class="cwk-chat-send" type="button">Send</button>' +
      "</div>";

    document.body.appendChild(toggle);
    document.body.appendChild(panel);

    // References
    const messagesEl = panel.querySelector(".cwk-chat-messages");
    const inputEl = panel.querySelector(".cwk-chat-input");
    const sendBtn = panel.querySelector(".cwk-chat-send");
    const closeBtn = panel.querySelector(".cwk-chat-close");
    const expandBtn = panel.querySelector(".cwk-chat-expand");

    // ------- Event handlers -------

    function openPanel() {
      panel.classList.add("cwk-chat-open");
      toggle.setAttribute("aria-expanded", "true");
      inputEl.focus();
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function closePanel() {
      panel.classList.remove("cwk-chat-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    function setExpanded(expanded) {
      panel.classList.toggle("cwk-chat-maximized", expanded);
      expandBtn.setAttribute("aria-pressed", expanded ? "true" : "false");
      expandBtn.setAttribute("aria-label", expanded ? "Collapse chat" : "Expand chat");
      expandBtn.innerHTML = expanded ? COLLAPSE_ICON : EXPAND_ICON;
      try {
        sessionStorage.setItem(EXPAND_KEY, expanded ? "1" : "0");
      } catch {
        // ignore quota errors
      }
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    toggle.addEventListener("click", openPanel);
    closeBtn.addEventListener("click", closePanel);
    expandBtn.addEventListener("click", function () {
      setExpanded(!panel.classList.contains("cwk-chat-maximized"));
    });

    // Restore expand preference from a previous session
    let restoredExpanded = false;
    try {
      restoredExpanded = sessionStorage.getItem(EXPAND_KEY) === "1";
    } catch {
      // ignore
    }
    if (restoredExpanded) setExpanded(true);

    // Escape key closes
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("cwk-chat-open")) {
        closePanel();
      }
    });

    // Auto-resize textarea
    inputEl.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = Math.min(this.scrollHeight, 80) + "px";
    });

    // Enter to send (Shift+Enter for newline)
    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });

    sendBtn.addEventListener("click", handleSend);

    // ------- Rendering -------

    function renderWelcome() {
      if (messages.length === 0) {
        const welcome = document.createElement("div");
        welcome.className = "cwk-chat-welcome";
        welcome.textContent =
          "Ask me anything about CWK/DFW Engineering — workflows, standards, tools, or procedures. I'll answer from the wiki and link to the relevant pages.";
        messagesEl.appendChild(welcome);
      }
    }

    function appendMessage(role, content) {
      // Remove welcome message if present
      const welcome = messagesEl.querySelector(".cwk-chat-welcome");
      if (welcome) welcome.remove();

      const div = document.createElement("div");
      div.className =
        "cwk-chat-message cwk-chat-message-" + role;

      if (role === "assistant") {
        div.innerHTML = md(content);
      } else {
        div.textContent = content;
      }

      messagesEl.appendChild(div);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return div;
    }

    function appendError(text) {
      const div = document.createElement("div");
      div.className = "cwk-chat-error";
      div.textContent = text;
      messagesEl.appendChild(div);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    // ------- Streaming -------

    async function handleSend() {
      const text = inputEl.value.trim();
      if (!text || isStreaming) return;

      // Add user message
      messages.push({ role: "user", content: text });
      saveMessages();
      appendMessage("user", text);

      inputEl.value = "";
      inputEl.style.height = "auto";
      isStreaming = true;
      sendBtn.disabled = true;

      // Create assistant bubble for streaming
      const assistantDiv = appendMessage("assistant", "");
      let fullText = "";

      try {
        const response = await fetch(API_URL + "/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: messages.slice(-MAX_HISTORY),
          }),
        });

        if (!response.ok) {
          let errMsg = "Something went wrong. Please try again.";
          try {
            const errBody = await response.json();
            if (errBody.error) errMsg = errBody.error;
          } catch {
            // ignore parse errors
          }
          throw new Error(errMsg);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullText += parsed.text;
                assistantDiv.innerHTML = md(fullText);
                messagesEl.scrollTop = messagesEl.scrollHeight;
              }
            } catch {
              // skip
            }
          }
        }

        // Save completed message
        messages.push({ role: "assistant", content: fullText });
        saveMessages();
      } catch (err) {
        appendError(err.message || "Connection error. Please try again.");
        // Remove the empty assistant bubble on error
        if (!fullText) assistantDiv.remove();
      } finally {
        isStreaming = false;
        sendBtn.disabled = false;
        inputEl.focus();
      }
    }

    // ------- Init -------

    // Render existing messages from session
    renderWelcome();
    for (const msg of messages) {
      appendMessage(msg.role, msg.content);
    }
  }

  // ---------------------------------------------------------------------------
  // Bootstrap — wait for DOM
  // ---------------------------------------------------------------------------

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildWidget);
  } else {
    buildWidget();
  }
})();

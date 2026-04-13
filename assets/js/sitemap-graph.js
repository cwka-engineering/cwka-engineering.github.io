/**
 * Interactive wiki sitemap — D3.js v7 force-directed graph.
 *
 * Expects window.__SITEMAP_GRAPH_DATA__ = { nodes: [...], edges: [...] }
 * injected by Jekyll from _data/sitemap-graph.json.
 */
(function () {
  "use strict";

  const data = window.__SITEMAP_GRAPH_DATA__;
  if (!data || !data.nodes || !data.edges) return;

  // ── Colour palette by section ───────────────────────────────────────────
  const SECTION_COLORS = {
    Home: "#6366f1",
    Overview: "#3b82f6",
    Workflows: "#22c55e",
    Standards: "#f59e0b",
    Tools: "#a855f7",
  };
  const DEFAULT_COLOR = "#94a3b8";
  const EDGE_COLOR = "#9ca3af"; // explicit gray — CSS vars unreliable for SVG

  function color(section) {
    return SECTION_COLORS[section] || DEFAULT_COLOR;
  }

  // ── Container setup ─────────────────────────────────────────────────────
  const container = document.getElementById("sitemap-graph");
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // Controls bar
  const controls = document.createElement("div");
  controls.className = "sitemap-controls";

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset View";
  controls.appendChild(resetBtn);

  const labelToggle = document.createElement("label");
  const labelCb = document.createElement("input");
  labelCb.type = "checkbox";
  labelToggle.appendChild(labelCb);
  labelToggle.appendChild(document.createTextNode(" All Labels"));
  controls.appendChild(labelToggle);

  container.appendChild(controls);

  // Legend
  const legend = document.createElement("div");
  legend.className = "sitemap-legend";
  for (const [name, col] of Object.entries(SECTION_COLORS)) {
    const item = document.createElement("span");
    item.className = "sitemap-legend-item";
    item.innerHTML =
      '<span class="sitemap-legend-swatch" style="background:' +
      col +
      '"></span>' +
      name;
    legend.appendChild(item);
  }
  container.appendChild(legend);

  // Tooltip
  const tooltip = document.createElement("div");
  tooltip.className = "sitemap-tooltip";
  container.appendChild(tooltip);

  // ── D3 graph ────────────────────────────────────────────────────────────
  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const g = svg.append("g");

  // Zoom
  const zoom = d3
    .zoom()
    .scaleExtent([0.15, 5])
    .on("zoom", (event) => g.attr("transform", event.transform));
  svg.call(zoom);

  resetBtn.addEventListener("click", () => {
    svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
  });

  // Node radius scale
  const degreeExtent = d3.extent(data.nodes, (d) => d.degree);
  const rScale = d3
    .scaleSqrt()
    .domain([degreeExtent[0] || 0, degreeExtent[1] || 1])
    .range([6, 22]);

  // Build adjacency lookup
  const adjacency = new Map();
  data.nodes.forEach((n) => adjacency.set(n.id, new Set()));
  data.edges.forEach((e) => {
    adjacency.get(e.source)?.add(e.target);
    adjacency.get(e.target)?.add(e.source);
  });

  // Only show permanent labels for top ~15 nodes
  const LABEL_DEGREE_THRESHOLD = 10;

  // ── Simulation ──────────────────────────────────────────────────────────
  // Balanced: enough repulsion to spread nodes, gentle gravity to keep it centered
  const simulation = d3
    .forceSimulation(data.nodes)
    .force(
      "link",
      d3
        .forceLink(data.edges)
        .id((d) => d.id)
        .distance(70)
    )
    .force("charge", d3.forceManyBody().strength(-260))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("x", d3.forceX(width / 2).strength(0.03))
    .force("y", d3.forceY(height / 2).strength(0.03))
    .force(
      "collide",
      d3.forceCollide().radius((d) => rScale(d.degree) + 8).strength(0.8)
    );

  // ── Links ───────────────────────────────────────────────────────────────
  const link = g
    .append("g")
    .selectAll("line")
    .data(data.edges)
    .join("line")
    .attr("stroke", EDGE_COLOR)
    .attr("stroke-width", 1)
    .attr("stroke-opacity", 0.3);

  // ── Nodes ───────────────────────────────────────────────────────────────
  const node = g
    .append("g")
    .selectAll("circle")
    .data(data.nodes)
    .join("circle")
    .attr("class", "sitemap-node")
    .attr("r", (d) => rScale(d.degree))
    .attr("fill", (d) => color(d.section))
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .call(drag(simulation));

  // ── Labels ──────────────────────────────────────────────────────────────
  const labels = g
    .append("g")
    .selectAll("text")
    .data(data.nodes)
    .join("text")
    .attr("class", "sitemap-label")
    .attr("dy", (d) => rScale(d.degree) + 13)
    .text((d) => d.title)
    .style("font-size", (d) => (d.degree >= 20 ? "10px" : "8px"))
    .attr("visibility", (d) =>
      d.degree >= LABEL_DEGREE_THRESHOLD ? "visible" : "hidden"
    );

  let showAllLabels = false;

  function updateLabelVisibility() {
    labels.attr("visibility", (d) =>
      showAllLabels || d.degree >= LABEL_DEGREE_THRESHOLD
        ? "visible"
        : "hidden"
    );
  }

  labelCb.addEventListener("change", () => {
    showAllLabels = labelCb.checked;
    updateLabelVisibility();
  });

  // ── Hover highlighting ──────────────────────────────────────────────────
  node
    .on("mouseover", function (event, d) {
      const neighbours = adjacency.get(d.id) || new Set();

      node.attr("opacity", (o) =>
        o.id === d.id || neighbours.has(o.id) ? 1 : 0.12
      );
      link
        .attr("stroke-opacity", (l) =>
          l.source.id === d.id || l.target.id === d.id ? 0.7 : 0.03
        )
        .attr("stroke-width", (l) =>
          l.source.id === d.id || l.target.id === d.id ? 2 : 1
        );

      // Reveal labels for hovered cluster
      labels
        .attr("visibility", (o) =>
          o.id === d.id || neighbours.has(o.id) ? "visible" : "hidden"
        )
        .attr("opacity", (o) =>
          o.id === d.id || neighbours.has(o.id) ? 1 : 0
        );

      tooltip.style.opacity = "1";
      tooltip.textContent = d.title + "  \u2014  " + d.degree + " connections";
    })
    .on("mousemove", function (event) {
      const rect = container.getBoundingClientRect();
      tooltip.style.left = event.clientX - rect.left + 14 + "px";
      tooltip.style.top = event.clientY - rect.top - 10 + "px";
    })
    .on("mouseout", function () {
      node.attr("opacity", 1);
      link.attr("stroke-opacity", 0.3).attr("stroke-width", 1);
      labels.attr("opacity", 1);
      updateLabelVisibility();
      tooltip.style.opacity = "0";
    });

  // ── Click to navigate ───────────────────────────────────────────────────
  node.on("click", function (event, d) {
    window.location.href = d.id;
  });

  // ── Tick ────────────────────────────────────────────────────────────────
  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    labels.attr("x", (d) => d.x).attr("y", (d) => d.y);
  });

  // ── Drag ────────────────────────────────────────────────────────────────
  function drag(sim) {
    return d3
      .drag()
      .on("start", (event, d) => {
        if (!event.active) sim.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) sim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });
  }

  // ── Responsive resize ──────────────────────────────────────────────────
  window.addEventListener("resize", () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    svg.attr("viewBox", [0, 0, w, h]);
    simulation.force("center", d3.forceCenter(w / 2, h / 2));
    simulation.force("x", d3.forceX(w / 2).strength(0.03));
    simulation.force("y", d3.forceY(h / 2).strength(0.03));
    simulation.alpha(0.3).restart();
  });

  // ── Auto-fit after simulation settles ──────────────────────────────────
  simulation.on("end", () => {
    const xs = data.nodes.map((d) => d.x);
    const ys = data.nodes.map((d) => d.y);
    const pad = 40;
    const x0 = Math.min(...xs) - pad;
    const y0 = Math.min(...ys) - pad;
    const x1 = Math.max(...xs) + pad;
    const y1 = Math.max(...ys) + pad;
    const bw = x1 - x0;
    const bh = y1 - y0;
    const scale = Math.min(width / bw, height / bh, 1.5);
    const tx = (width - bw * scale) / 2 - x0 * scale;
    const ty = (height - bh * scale) / 2 - y0 * scale;

    svg
      .transition()
      .duration(800)
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(tx, ty).scale(scale)
      );
  });
})();

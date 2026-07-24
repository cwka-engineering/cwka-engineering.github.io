/* assets/js/org-viz.js
 * CWK / DFW — Department collaboration map, v2
 * Vanilla JS, no dependencies
 */
(function () {
  'use strict';

  /* ─── DATA ─────────────────────────────────────────────────────────────── */
  /* Injected by onboarding/how-we-work.md via Liquid jsonify from _data/departments.yml */
  var D      = window.ORG_DATA;
  var SHORTS = D.shorts;

  /* ─── COLORS ────────────────────────────────────────────────────────────── */
  var C = {
    S:    {bg:'#1B4332', fg:'#D8F3DC', ac:'#95D5B2'},
    PC:   {bg:'#3A0CA3', fg:'#E2D9F3', ac:'#B8A9E8'},
    PM:   {bg:'#0B3D91', fg:'#D6E4F0', ac:'#7EB0D5'},
    E:    {bg:'#9D0208', fg:'#FADBD8', ac:'#E07C7C'},
    PUR:  {bg:'#7B2D26', fg:'#F5E6E0', ac:'#D4A59A'},
    PROD: {bg:'#3D405B', fg:'#E8E8ED', ac:'#A8A8C0'},
    SR:   {bg:'#5A3E1B', fg:'#F0E6D3', ac:'#C4A97D'},
    FIN:  {bg:'#14532D', fg:'#D1FAE5', ac:'#6EE7B7'},
    HR:   {bg:'#6B21A8', fg:'#F3E8FF', ac:'#C084FC'},
    EX:   {bg:'#1E1E1E', fg:'#F0F0F0', ac:'#A0A0A0'}
  };

  /* ─── POSITIONS (circular layout) ──────────────────────────────────────── */
  var POS = (function () {
    var codes = ['S','PC','PM','E','PUR','PROD','SR','FIN','HR','EX'];
    var cx = 300, cy = 262, r = 190, p = {};
    codes.forEach(function (c, i) {
      var a = (2 * Math.PI * i / codes.length) - Math.PI / 2;
      p[c] = {x: Math.round(cx + r * Math.cos(a)), y: Math.round(cy + r * Math.sin(a))};
    });
    return p;
  }());

  /* ─── STATE ─────────────────────────────────────────────────────────────── */
  var sel = null;

  /* ─── HELPERS ───────────────────────────────────────────────────────────── */
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getHL(code) {
    var s = {};
    s[code] = true;
    D.edges.forEach(function (e) {
      if (e.source === code) s[e.target] = true;
      if (e.target === code) s[e.source] = true;
    });
    return s;
  }

  function maxWeight() {
    var m = 0;
    D.edges.forEach(function (e) { if (e.weight > m) m = e.weight; });
    return m;
  }

  /* ─── SVG ───────────────────────────────────────────────────────────────── */
  function buildSVG() {
    var hl = sel ? getHL(sel) : {};
    var mw = maxWeight();
    var html = '';

    /* edges */
    D.edges.forEach(function (e) {
      var p1 = POS[e.source], p2 = POS[e.target];
      if (!p1 || !p2) return;
      var isHl = sel && hl[e.source] && hl[e.target];
      var op = sel ? (isHl ? 0.85 : 0.05) : Math.max(0.07, e.weight / mw * 0.5);
      var w  = Math.max(1, e.weight / mw * 8);
      var stroke = isHl ? C[sel].ac : '#bbb';
      html += '<line x1="' + p1.x + '" y1="' + p1.y + '" x2="' + p2.x + '" y2="' + p2.y +
              '" stroke="' + stroke + '" stroke-width="' + (isHl ? w + 1 : w) +
              '" opacity="' + op.toFixed(2) + '" stroke-linecap="round"/>';
    });

    /* weight labels on highlighted edges */
    if (sel) {
      D.edges.forEach(function (e) {
        if (!hl[e.source] || !hl[e.target]) return;
        var p1 = POS[e.source], p2 = POS[e.target];
        var mx = Math.round((p1.x + p2.x) / 2);
        var my = Math.round((p1.y + p2.y) / 2);
        html += '<text x="' + mx + '" y="' + my + '" text-anchor="middle" dy="-5"' +
                ' fill="' + C[sel].ac + '" font-size="11" font-family="monospace"' +
                ' font-weight="600" opacity="0.9">' + e.weight + '</text>';
      });
    }

    /* nodes */
    Object.keys(POS).forEach(function (code) {
      var p    = POS[code];
      var dept = D.departments[code];
      var isSel = sel === code;
      var isHl  = !sel || hl[code];
      var c    = C[code];
      var nr   = isSel ? 50 : 44;
      var op   = (!sel || isHl) ? 1 : 0.2;
      var pri  = dept.tasks.filter(function (t) { return t.level === 1; }).length;
      var shortName = SHORTS[code] || '';

      var glow = isSel
        ? '<circle cx="' + p.x + '" cy="' + p.y + '" r="' + (nr + 5) +
          '" fill="none" stroke="' + c.ac + '" stroke-width="2" opacity="0.45"/>'
        : '';
      var ring = '<circle cx="' + p.x + '" cy="' + p.y + '" r="' + nr +
                 '" fill="' + c.bg + '" stroke="' + (isSel ? c.ac : 'rgba(0,0,0,0.08)') +
                 '" stroke-width="' + (isSel ? 2.5 : 1) + '"/>';
      var lbl  = '<text x="' + p.x + '" y="' + (p.y - 9) +
                 '" text-anchor="middle" fill="' + c.fg +
                 '" font-size="13" font-weight="700" font-family="monospace">' + code + '</text>';
      var sub  = '<text x="' + p.x + '" y="' + (p.y + 5) +
                 '" text-anchor="middle" fill="' + c.fg +
                 '" font-size="8" font-family="monospace" opacity="0.75">' + shortName + '</text>';
      var cnt  = '<text x="' + p.x + '" y="' + (p.y + 17) +
                 '" text-anchor="middle" fill="' + c.ac +
                 '" font-size="8" font-family="monospace">' + pri + '</text>';
      /* role indicator dot for E */
      var dot  = dept.roles
        ? '<circle cx="' + (p.x + nr - 7) + '" cy="' + (p.y - nr + 7) +
          '" r="5" fill="' + c.ac + '" opacity="0.9"/>'
        : '';

      html += '<g class="oviz-node" data-code="' + code +
              '" style="cursor:pointer;opacity:' + op + ';transition:opacity 0.2s">' +
              glow + ring + lbl + sub + cnt + dot + '</g>';
    });

    return html;
  }

  /* ─── PANEL ─────────────────────────────────────────────────────────────── */
  function buildPanel(code) {
    var dept = D.departments[code];
    var c    = C[code];
    var pri  = dept.tasks.filter(function (t) { return t.level === 1; });
    var sup  = dept.tasks.filter(function (t) { return t.level === 2; });

    /* top collaborators */
    var collabs = D.edges
      .filter(function (e) { return e.source === code || e.target === code; })
      .map(function (e) {
        return {partner: e.source === code ? e.target : e.source, weight: e.weight};
      })
      .sort(function (a, b) { return b.weight - a.weight; })
      .slice(0, 6);

    var chips = collabs.map(function (cl) {
      var cc = C[cl.partner];
      return '<span class="oviz-chip" style="background:' + cc.bg + ';color:' + cc.fg + '">' +
             cl.partner + '<span class="oviz-chip-weight"> ×' + cl.weight + '</span></span>';
    }).join('');

    /* renamed-department note */
    var renamedNote = '';
    if (code === 'PUR')  renamedNote = '<div class="oviz-renamed">Formerly: Supply Chain (SC)</div>';
    if (code === 'PROD') renamedNote = '<div class="oviz-renamed">Formerly: Operations (OPS)</div>';

    /* roles section — split into permanent leadership positions vs. ad hoc transient designations */
    var roleSection = '';
    if (dept.roles && dept.roles.length) {
      function roleItem(role) {
        return '<div class="oviz-role-item">' +
               '<span class="oviz-role-badge" style="background:' + c.bg +
               ';color:' + c.fg + ';border:1px solid ' + c.ac + '">' + role.code + '</span>' +
               '<div><div class="oviz-role-name">' + esc(role.name) + '</div>' +
               '<div class="oviz-role-note">' + esc(role.note) + '</div></div>' +
               '</div>';
      }
      var leadership = dept.roles.filter(function (r) { return r.type === 'leadership'; });
      var transient  = dept.roles.filter(function (r) { return r.type !== 'leadership'; });
      if (leadership.length) {
        roleSection += '<div class="oviz-section-label">Leadership</div>' +
                        '<div class="oviz-roles">' + leadership.map(roleItem).join('') + '</div>';
      }
      if (transient.length) {
        roleSection += '<div class="oviz-section-label">Transient Designations</div>' +
                        '<div class="oviz-roles">' + transient.map(roleItem).join('') + '</div>';
      }
    }

    /* task list */
    function taskRow(t, isSupport) {
      var collab = (t.collab && t.collab !== '' && t.collab !== '-')
        ? '<div class="oviz-task-collab">with ' + esc(t.collab) + '</div>' : '';
      return '<div class="oviz-task-item' + (isSupport ? ' oviz-task-support' : '') + '">' +
             '<span class="oviz-dot' + (isSupport ? ' oviz-dot-sup' : '') +
             '" style="' + (isSupport ? 'border-color:' + c.ac : 'background:' + c.ac) + '"></span>' +
             '<div class="oviz-task-text">' + esc(t.task) + collab + '</div>' +
             '</div>';
    }

    var taskHTML = pri.map(function (t) { return taskRow(t, false); }).join('');
    if (sup.length) {
      taskHTML += '<div class="oviz-section-label oviz-sup-label">Supporting Role</div>';
      taskHTML += sup.map(function (t) { return taskRow(t, true); }).join('');
    }

    return '<div class="oviz-panel-header" style="background:' + c.bg +
           ';border-bottom:1px solid ' + c.ac + '44">' +
           '<div style="display:flex;justify-content:flex-end;padding:6px 10px 0">' +
           '<button class="oviz-close-btn">✕ close</button>' +
           '</div>' +
           '<div class="oviz-panel-title">' +
           '<span class="oviz-panel-code" style="color:' + c.fg + '">' + code + '</span>' +
           '<span class="oviz-panel-name" style="color:' + c.ac + '">' + esc(dept.name) + '</span>' +
           '</div>' +
           renamedNote +
           '<div class="oviz-panel-counts">' +
           '<span style="color:' + c.fg + '">' + pri.length + ' primary</span>' +
           '<span style="color:' + c.ac + ';opacity:0.7"> · ' + sup.length + ' supporting</span>' +
           '</div>' +
           '</div>' +
           '<div class="oviz-panel-body">' +
           '<div class="oviz-section-label">Top Collaborators</div>' +
           '<div class="oviz-chips">' + chips + '</div>' +
           roleSection +
           '<div class="oviz-section-label">Responsibilities</div>' +
           '<div class="oviz-tasks">' + taskHTML + '</div>' +
           '</div>';
  }

  /* ─── LEGEND ────────────────────────────────────────────────────────────── */
  function buildLegend() {
    var sorted = D.edges.slice().sort(function (a, b) { return b.weight - a.weight; }).slice(0, 8);

    var pairs = sorted.map(function (e) {
      var cs = C[e.source], ct = C[e.target];
      return '<div class="oviz-pair">' +
             '<span class="oviz-pair-chip" style="background:' + cs.bg + ';color:' + cs.fg + '">' + e.source + '</span>' +
             '<span class="oviz-pair-sep">⟷</span>' +
             '<span class="oviz-pair-chip" style="background:' + ct.bg + ';color:' + ct.fg + '">' + e.target + '</span>' +
             '<span class="oviz-pair-w">' + e.weight + '</span>' +
             '</div>';
    }).join('');

    var depts = Object.keys(D.departments).map(function (code) {
      var c   = C[code];
      var pri = D.departments[code].tasks.filter(function (t) { return t.level === 1; }).length;
      return '<div class="oviz-dept-chip" data-code="' + code +
             '" style="background:' + c.bg + ';border:1px solid ' + c.ac + '22">' +
             '<div class="oviz-dept-code" style="color:' + c.fg + '">' + code + '</div>' +
             '<div class="oviz-dept-count" style="color:' + c.ac + '">' + pri + ' tasks</div>' +
             '</div>';
    }).join('');

    return '<div class="oviz-section-label" style="margin-top:20px">Strongest Collaboration Pairs</div>' +
           '<div class="oviz-pairs-grid">' + pairs + '</div>' +
           '<div class="oviz-section-label" style="margin-top:16px">All Departments</div>' +
           '<div class="oviz-dept-grid">' + depts + '</div>';
  }

  /* ─── RENDER ────────────────────────────────────────────────────────────── */
  function render() {
    var svgEl    = document.getElementById('oviz-svg');
    var panelEl  = document.getElementById('oviz-panel');
    var legendEl = document.getElementById('oviz-legend');
    var labelEl  = document.getElementById('oviz-netlabel');
    var bodyEl   = document.getElementById('oviz-body');
    if (!svgEl) return;

    svgEl.innerHTML = buildSVG();

    if (labelEl) {
      labelEl.textContent = sel
        ? D.departments[sel].name + ' — Collaboration Network'
        : 'Department Network — click a node to explore';
    }

    if (sel) {
      if (panelEl) { panelEl.innerHTML = buildPanel(sel); panelEl.hidden = false; }
      if (legendEl) { legendEl.innerHTML = ''; }
      if (bodyEl) bodyEl.classList.add('oviz-has-sel');
    } else {
      if (panelEl) { panelEl.innerHTML = ''; panelEl.hidden = true; }
      if (legendEl) { legendEl.innerHTML = buildLegend(); }
      if (bodyEl) bodyEl.classList.remove('oviz-has-sel');
    }
  }

  /* ─── SELECT ────────────────────────────────────────────────────────────── */
  function selectNode(code, writeHash) {
    sel = code;
    render();
    if (writeHash !== false) {
      if (code) {
        history.replaceState(null, '', location.pathname + location.search + '#' + code);
      } else {
        history.replaceState(null, '', location.pathname + location.search);
      }
    }
  }

  /* ─── INIT ──────────────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('org-viz-root');
    if (!root) return;

    var total = 0;
    var keys = Object.keys(D.departments);
    keys.forEach(function (k) { total += D.departments[k].tasks.length; });

    root.innerHTML =
      '<div class="oviz-meta">' +
        keys.length + ' departments &nbsp;·&nbsp; ' + total + ' responsibilities &nbsp;·&nbsp; ' + D.edges.length + ' collaboration links' +
      '</div>' +
      '<div id="oviz-netlabel" class="oviz-netlabel">Department Network — click a node to explore</div>' +
      '<div id="oviz-body" class="oviz-body">' +
        '<div class="oviz-net-wrap">' +
          '<svg id="oviz-svg" viewBox="0 0 600 520" style="width:100%;height:auto;display:block"></svg>' +
        '</div>' +
        '<div id="oviz-panel" class="oviz-panel" hidden></div>' +
      '</div>' +
      '<div id="oviz-legend" class="oviz-legend"></div>';

    /* event delegation — SVG node clicks */
    document.getElementById('oviz-svg').addEventListener('click', function (e) {
      var g = e.target.closest('.oviz-node');
      if (g) selectNode(sel === g.getAttribute('data-code') ? null : g.getAttribute('data-code'));
    });

    /* event delegation — panel close button */
    document.getElementById('oviz-panel').addEventListener('click', function (e) {
      if (e.target.closest('.oviz-close-btn')) selectNode(null);
    });

    /* event delegation — legend dept chips */
    document.getElementById('oviz-legend').addEventListener('click', function (e) {
      var chip = e.target.closest('.oviz-dept-chip');
      if (chip) selectNode(chip.getAttribute('data-code'));
    });

    render();

    /* hash-based deep linking */
    var hash = location.hash.slice(1).toUpperCase();
    if (hash && D.departments[hash]) selectNode(hash, false);

    window.addEventListener('hashchange', function () {
      var h = location.hash.slice(1).toUpperCase();
      selectNode(D.departments[h] ? h : null, false);
    });
  });

}());

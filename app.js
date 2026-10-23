/* Estúdio Augusto Fonte — monta a página a partir de courses.js */
(function () {
  "use strict";
  var S = window.SITE, C = window.COURSES, FAQ = window.FAQ_GERAL;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var open = C.filter(function (c) { return c.status === "aberto"; });
  var soon = C.filter(function (c) { return c.status === "em-breve"; });

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function mins(d) { var p = d.split(":"); return +p[0] + (+p[1]) / 60; }
  function fmt(totalMin) { var h = Math.floor(totalMin / 60), m = Math.round(totalMin % 60); return h ? h + "h" + (m < 10 ? "0" + m : m) : m + " min"; }
  function lessonsOf(c) { return c.modules.reduce(function (a, m) { return a.concat(m.lessons); }, []); }
  function minutesOf(c) { return lessonsOf(c).reduce(function (a, l) { return a + mins(l.dur); }, 0); }
  function link(c) { return c.checkout || S.fallbackCta; }
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" opacity=".25"/><path d="M7 12.5l3.2 3.2L17 8.8"/></svg>';
  var CHEV = '<svg class="les__ch" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  /* ---------- Logo em contorno com brilho correndo ---------- */
  var STAR = [
    "M245.32,0h-34.48c0,116.27-94.59,210.86-210.84,210.86v34.48c116.25,0,210.84,94.59,210.84,210.86h34.48c0-116.27,94.57-210.86,210.84-210.86v-34.48c-116.27,0-210.84-94.59-210.84-210.86ZM228.08,365.86c-24.94-62.74-75.02-112.82-137.74-137.76,62.72-24.91,112.8-75.02,137.74-137.74,24.94,62.72,75.02,112.82,137.74,137.74-62.72,24.94-112.8,75.02-137.74,137.76Z",
    "M140.65,451.36c-12.48-2.91-24.48-7.11-35.82-12.48-7.37-44.72-42.78-80.13-87.5-87.48-5.34-11.36-9.57-23.34-12.48-35.82,73.75,2.5,133.28,62.03,135.8,135.78Z",
    "M451.36,315.58c-2.91,12.48-7.13,24.44-12.48,35.8v.02c-44.76,7.33-80.19,42.74-87.54,87.5-11.34,5.34-23.34,9.57-35.82,12.48,2.52-73.77,62.07-133.32,135.84-135.8Z",
    "M140.65,4.85c-2.5,73.77-62.03,133.3-135.8,135.8,2.91-12.48,7.13-24.48,12.48-35.82,44.72-7.37,80.13-42.78,87.5-87.5,11.34-5.34,23.34-9.57,35.82-12.48Z",
    "M451.36,140.65c-73.79-2.48-133.34-62.03-135.84-135.82,12.48,2.93,24.48,7.13,35.82,12.48,7.35,44.76,42.78,80.19,87.54,87.52,5.34,11.34,9.57,23.34,12.48,35.82Z"
  ];
  $$("[data-star]").forEach(function (svg, i) {
    var o = "", g = "";
    STAR.forEach(function (d) {
      o += '<path class="o" d="' + d + '"/>';
      g += '<path class="g" pathLength="100" d="' + d + '" style="animation-delay:' + (-i * 1.7) + 's"/>';
    });
    svg.innerHTML = o + g;
  });

  /* ---------- Números do topo (calculados) ---------- */
  var totalL = 0, totalM = 0, totalP = 0;
  open.forEach(function (c) { totalL += lessonsOf(c).length; totalM += minutesOf(c); });
  $("#stats").innerHTML =
    '<div><dt>cursos no ar</dt><dd>' + open.length + '</dd></div>' +
    '<div><dt>aulas curtas</dt><dd>' + totalL + '</dd></div>' +
    '<div><dt>de conteúdo</dt><dd>' + fmt(totalM) + '</dd></div>' +
    (soon.length ? '<div><dt>em planejamento</dt><dd>' + soon.length + '</dd></div>' : "");

  /* ---------- Vídeos: carregam e tocam só quando visíveis ---------- */
  var vio = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) {
        if (v.dataset.src && !v.getAttribute("src")) v.src = v.dataset.src;
        if (!v.dataset.hold && !reduce) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      } else { v.pause(); }
    });
  }, { threshold: .35 }) : null;
  function watch(v) { if (vio) vio.observe(v); else if (v.dataset.src) v.src = v.dataset.src; }

  /* ---------- Palco do hero: copy → criativo → motion ---------- */
  (function stage() {
    var tabs = $$("#stage [role=tab]"), scenes = $$("#stage .scene"), bar = $("#stageBar"), cap = $("#stageCap");
    var caps = [
      "A copy vem primeiro: headline, sub e chamada, separadas antes de abrir qualquer ferramenta.",
      "Com a copy lida, o criativo nasce no Figma e a imagem sai da IA com direção.",
      "E o estático ganha movimento: aqui, uma peça feita só conversando com o Claude."
    ];
    var vid = $("video", scenes[2]), cur = 0, t0 = 0, raf = 0, paused = false, DUR = 5200, visible = true;
    function go(i) {
      cur = i; t0 = performance.now();
      tabs.forEach(function (b, k) { b.setAttribute("aria-selected", k === i); });
      scenes.forEach(function (s, k) { s.classList.toggle("is-on", k === i); });
      cap.textContent = caps[i];
      if (i === 2) { if (!vid.src) vid.src = vid.dataset.src; vid.currentTime = 0; if (!reduce) { var p = vid.play(); if (p && p.catch) p.catch(function () {}); } } else vid.pause();
    }
    function tick(now) {
      if (!paused && visible && !reduce) {
        var p = Math.min(1, (now - t0) / DUR);
        bar.style.width = p * 100 + "%";
        if (p >= 1) go((cur + 1) % 3);
      } else if (paused || !visible) { t0 += 16; }
      raf = requestAnimationFrame(tick);
    }
    tabs.forEach(function (b, k) { b.addEventListener("click", function () { go(k); }); b.setAttribute("role", "tab"); });
    var st = $("#stage");
    st.addEventListener("mouseenter", function () { paused = true; });
    st.addEventListener("mouseleave", function () { paused = false; });
    st.addEventListener("focusin", function () { paused = true; });
    st.addEventListener("focusout", function () { paused = false; });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }, { threshold: .1 }).observe(st);
    go(0); raf = requestAnimationFrame(tick);
  })();

  /* ---------- Cards de curso ---------- */
  var cards = $("#courseCards");
  C.forEach(function (c) {
    var card = el("article", { class: "course" + (c.status === "em-breve" ? " course--soon" : ""), style: "--a:" + c.accent });
    if (c.status === "em-breve") {
      card.innerHTML = '<div class="course__body"><svg class="soon__star" viewBox="0 0 456.21 456.21" aria-hidden="true"><use href="#star"/></svg><span class="tag">Em planejamento</span><h3>' + esc(c.title) + '</h3><p class="course__tag">' + esc(c.pitch) + '</p></div>';
      if (open.length % 2 === 0) card.classList.add("span");
      cards.appendChild(card); return;
    }
    var media = c.media.type === "video"
      ? '<div class="course__media course__media--video"><video muted loop playsinline preload="none" data-src="' + c.media.src + '" poster="' + c.media.poster + '" aria-label="Exemplo de motion do curso"></video></div>'
      : '<div class="course__media"><div class="pair">' + c.media.src.map(function (s) { return '<img src="' + s + '" alt="Exemplo de criativo feito no curso" loading="lazy">'; }).join("") + "</div></div>";
    card.innerHTML = media +
      '<div class="course__body">' +
      '<div><div class="course__title"><h3>' + esc(c.title) + '</h3>' + (c.co ? '<span class="course__co">' + esc(c.co) + '</span>' : "") + '</div></div>' +
      '<p class="course__tag">' + esc(c.pitch) + "</p>" +
      '<ul class="meta"><li>' + lessonsOf(c).length + ' aulas</li><li>' + fmt(minutesOf(c)) + '</li><li>' + esc(c.pdfsLabel) + "</li></ul>" +
      '<ul class="ticks">' + c.outcomes.map(function (o) { return "<li>" + CHECK + "<span>" + esc(o) + "</span></li>"; }).join("") + "</ul>" +
      '<div class="course__foot"><div class="price"><b>' + esc(c.price) + '</b><span>' + esc(c.priceNote) + '</span></div>' +
      '<div class="course__links"><a class="btn btn--line" href="#aulas" data-open="' + c.id + '">Ver as aulas</a>' +
      '<a class="btn" href="' + link(c) + '" target="_blank" rel="noopener">Quero este curso</a></div></div></div>';
    cards.appendChild(card);
    var v = $("video", card); if (v) watch(v);
  });
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); cio.unobserve(e.target); } }); }, { threshold: .3 });
    $$(".course").forEach(function (c) { cio.observe(c); });
  } else $$(".course").forEach(function (c) { c.classList.add("in"); });

  /* ---------- Por onde começar ---------- */
  var GOALS = [
    { id: "g1", label: "Sou designer ou social media", why: "Organize primeiro o processo da peça estática: copy, referência, identidade e formato. Depois leve o mesmo olhar para o movimento.", stops: [["criativos", "Comece aqui. É a base de copy, referência e identidade que o motion também usa."], ["motion", "Depois, anime o que você já sabe produzir."]] },
    { id: "g2", label: "Já crio criativos e quero animar", why: "Você já tem o ofício. Vá direto para o motion e use o de criativos depois, para refinar copy e identidade.", stops: [["motion", "Comece aqui. Do briefing ao MP4, sem entender de edição."], ["criativos", "Depois, para afiar copy, hierarquia e imagem com IA."]] },
    { id: "g3", label: "Tenho um negócio e quero anunciar", why: "Primeiro uma peça que vende. Depois, essa mesma peça em movimento para Reels, Stories e Status.", stops: [["criativos", "Comece aqui. Anúncios claros, com a sua marca, sem depender de agência."], ["motion", "Depois, promo animada do seu produto ou serviço."]] }
  ];
  var goalsEl = $("#goals"), pathEl = $("#path");
  function byId(id) { return C.filter(function (c) { return c.id === id; })[0]; }
  function showGoal(g) {
    $$(".goal", goalsEl).forEach(function (b) { b.setAttribute("aria-checked", b.dataset.id === g.id); });
    var stops = g.stops.filter(function (s) { return byId(s[0]) && byId(s[0]).status === "aberto"; });
    pathEl.innerHTML = '<p class="path__why">' + esc(g.why) + '</p><div class="path__rail" style="--n:' + stops.length + '">' +
      stops.map(function (s, i) { var c = byId(s[0]); return '<div class="path__stop' + (i ? " is-later" : " on") + '" style="--c:' + c.accent + '"><b>' + esc(c.title) + "</b><span>" + esc(s[1]) + "</span></div>"; }).join("") + "</div>";
  }
  GOALS.forEach(function (g, i) {
    var b = el("button", { class: "goal", role: "radio", "aria-checked": "false", "data-id": g.id }, esc(g.label));
    b.addEventListener("click", function () { showGoal(g); });
    goalsEl.appendChild(b);
  });
  showGoal(GOALS[0]);

  /* ---------- Aulas (abas + acordeão) ---------- */
  var tabsEl = $("#courseTabs"), syl = $("#syllabus");
  function renderSyl(c) {
    var n = 0;
    syl.style.setProperty("--a", c.accent);
    syl.innerHTML = '<div class="syl" style="--a:' + c.accent + '"><div class="syl__top"><span>' + lessonsOf(c).length + " aulas</span><span>" + fmt(minutesOf(c)) + "</span><span>" + esc(c.pdfsLabel) + "</span></div>" +
      c.modules.map(function (m) {
        return '<div class="mod glass"><div class="mod__t"><span>' + esc(m.title) + "</span><small>" + m.lessons.length + (m.lessons.length > 1 ? " aulas" : " aula") + "</small></div>" +
          m.lessons.map(function (l) {
            n++; var id = "l" + c.id + n;
            return '<div class="les"><button class="les__b" aria-expanded="false" aria-controls="' + id + '"><span class="les__n">' + n + '</span><span class="les__ti">' + esc(l.title) + '</span><span class="les__d">' + esc(l.dur) + "</span>" + CHEV + "</button>" +
              '<div class="les__p" id="' + id + '" role="region"><div><div class="les__in"><p>' + esc(l.sum) + "</p><ul>" + l.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul></div></div></div></div>";
          }).join("") + "</div>";
      }).join("") + "</div>";
    $$(".les__b", syl).forEach(function (b) { b.addEventListener("click", function () { b.setAttribute("aria-expanded", b.getAttribute("aria-expanded") !== "true"); }); });
    var first = $(".les__b", syl); if (first) first.setAttribute("aria-expanded", "true");
  }
  function selectCourse(id, scroll) {
    var c = byId(id); if (!c) return;
    $$(".tab", tabsEl).forEach(function (t) { t.setAttribute("aria-selected", t.dataset.id === id); });
    renderSyl(c);
    selectFlow(id);
    if (scroll) $("#aulas").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }
  open.forEach(function (c) {
    var t = el("button", { class: "tab", role: "tab", "aria-selected": "false", "data-id": c.id, style: "--a:" + c.accent }, "<i></i>" + esc(c.short || c.title));
    t.addEventListener("click", function () { selectCourse(c.id); });
    tabsEl.appendChild(t);
  });
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-open]");
    if (a) { e.preventDefault(); selectCourse(a.dataset.open, true); }
  });

  /* ---------- Processo (fluxo clicável) ---------- */
  var ftabs = $("#flowTabs"), flow = $("#flow");
  function selectFlow(id) {
    var c = byId(id); if (!c || !c.flow) return;
    $$(".tab", ftabs).forEach(function (t) { t.setAttribute("aria-selected", t.dataset.id === id); });
    flow.style.setProperty("--a", c.accent);
    flow.innerHTML = '<div class="flow__rail" style="--n:' + c.flow.steps.length + '">' +
      c.flow.steps.map(function (s, i) { return '<button class="fstep" role="tab" aria-selected="' + (i === 0) + '" data-i="' + i + '"><span class="fstep__dot">' + (i + 1) + '</span><span class="fstep__t">' + esc(s.t) + "</span></button>"; }).join("") +
      '</div><div class="flow__card glass" aria-live="polite"></div>';
    var card = $(".flow__card", flow);
    function show(i) {
      $$(".fstep", flow).forEach(function (b, k) { b.setAttribute("aria-selected", k === i); });
      var s = c.flow.steps[i];
      card.innerHTML = '<small data-k>' + esc(c.flow.title) + " · etapa " + (i + 1) + " de " + c.flow.steps.length + "</small><h3 data-k>" + esc(s.t) + "</h3><p data-k>" + esc(s.d) + "</p>";
    }
    $$(".fstep", flow).forEach(function (b) { b.addEventListener("click", function () { show(+b.dataset.i); }); });
    show(0);
  }
  open.forEach(function (c) {
    var t = el("button", { class: "tab", role: "tab", "aria-selected": "false", "data-id": c.id, style: "--a:" + c.accent }, "<i></i>" + esc(c.short || c.title));
    t.addEventListener("click", function () { selectFlow(c.id); });
    ftabs.appendChild(t);
  });
  selectCourse(open[0].id);

  /* ---------- Galeria ---------- */
  var G = [
    { t: "video", s: "showreel", n: "Showreel", k: "Motion" },
    { t: "video", s: "jardim-r2", n: "Do mato ao jardim", k: "Promo" },
    { t: "img", s: "assets/img/arte-aurea-v1-2.webp", n: "Aurea", k: "Criativo" },
    { t: "video", s: "jiva", n: "Logo animada JIVA", k: "Logo" },
    { t: "video", s: "vinhetas", n: "Vinhetas com Claude", k: "Vinheta", wide: 1 },
    { t: "video", s: "talkmachine", n: "Talk Machine", k: "Promo" },
    { t: "img", s: "assets/img/arte-imobiliaria-v1-2.webp", n: "Imobiliária", k: "Criativo" },
    { t: "video", s: "rostinho", n: "Puxou a quem?", k: "Personagens" },
    { t: "video", s: "pedescalco", n: "Pé Descalço", k: "Promo" },
    { t: "video", s: "jardim-r3", n: "Três passos", k: "Números" },
    { t: "video", s: "transicao", n: "Transição de 1 segundo", k: "Transição" }
  ];
  var gal = $("#gallery");
  G.forEach(function (g) {
    var f = el("figure", { class: "gi" + (g.wide ? " gi--wide" : "") });
    f.innerHTML = (g.t === "video"
      ? '<video muted loop playsinline preload="none" poster="assets/video/' + g.s + '.jpg" data-src="assets/video/' + g.s + '.mp4" aria-label="' + esc(g.n) + '"></video>'
      : '<img src="' + g.s + '" alt="' + esc(g.n) + '" loading="lazy">') +
      '<figcaption class="glass"><b>' + esc(g.n) + "</b><span>" + esc(g.k) + "</span></figcaption>";
    gal.appendChild(f);
    var v = $("video", f); if (v) watch(v);
  });

  /* ---------- Preços ---------- */
  var pr = $("#prices");
  C.forEach(function (c) {
    var d = el("article", { class: "pc glass", style: "--a:" + c.accent });
    if (c.status === "em-breve") {
      d.innerHTML = '<span class="tag" style="justify-self:start">Em planejamento</span><div class="pc__n">' + esc(c.title) + "</div><p style=\"color:var(--lilac-2)\">" + esc(c.pitch) + "</p>";
    } else {
      d.innerHTML = '<div class="pc__n">' + esc(c.title) + '</div><div class="pc__p"><b>' + esc(c.price) + "</b><span>" + esc(c.priceNote) + "</span></div><ul>" +
        '<li>' + lessonsOf(c).length + " aulas, " + fmt(minutesOf(c)) + "</li><li>" + esc(c.pdfsLabel) + "</li>" + c.facts.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>" +
        '<a class="btn" href="' + link(c) + '" target="_blank" rel="noopener">Quero este curso</a>';
    }
    pr.appendChild(d);
  });

  /* ---------- FAQ ---------- */
  var fq = $("#faq");
  function addFaq(list) { list.forEach(function (q) { fq.appendChild(el("details", null, "<summary>" + esc(q[0]) + "</summary><p>" + esc(q[1]) + "</p>")); }); }
  open.forEach(function (c) { if (c.faq && c.faq.length) { fq.appendChild(el("p", { class: "faq__g" }, esc(c.title))); addFaq(c.faq); } });
  fq.appendChild(el("p", { class: "faq__g" }, "Geral")); addFaq(FAQ);
})();

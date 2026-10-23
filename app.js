/* Estúdio Augusto Fonte — monta a página a partir de courses.js */
(function () {
  "use strict";
  var S = window.SITE, C = window.COURSES, FAQ = window.FAQ_GERAL, B = window.BUNDLE;
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
  var blink = B.checkout || S.fallbackCta;
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" opacity=".25"/><path d="M7 12.5l3.2 3.2L17 8.8"/></svg>';
  var CHECK_S = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 10.5l3.2 3L15 7"/></svg>';
  var ARROW_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
  var ARROW_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>';
  var CHEV = '<svg class="les__ch" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  /* ---------- Ícones animados (vidro) ---------- */
  var GLYPH = {
    hello: '<path class="ac a-pulse" d="M24 5c1.2 10.5 8.5 17.8 19 19-10.5 1.2-17.8 8.5-19 19-1.2-10.5-8.5-17.8-19-19C15.5 22.8 22.8 15.5 24 5z"/><circle class="a-ring" cx="24" cy="24" r="19" opacity=".5"/>',
    apps: '<rect class="a-bob" x="6" y="6" width="15" height="15" rx="5"/><rect class="ac a-bob2" x="27" y="6" width="15" height="15" rx="5"/><rect class="ac a-bob3" x="6" y="27" width="15" height="15" rx="5"/><rect class="a-bob" x="27" y="27" width="15" height="15" rx="5"/>',
    copy: '<rect class="ac a-hl" x="6" y="11" width="36" height="9" rx="3" opacity=".55" stroke="none"/><path d="M8 15.5h32M8 26h32M8 36.5h20"/>',
    refs: '<rect class="a-fan1" x="9" y="12" width="17" height="24" rx="4"/><rect class="ac a-fan2" x="15" y="9" width="17" height="24" rx="4" opacity=".85"/><rect class="a-fan3" x="22" y="12" width="17" height="24" rx="4"/>',
    identity: '<text x="9" y="31" font-family="PolySans,sans-serif" font-weight="800" font-size="19" fill="currentColor" stroke="none">Aa</text><g class="a-orbit"><circle class="ac" cx="24" cy="5" r="3.2" stroke="none"/></g><circle cx="24" cy="24" r="19" opacity=".35" stroke-dasharray="2 4"/>',
    format: '<rect x="4" y="15" width="11" height="18" rx="3"/><rect class="ac a-fmt" x="18.5" y="8" width="11" height="32" rx="3"/><rect x="33" y="14" width="11" height="20" rx="3"/>',
    figma: '<rect x="6" y="7" width="30" height="34" rx="5" stroke-dasharray="3.5 3.5"/><path class="ac a-cur" d="M24 22l17 6.5-7.2 3-3 7.2z" stroke="none"/>',
    image: '<rect x="6" y="9" width="36" height="30" rx="6"/><path d="M6 33l10-9 8 7 7-6 11 9"/><circle class="ac a-bob" cx="33" cy="19" r="3.4" stroke="none"/><path class="ac a-twk" d="M13 14l1.2 2.8L17 18l-2.8 1.2L13 22l-1.2-2.8L9 18l2.8-1.2z" stroke="none"/>',
    play: '<circle class="a-ring" cx="24" cy="24" r="18"/><circle class="a-ring2" cx="24" cy="24" r="18"/><path class="ac a-pulse" d="M19 15.5l15 8.5-15 8.5z" stroke="none"/>',
    check: '<rect x="6" y="6" width="36" height="36" rx="9" opacity=".5"/><path class="a-chk" d="M13 17l3 3 5-6"/><path class="a-chk d2" d="M13 27l3 3 5-6"/><path class="a-chk d3" d="M13 37l3 3 5-6" transform="translate(0 -3)"/><path d="M26 18h10M26 28h10M26 36h6" opacity=".7"/>',
    folder: '<path d="M5 14a4 4 0 0 1 4-4h10l4 5h16a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><rect class="ac a-bob" x="14" y="19" width="20" height="11" rx="3" stroke="none" opacity=".9"/>',
    chat: '<path d="M8 10h32a3 3 0 0 1 3 3v17a3 3 0 0 1-3 3H22l-8 7v-7H8a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3z"/><circle class="ac a-bob" cx="15" cy="22" r="2.6" stroke="none"/><circle class="ac a-bob2" cx="24" cy="22" r="2.6" stroke="none"/><circle class="ac a-bob3" cx="33" cy="22" r="2.6" stroke="none"/>',
    script: '<path d="M12 5h17l9 9v26a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z"/><path d="M29 5v9h9"/><path class="ac a-hl" d="M15 24h18M15 31h18M15 38h10" stroke-width="3"/>',
    spark: '<path class="ac a-spin" d="M22 5c1.2 8.5 6.5 13.8 15 15-8.5 1.2-13.8 6.5-15 15-1.2-8.5-6.5-13.8-15-15 8.5-1.2 13.8-6.5 15-15z" stroke="none"/><path class="a-twk" d="M38 28l1.3 3.7L43 33l-3.7 1.3L38 38l-1.3-3.7L33 33l3.7-1.3z" stroke="none" fill="currentColor"/><path class="a-twk2" d="M12 34l1 2.6 2.6 1-2.6 1L12 41l-1-2.4-2.6-1 2.6-1z" stroke="none" fill="currentColor"/>',
    download: '<path d="M8 32v6a3 3 0 0 0 3 3h26a3 3 0 0 0 3-3v-6"/><g class="a-bob"><path d="M24 6v24"/><path class="ac" d="M15 22l9 10 9-10z" stroke="none"/></g>',
    wand: '<path d="M10 38L30 18"/><path class="ac a-pulse" d="M30 18l-4-4 5-5 4 4z" stroke="none"/><path class="a-twk" d="M36 24l1.4 3.6L41 29l-3.6 1.4L36 34l-1.4-3.6L31 29l3.6-1.4z" stroke="none" fill="currentColor"/><path class="a-twk2" d="M14 11l1 2.6 2.6 1-2.6 1L14 18l-1-2.4-2.6-1 2.6-1z" stroke="none" fill="currentColor"/>'
  };
  var ICOMAP = {
    /* criativos */ "boas-vindas": "hello", "apps que vou usar": "apps", "analisando a copy": "copy", "buscando referências": "refs", "micro identidade": "identity", "formatos": "format", "criativo no figma": "figma", "imagens na orayon": "image", "vídeo no canva": "play", "boas práticas": "check",
    /* motion */ "o que já dá pra fazer": "play", "quem sou eu": "hello", "o método e o mecanismo único": "spark", "o que você precisa ter": "check", "identidade visual": "identity", "montar a pasta no pc": "folder", "anexar pastas": "folder", "dar contexto": "chat", "o que é o mecanismo único": "spark", "instalar o método": "download", "referências do método": "refs", "como chamar o método": "chat", "gerar o roteiro": "script", "chamar o método e gerar": "wand",
    /* etapas do processo */ "copy": "copy", "referência": "refs", "identidade": "identity", "formato": "format", "figma": "figma", "orayon": "image", "canva": "play", "marca": "identity", "pasta": "folder", "briefing": "chat", "roteiro": "script", "opus": "spark", "sonnet": "wand"
  };
  var FALLBACK = ["spark", "hello", "check", "refs", "play", "wand"];
  function glyphKey(title, i) { return ICOMAP[String(title).toLowerCase()] || FALLBACK[i % FALLBACK.length]; }
  function gico(key, size) {
    return '<span class="gico" style="--s:' + size + 'px" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' + GLYPH[key] + "</svg></span>";
  }

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
    if (c.status === "em-breve") return;
    var media = c.media.type === "video"
      ? '<div class="course__media course__media--video"><video muted loop playsinline preload="none" data-src="' + c.media.src + '" poster="' + c.media.poster + '" aria-label="Exemplo de motion do curso"></video></div>'
      : '<div class="course__media"><div class="pair">' + c.media.src.map(function (s) { return '<img src="' + s + '" alt="Exemplo de criativo feito no curso" loading="lazy">'; }).join("") + "</div></div>";
    card.innerHTML = media +
      '<div class="course__body">' +
      '<div><div class="course__title"><h3>' + esc(c.title) + '</h3>' + (c.co ? '<span class="course__co">' + esc(c.co) + '</span>' : "") + '</div></div>' +
      '<p class="course__tag">' + esc(c.pitch) + "</p>" +
      '<ul class="meta"><li>' + lessonsOf(c).length + ' aulas</li><li>' + fmt(minutesOf(c)) + '</li><li>' + esc(c.pdfsLabel) + "</li></ul>" +
      '<ul class="ticks">' + c.outcomes.map(function (o) { return "<li>" + CHECK + "<span>" + esc(o) + "</span></li>"; }).join("") + "</ul>" +
      '<div class="course__foot"><span class="tag tag--in">Incluído no curso completo</span>' +
      '<div class="course__links"><a class="btn btn--line" href="#aulas" data-open="' + c.id + '">Ver as aulas</a></div></div></div>';
    cards.appendChild(card);
    var v = $("video", card); if (v) watch(v);
  });
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); cio.unobserve(e.target); } }); }, { threshold: .3 });
    $$(".course").forEach(function (c) { cio.observe(c); });
  } else $$(".course").forEach(function (c) { c.classList.add("in"); });

  $("#bundleBar").innerHTML = '<div class="bundle-bar__in glass"><div><h3>' + esc(B.title) + '</h3><p>' + esc(B.tagline) + '</p></div><div class="price price--lg"><b>' + esc(B.price) + '</b><span>' + esc(B.priceNote) + '</span></div><a class="btn btn--light" href="' + blink + '" target="_blank" rel="noopener">Quero o curso completo</a></div>';

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

  /* ---------- Aulas (banner + barra de navegação) ---------- */
  var tabsEl = $("#courseTabs"), syl = $("#syllabus");
  var curCourse = null, curLesson = 0;
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function flat(c) {
    var out = [], n = 0;
    c.modules.forEach(function (m) { m.lessons.forEach(function (l) { out.push({ n: ++n, mod: m.title, l: l }); }); });
    return out;
  }
  function renderSyl(c) {
    curCourse = c; curLesson = 0;
    var L = flat(c);
    syl.style.setProperty("--a", c.accent);
    syl.innerHTML =
      '<div class="xp" style="--a:' + c.accent + '">' +
      '<div class="xp-banner" id="xpBanner"><i class="xp-prog" id="xpProg"></i><span class="xp-nb" id="xpNb" aria-hidden="true"></span>' +
      '<div class="xp-bt"><small id="xpKick"></small><h3 id="xpTitle"></h3></div><div class="xp-ico" id="xpIco"></div>' +
      '<span class="xp-live"><i></i>Prévia da aula</span></div>' +
      '<div class="xp-nav"><div class="xp-meta"><b>' + L.length + ' aulas</b><span>' + fmt(minutesOf(c)) + " · " + esc(c.pdfsLabel) + '</span></div>' +
      '<ul class="xp-list" id="xpList" role="tablist" aria-label="Aulas do curso">' +
      L.map(function (x, i) {
        return '<li role="presentation"><button class="xp-item" role="tab" aria-selected="' + (i === 0) + '" data-i="' + i + '">' + gico(glyphKey(x.l.title, i), 40) +
          '<span class="xp-tx"><strong>' + esc(x.l.title) + "</strong><span>Aula " + x.n + " · " + esc(x.l.dur) + "</span></span></button></li>";
      }).join("") + "</ul></div>" +
      '<div class="xp-body" id="xpBody" aria-live="polite"></div></div>';
    var list = $("#xpList", syl);
    function show(i, fromUser) {
      i = Math.max(0, Math.min(L.length - 1, i)); curLesson = i;
      var x = L[i], key = glyphKey(x.l.title, i);
      $$(".xp-item", list).forEach(function (b, k) { b.setAttribute("aria-selected", k === i); });
      $("#xpNb").textContent = pad(x.n);
      $("#xpKick").textContent = "Aula " + pad(x.n) + " · " + x.l.dur + " · " + x.mod;
      $("#xpTitle").textContent = x.l.title;
      $("#xpIco").innerHTML = gico(key, 96);
      $("#xpProg").style.width = ((i + 1) / L.length * 100) + "%";
      var body = $("#xpBody");
      body.innerHTML = '<p class="xp-sum" data-k>' + esc(x.l.sum) + '</p><p class="xp-q" data-k>O que você vê nesta aula <span id="xpCnt"></span></p><ul class="xp-pts" data-k>' +
        x.l.points.map(function (p, k) { return '<li><label><input type="checkbox" data-k2="' + k + '"><span class="xp-box">' + CHECK_S + '</span><span>' + esc(p) + "</span></label></li>"; }).join("") +
        '</ul><div class="xp-foot"><button class="xp-arrow" id="xpPrev" aria-label="Aula anterior"' + (i === 0 ? " disabled" : "") + '>' + ARROW_L + '</button><span class="xp-count">' + (i + 1) + " de " + L.length + '</span><button class="xp-arrow xp-arrow--next" id="xpNext" aria-label="Próxima aula"' + (i === L.length - 1 ? " disabled" : "") + '>Próxima aula' + ARROW_R + "</button></div>";
      var boxes = $$("input", body), cnt = $("#xpCnt");
      function upd() { var d = boxes.filter(function (b) { return b.checked; }).length; cnt.textContent = "· " + d + " de " + boxes.length + " marcados"; }
      boxes.forEach(function (b) { b.addEventListener("change", upd); }); upd();
      $("#xpPrev").addEventListener("click", function () { show(curLesson - 1, true); });
      $("#xpNext").addEventListener("click", function () { show(curLesson + 1, true); });
      var it = $$(".xp-item", list)[i];
      var left = it.offsetLeft - (list.clientWidth - it.offsetWidth) / 2;
      if (list.scrollWidth > list.clientWidth) list.scrollTo({ left: left, behavior: reduce ? "auto" : "smooth" });
      else if (list.scrollHeight > list.clientHeight) list.scrollTo({ top: it.offsetTop - (list.clientHeight - it.offsetHeight) / 2, behavior: reduce ? "auto" : "smooth" });
      var bn = $("#xpBanner"); bn.classList.remove("swap"); void bn.offsetWidth; bn.classList.add("swap");
    }
    $$(".xp-item", list).forEach(function (b) { b.addEventListener("click", function () { show(+b.dataset.i, true); }); });
    /* deslizar o banner para trocar de aula */
    var sx = null, bn = $("#xpBanner");
    bn.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    bn.addEventListener("touchend", function (e) {
      if (sx == null) return; var dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 50) show(curLesson + (dx < 0 ? 1 : -1), true);
    }, { passive: true });
    show(0);
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
      c.flow.steps.map(function (s, i) { return '<button class="fstep" role="tab" aria-selected="' + (i === 0) + '" data-i="' + i + '"><span class="fstep__dot">' + gico(glyphKey(s.t, i), 56) + '<em>' + (i + 1) + '</em></span><span class="fstep__t">' + esc(s.t) + "</span></button>"; }).join("") +
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
  var parts = open.map(function (c) { return '<li><span><b>' + esc(c.title) + '</b>: ' + lessonsOf(c).length + " aulas, " + fmt(minutesOf(c)) + ", " + esc(c.pdfsLabel) + "</span></li>"; }).join("");
  var big = el("article", { class: "pc pc--combo glass" });
  big.innerHTML = '<div class="pc__n">' + esc(B.title) + '</div><div class="pc__p"><b>' + esc(B.price) + "</b><span>" + esc(B.priceNote) + "</span></div><ul>" + parts +
    '<li>' + totalL + " aulas e " + fmt(totalM) + " no total</li>" + B.extra.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul><a class="btn" href="' + blink + '" target="_blank" rel="noopener">Quero o curso completo</a>';
  pr.appendChild(big);
  soon.forEach(function (c) {
    var d = el("article", { class: "pc glass", style: "--a:" + c.accent });
    d.innerHTML = '<span class="tag" style="justify-self:start">Em planejamento</span><div class="pc__n">' + esc(c.title) + "</div><p style=\"color:var(--lilac-2)\">" + esc(c.pitch) + "</p>";
    pr.appendChild(d);
  });

  /* ---------- FAQ ---------- */
  var fq = $("#faq");
  function addFaq(list) { list.forEach(function (q) { fq.appendChild(el("details", null, "<summary>" + esc(q[0]) + "</summary><p>" + esc(q[1]) + "</p>")); }); }
  open.forEach(function (c) { if (c.faq && c.faq.length) { fq.appendChild(el("p", { class: "faq__g" }, esc(c.title))); addFaq(c.faq); } });
  fq.appendChild(el("p", { class: "faq__g" }, "Geral")); addFaq(FAQ);
})();

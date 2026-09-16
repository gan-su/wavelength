/* ==========================================================================
   Wavelength - landing page behaviour
   Rules followed here:
   - no scroll event listeners anywhere; all scroll state comes from
     IntersectionObserver, which the browser batches off the main thread
   - every motion path checks prefers-reduced-motion and degrades to static
   - all observers are created once and disconnected when their work is done
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var isReduced = function () { return reduced.matches; };

  /* ---------------------------------------------------------------- boot
     Storytelling: frames the product as an instrument before the first
     headline. Runs once per session, skips entirely on reduced motion. */
  function boot() {
    var el = document.getElementById('boot');
    if (!el) return;

    var seen = false;
    try { seen = sessionStorage.getItem('wl-boot') === '1'; } catch (e) { /* private mode */ }

    function finish() {
      el.classList.add('boot--done');
      window.setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 600);
      try { sessionStorage.setItem('wl-boot', '1'); } catch (e) {}
    }

    if (seen || isReduced()) { finish(); return; }

    var lines = el.querySelectorAll('.boot__line');
    var fill = document.getElementById('bootFill');
    var pct = document.getElementById('bootPct');
    var timers = [];

    for (var i = 0; i < lines.length; i++) {
      (function (node, index) {
        timers.push(window.setTimeout(function () { node.classList.add('is-on'); }, 120 + index * 460));
      })(lines[i], i);
    }

    var start = null;
    var DURATION = 1750;
    function step(now) {
      if (start === null) start = now;
      var p = Math.min((now - start) / DURATION, 1);
      var value = Math.round(p * 100);
      if (fill) fill.style.width = value + '%';
      if (pct) pct.textContent = String(value).padStart(3, '0');
      if (p < 1) { window.requestAnimationFrame(step); }
      else { window.setTimeout(finish, 240); }
    }
    window.requestAnimationFrame(step);

    /* escape hatch: any interaction skips the sequence */
    ['pointerdown', 'keydown', 'wheel'].forEach(function (evt) {
      window.addEventListener(evt, function once() {
        timers.forEach(clearTimeout);
        finish();
      }, { once: true, passive: true });
    });
  }

  /* --------------------------------------------------- scroll depth ladder
     20 invisible markers spanning the document. Each one reports when it
     crosses the top of the viewport, which gives depth in 5% steps without
     a single scroll listener. Feeds the HUD and the top progress bar. */
  function depthLadder() {
    var bar = document.getElementById('progressFill');
    var out = document.getElementById('hudDepth');
    if (!bar && !out) return;

    var STEPS = 20;
    var ladder = document.createElement('div');
    ladder.className = 'depth-ladder';
    ladder.setAttribute('aria-hidden', 'true');
    ladder.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:calc(100% - 100vh);' +
      'pointer-events:none;display:flex;flex-direction:column;z-index:-1;';

    var marks = [];
    for (var i = 0; i < STEPS; i++) {
      var m = document.createElement('span');
      m.style.cssText = 'flex:1 0 auto;display:block;';
      m.dataset.step = String(i);
      ladder.appendChild(m);
      marks.push(m);
    }
    document.body.appendChild(ladder);

    var crossed = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var step = Number(entry.target.dataset.step);
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) crossed.add(step);
        else crossed.delete(step);
      });
      var depth = crossed.size * (100 / STEPS);
      depth = Math.max(0, Math.min(100, Math.round(depth)));
      if (bar) bar.style.width = depth + '%';
      if (out) out.textContent = String(depth).padStart(3, '0');
    }, { rootMargin: '0px 0px -100% 0px', threshold: 0 });

    marks.forEach(function (m) { io.observe(m); });
  }

  /* ------------------------------------------------------------------ hud
     Cursor coordinates and viewport width. Pointer events only, coalesced
     into one animation frame so fast movement cannot flood the main thread. */
  function hud() {
    var x = document.getElementById('hudX');
    var y = document.getElementById('hudY');
    var view = document.getElementById('hudView');
    if (!x || !y || !view) return;

    var pad = function (n) { return String(Math.round(n)).padStart(4, '0'); };
    var setView = function () { view.textContent = pad(window.innerWidth); };
    setView();

    var ro = new ResizeObserver(setView);
    ro.observe(document.documentElement);

    var px = 0, py = 0, queued = false;
    window.addEventListener('pointermove', function (e) {
      px = e.clientX; py = e.clientY;
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        x.textContent = pad(px);
        y.textContent = pad(py);
        queued = false;
      });
    }, { passive: true });
  }

  /* ------------------------------------------------------------------ nav
     Sticky nav gains its backdrop only once the page has left the top. */
  function navState() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:80px;pointer-events:none;';
    document.body.appendChild(sentinel);
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(sentinel);
  }

  /* ----------------------------------------------------------------- hero
     Four beats, one per quarter of the pinned section. A beat activates
     when it crosses the vertical centre of the viewport, so exactly one
     line is ever on screen. Beat 3 hands over to the headline and CTA,
     and triggers the schematic line-draw. */
  function heroNarrative() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    if (isReduced()) { hero.classList.add('is-drawn'); return; }

    var beats = hero.querySelectorAll('.beat');
    var revealEl = hero.querySelector('.hero__reveal');
    var sentinels = hero.querySelectorAll('.hero__beat');
    var rail = document.getElementById('heroRail');
    if (!sentinels.length) return;

    var current = -1;
    function activate(index) {
      if (index === current) return;
      current = index;

      for (var i = 0; i < beats.length; i++) {
        beats[i].classList.toggle('is-on', Number(beats[i].dataset.beat) === index);
      }
      if (revealEl) revealEl.classList.toggle('is-on', index >= 3);
      if (index >= 1) hero.classList.add('is-drawn');
      if (rail) rail.style.height = ((index + 1) / sentinels.length) * 100 + '%';
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) activate(Number(entry.target.dataset.sentinel));
      });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
    for (var s = 0; s < sentinels.length; s++) io.observe(sentinels[s]);

    activate(0);
  }

  /* --------------------------------------------------------------- reveal
     Section entrance. Hierarchy: brings the eye to the block that just
     arrived. Fires once per element, then stops observing it. */
  function revealOnEnter() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (isReduced()) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------- counters
     State transition: the figures resolve as the band arrives, which reads
     as a live readout rather than static text. Values come from the markup,
     so the page is correct with JS off. */
  function counters() {
    var nums = document.querySelectorAll('.stat__num[data-count]');
    if (!nums.length || isReduced()) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        run(entry.target);
      });
    }, { threshold: 0.4 });

    nums.forEach(function (n) { io.observe(n); });

    function run(el) {
      var target = parseFloat(el.dataset.count);
      var decimal = el.dataset.format === 'dec';
      var suffix = decimal ? '%' : '';
      var start = null;
      var DURATION = 1100;

      function frame(now) {
        if (start === null) start = now;
        var p = Math.min((now - start) / DURATION, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var value = target * eased;
        el.textContent = decimal
          ? value.toFixed(1) + suffix
          : Math.round(value).toLocaleString('en-US');
        if (p < 1) window.requestAnimationFrame(frame);
      }
      window.requestAnimationFrame(frame);
    }
  }

  /* --------------------------------------------------------------- marquee
     Duplicate the logo row so the loop has something to slide into.
     Skipped under reduced motion, where the row becomes a static wrap. */
  function marquee() {
    var track = document.querySelector('.marquee__track');
    if (!track || isReduced()) return;
    track.innerHTML += track.innerHTML;
    track.setAttribute('aria-hidden', 'true');
  }

  /* --------------------------------------------------------------- accordion
     One open answer at a time, so the column never turns into a wall. */
  function accordion() {
    var items = document.querySelectorAll('.qa');
    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        items.forEach(function (other) { if (other !== item) other.open = false; });
      });
    });
  }

  function init() {
    boot();
    hud();
    navState();
    depthLadder();
    heroNarrative();
    revealOnEnter();
    counters();
    marquee();
    accordion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

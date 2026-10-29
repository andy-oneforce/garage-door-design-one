// Mobile menu toggle. Without JS the nav is always visible (see styles.css).
(function () {
  var btn = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (!btn || !nav) return;
  document.documentElement.classList.add("js");
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      btn.focus();
    }
  });
})();

document.querySelectorAll('[data-ba]').forEach(function (f) {
  var r = f.querySelector('.ba-range');
  var set = function () { f.style.setProperty('--pos', r.value + '%'); };
  r.addEventListener('input', set); set();
});

/* v4: scroll reveal + counters (content is visible without JS and under reduced motion) */
(function () {
  var rm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rv = document.querySelectorAll('.rv'), cs = document.querySelectorAll('.counter');
  if (!('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js');
  var o = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); o.unobserve(x.target); } }); }, { threshold: .12 });
  rv.forEach(function (e) { o.observe(e); });
  function run(el) {
    var to = +el.dataset.to, d = +(el.dataset.dec || 0);
    if (rm) { el.textContent = to.toFixed(d); return; }
    var t0 = null;
    (function f(t) { if (!t0) t0 = t; var p = Math.min((t - t0) / 1400, 1); el.textContent = (to * p).toFixed(d); if (p < 1) requestAnimationFrame(f); })(performance.now());
  }
  var o2 = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { run(x.target); o2.unobserve(x.target); } }); });
  cs.forEach(function (e) { o2.observe(e); });
})();

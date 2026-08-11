// ============================================================
// ERIK EIKE — script.js
// Comportamentos globais do site
// ============================================================

// ── Tema Claro/Escuro ────────────────────────────────────
(function () {
  const html = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function setTheme(theme) {
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      if (btn) btn.textContent = '☀️';
    } else {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      if (btn) btn.textContent = '🌙';
    }
  }

  setTheme(savedTheme);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  }
})();

// ── Marca link ativo no nav ──────────────────────────────
(function () {
  const page = location.pathname.split('/').pop();
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// ── Animação das barras de habilidade ───────────────────
(function () {
  const fills = document.querySelectorAll('.skill-bar-fill');
  if (!fills.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animated'); });
  }, { threshold: 0.3 });
  fills.forEach(f => obs.observe(f));
})();

// ── Smooth reveal nas seções ─────────────────────────────
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(20px); transition: opacity .55s ease, transform .55s ease; }
    .reveal.visible { opacity: 1; transform: none; }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('section').forEach(s => s.classList.add('reveal'));

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target); // stop observing once visible
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  // Small delay so browser paints first, then observe
  requestAnimationFrame(() => {
    document.querySelectorAll('section.reveal').forEach(s => obs.observe(s));
  });
})();

// ── Tooltip nos links do GitHub ──────────────────────────
(function () {
  document.querySelectorAll('a.github-repo').forEach(link => {
    link.title = 'Abrir repositório no GitHub';
  });
})();

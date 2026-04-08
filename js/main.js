document.addEventListener('DOMContentLoaded', () => {

  // ── Load section partials into the page ──
  const sections = [
    { id: 'section-nav',        file: 'sections/nav.html' },
    { id: 'section-hero',       file: 'sections/hero.html' },
    { id: 'section-case-studies', file: 'sections/case-studies.html' },
    { id: 'section-frameworks', file: 'sections/frameworks.html' },
    { id: 'section-philosophy', file: 'sections/philosophy.html' },
    { id: 'section-footer',    file: 'sections/footer.html' },
  ];

  Promise.all(
    sections.map(({ id, file }) =>
      fetch(file)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to load ${file}`);
          return res.text();
        })
        .then(html => ({ id, html }))
    )
  ).then(results => {
    results.forEach(({ id, html }) => {
      const slot = document.getElementById(id);
      if (slot) slot.innerHTML = html;
    });
    initInteractions();
  });

  function initInteractions() {
    // Scroll-based nav shadow
    const nav = document.getElementById('navbar');
    if (nav) {
      window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 10);
      }, { passive: true });
    }

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.querySelector('.nav-links').classList.remove('open');
          }
        }
      });
    });

    // Mobile nav toggle
    const toggle = document.querySelector('.nav-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('open');
      });
    }
  }

});

document.addEventListener('DOMContentLoaded', () => {

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

});

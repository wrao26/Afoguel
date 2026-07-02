// AFOGUEL — comportamento partilhado por todas as páginas

// Mobile nav
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// Diagnosis form -> WhatsApp handoff (only present on diagnostico.html)
const diagForm = document.getElementById('diagForm');
if (diagForm) {
  diagForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(this);
    const msg = `Diagnóstico Empresarial%0A` +
      `Nome: ${data.get('nome')}%0A` +
      `Empresa: ${data.get('empresa')}%0A` +
      `Sector: ${data.get('sector')}%0A` +
      `Serviço: ${data.get('servico')}%0A` +
      `Problema: ${data.get('problema')}%0A` +
      `Urgência: ${data.get('urgencia')}%0A` +
      `Email: ${data.get('email')}%0A` +
      `Telefone: ${data.get('telefone')}`;
    window.open(`https://wa.me/244923317915?text=${msg}`, '_blank');
  });
}

// GSAP reveals
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
} else {
  document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
}

// 3D tilt on hero: background grid + seal follow the mouse (only present on index.html)
const heroEl = document.querySelector('.hero');
const bgGrid = document.getElementById('heroBgGrid');
const seal = document.getElementById('seal');
if (heroEl && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  heroEl.addEventListener('mousemove', (e) => {
    const r = heroEl.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (bgGrid) bgGrid.style.transform = `rotateX(${py * 6}deg) rotateY(${px * -6}deg) translateZ(0)`;
    if (seal) seal.style.transform = `rotateX(${py * -14}deg) rotateY(${px * 14}deg)`;
  });
  heroEl.addEventListener('mouseleave', () => {
    if (bgGrid) bgGrid.style.transform = 'none';
    if (seal) seal.style.transform = 'none';
  });
}

// Ledger-style animated counters (count up when in view)
const counters = document.querySelectorAll('.num[data-count]');
if (counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        let current = 0;
        const step = Math.max(1, Math.round(target / 24));
        const tick = () => {
          current = Math.min(target, current + step);
          el.textContent = String(current).padStart(2, '0');
          if (current < target) requestAnimationFrame(tick);
        };
        tick();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(el => counterObserver.observe(el));
}

// Header shadow on scroll
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 20 ? '0 8px 24px rgba(0,0,0,0.25)' : 'none';
  });
}

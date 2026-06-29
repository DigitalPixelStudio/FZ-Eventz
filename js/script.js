/* ========== FZ Eventz v3 — Premium Interactions ========== */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Navigation ----- */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.pageYOffset > 60);
  }, { passive: true });

  /* ----- Mobile menu ----- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ----- Lead Form Overlay ----- */
  const overlay = document.getElementById('leadOverlay');
  const overlayTriggers = document.querySelectorAll('[data-open-overlay]');
  const overlayClose = document.querySelector('.overlay-close');

  function openOverlay() { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeOverlay() { overlay.classList.remove('open'); document.body.style.overflow = ''; }

  overlayTriggers.forEach(t => t.addEventListener('click', openOverlay));
  overlayClose.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeOverlay(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay(); });

  /* ----- Form submission to WhatsApp ----- */
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = leadForm.querySelector('.form-submit');
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      const data = {};
      new FormData(leadForm).forEach((v, k) => { data[k] = v; });

      const msg = `*New Lead from FZ Eventz Website*%0A%0A` +
        `Name: ${data.name}%0A` +
        `Phone: ${data.phone}%0A` +
        `Email: ${data.email || 'N/A'}%0A` +
        `Event Type: ${data.eventType || 'N/A'}%0A` +
        `Message: ${data.message || 'N/A'}`;

      setTimeout(() => {
        window.open(`https://wa.me/918970118819?text=${msg}`, '_blank');
        btn.textContent = 'Sent! ✓';
        btn.style.background = '#22c55e';
        setTimeout(() => {
          closeOverlay();
          leadForm.reset();
          btn.textContent = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 1500);
      }, 600);
    });
  }

  /* ----- Background Effects Generator ----- */
  function createBgEffects(section) {
    const container = section.querySelector('.bg-effects');
    if (!container) return;

    const rect = section.getBoundingClientRect();
    const h = rect.height || 800;

    // Create floating gold particles
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.className = 'gold-particle';
      const size = 2 + Math.random() * 3;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = (5 + Math.random() * 90) + '%';
      p.style.bottom = '-10px';
      const dur = 12 + Math.random() * 18;
      const delay = Math.random() * 15;
      const anim = ['floatParticle1', 'floatParticle2', 'floatParticle3'][Math.floor(Math.random() * 3)];
      p.style.animation = `${anim} ${dur}s ease-in-out ${delay}s infinite`;
      container.appendChild(p);
    }

    // Create shimmer lines
    for (let i = 0; i < 3; i++) {
      const l = document.createElement('div');
      l.className = 'shimmer-line';
      l.style.width = (20 + Math.random() * 40) + '%';
      l.style.top = (10 + Math.random() * 80) + '%';
      l.style.left = '0';
      l.style.height = '1px';
      const dur = 10 + Math.random() * 15;
      const delay = Math.random() * 10;
      const anim = i % 2 === 0 ? 'shimmerLine1' : 'shimmerLine2';
      l.style.animation = `${anim} ${dur}s ease-in-out ${delay}s infinite`;
      container.appendChild(l);
    }

    // Create twinkle stars
    for (let i = 0; i < 8; i++) {
      const t = document.createElement('div');
      t.className = 'twinkle-dot';
      t.style.width = (2 + Math.random() * 2) + 'px';
      t.style.height = t.style.width;
      t.style.left = (5 + Math.random() * 90) + '%';
      t.style.top = (5 + Math.random() * 90) + '%';
      t.style.animation = `twinkle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 5}s infinite`;
      container.appendChild(t);
    }
  }

  // Apply bg effects to all sections
  document.querySelectorAll('.about, .events, .wedding, .testimonials, .cta-section').forEach(section => {
    // Add bg-effects container if not already present
    if (!section.querySelector('.bg-effects')) {
      const div = document.createElement('div');
      div.className = 'bg-effects';
      section.prepend(div);
    }
    createBgEffects(section);
  });

  /* ----- Intersection Observer for reveals ----- */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        if (el.classList.contains('reveal-stagger')) {
          Array.from(el.children).forEach((child, i) => {
            const delay = child.dataset.delay || i * 120;
            setTimeout(() => { child.style.opacity = '1'; child.style.transform = 'translateY(0)'; }, delay);
          });
          el.classList.add('visible');
        } else {
          const delay = parseInt(el.dataset.delay) || 0;
          setTimeout(() => { el.classList.add('visible'); }, delay);
        }

        revealObserver.unobserve(el);
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger, .event-card, .testimonial-card').forEach((el, i) => {
    if (el.classList.contains('event-card') || el.classList.contains('testimonial-card')) {
      const row = Math.floor(i / 2);
      const col = i % 2;
      el.dataset.delay = (row * 150) + (col * 100);
    }
    revealObserver.observe(el);
  });

  // Observe section label, title, subtitle
  document.querySelectorAll('section').forEach(section => {
    const els = [
      section.querySelector('.section-label'),
      section.querySelector('.section-title'),
      section.querySelector('.section-subtitle')
    ];
    els.forEach((el, i) => {
      if (el && !el.classList.contains('reveal') && !el.closest('.reveal-stagger')) {
        el.classList.add('reveal');
        el.dataset.delay = i * 130;
        revealObserver.observe(el);
      }
    });
  });

  // Observe .about-grid, .wedding-frame, .cta-content
  document.querySelectorAll('.about-grid, .wedding-frame, .cta-content').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  /* ----- Hero parallax ----- */
  const hero = document.querySelector('.hero');
  const heroImg = hero?.querySelector('.hero-img');

  window.addEventListener('scroll', () => {
    const sy = window.pageYOffset;
    if (heroImg && sy < window.innerHeight) {
      heroImg.style.transform = `scale(1) translateY(${sy * 0.15}px)`;
    }
  }, { passive: true });

  /* ----- Smooth scroll ----- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.pageYOffset - 90,
          behavior: 'smooth'
        });
      }
    });
  });

});

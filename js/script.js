/* ========== FZ Eventz v2 — Premium Interactions ========== */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Navigation scroll effect ----- */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.pageYOffset > 60);
  });

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

  function openOverlay() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeOverlay() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  overlayTriggers.forEach(t => t.addEventListener('click', openOverlay));
  overlayClose.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeOverlay(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay(); });

  /* ----- Lead form submission ----- */
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

  /* ----- Intersection Observer for reveal animations ----- */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // Stagger children if container has stagger class
        if (el.classList.contains('reveal-stagger')) {
          const children = el.children;
          Array.from(children).forEach((child, i) => {
            const delay = child.dataset.delay || i * 100;
            setTimeout(() => { child.style.opacity = '1'; child.style.transform = 'translateY(0)'; }, delay);
          });
          el.classList.add('visible');
        } else {
          // Check for data-delay on individual elements
          const delay = parseInt(el.dataset.delay) || 0;
          setTimeout(() => { el.classList.add('visible'); }, delay);
        }

        revealObserver.unobserve(el);
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger, .event-card, .testimonial-card').forEach((el, i) => {
    // Set staggered delays for event cards and testimonial cards
    if (el.classList.contains('event-card') || el.classList.contains('testimonial-card')) {
      const row = Math.floor(i / 2);
      const col = i % 2;
      el.dataset.delay = (row * 150) + (col * 100);
    }
    revealObserver.observe(el);
  });

  // Also observe section-label and section-title within sections
  document.querySelectorAll('section').forEach(section => {
    const label = section.querySelector('.section-label');
    const title = section.querySelector('.section-title');
    const sub = section.querySelector('.section-subtitle');
    [label, title, sub].forEach((el, i) => {
      if (el && !el.classList.contains('reveal') && !el.closest('.reveal-stagger')) {
        el.classList.add('reveal');
        el.dataset.delay = i * 120;
        revealObserver.observe(el);
      }
    });
  });

  // Observe about-grid, wedding-frame, cta-content
  document.querySelectorAll('.about-grid, .wedding-frame, .cta-content').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  /* ----- Parallax hero on scroll ----- */
  const hero = document.querySelector('.hero');
  const heroImage = hero?.querySelector('.hero-image');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    if (heroImage && scrollY < window.innerHeight) {
      const speed = 0.3;
      heroImage.style.transform = `scale(1.05) translateY(${scrollY * speed * 0.1}px)`;
    }
  }, { passive: true });

  /* ----- Smooth anchor scroll with offset ----- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 90;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
      }
    });
  });

});

/* ========== FZ Eventz v4 — DeepSeek V4 Flash Ultimate ========== */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Cursor Glow ----- */
  const cursor = document.createElement('div');
  cursor.id = 'cursor-glow';
  document.body.appendChild(cursor);

  let mouseX = -200, mouseY = -200;
  let currentX = -200, currentY = -200;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;
    cursor.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  /* ----- Nav scroll ----- */
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

  /* ----- Overlay ----- */
  const overlay = document.getElementById('leadOverlay');
  const overlayTriggers = document.querySelectorAll('[data-open-overlay]');
  const overlayClose = document.querySelector('.overlay-close');

  function openOverlay() { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeOverlay() { overlay.classList.remove('open'); document.body.style.overflow = ''; }
  overlayTriggers.forEach(t => t.addEventListener('click', openOverlay));
  overlayClose.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeOverlay(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay(); });

  /* ----- Form submission (overlay) ----- */
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
        `Name: ${data.name}%0A` + `Phone: ${data.phone}%0A` +
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

  /* ----- Contact page form submission ----- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      const data = {};
      new FormData(contactForm).forEach((v, k) => { data[k] = v; });
      const msg = `*New Lead from FZ Eventz Contact Form*%0A%0A` +
        `Name: ${data.contactName}%0A` + `Phone: ${data.contactPhone}%0A` +
        `Email: ${data.contactEmail || 'N/A'}%0A` +
        `Event Type: ${data.contactEvent || 'N/A'}%0A` +
        `Message: ${data.contactMessage || 'N/A'}`;
      setTimeout(() => {
        window.open(`https://wa.me/918970118819?text=${msg}`, '_blank');
        btn.textContent = 'Sent! ✓';
        btn.style.background = '#22c55e';
        setTimeout(() => {
          contactForm.reset();
          btn.textContent = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 1500);
      }, 600);
    });
  }

  /* ----- Background Effects ----- */
  function createBgEffects(section) {
    let container = section.querySelector('.bg-effects');
    if (!container) {
      container = document.createElement('div');
      container.className = 'bg-effects';
      section.prepend(container);
    }

    // Gold particles
    for (let i = 0; i < 16; i++) {
      const p = document.createElement('div');
      p.className = 'gold-particle';
      const size = 2 + Math.random() * 3;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = (3 + Math.random() * 94) + '%';
      p.style.bottom = '-10px';
      const dur = 14 + Math.random() * 20;
      const delay = Math.random() * 18;
      const anim = ['floatP1', 'floatP2', 'floatP3'][Math.floor(Math.random() * 3)];
      p.style.animation = `${anim} ${dur}s ease-in-out ${delay}s infinite`;
      container.appendChild(p);
    }

    // Shimmer lines
    for (let i = 0; i < 4; i++) {
      const l = document.createElement('div');
      l.className = 'shimmer-line';
      l.style.width = (15 + Math.random() * 45) + '%';
      l.style.top = (5 + Math.random() * 90) + '%';
      const dur = 12 + Math.random() * 16;
      const delay = Math.random() * 12;
      l.style.animation = `${i % 2 === 0 ? 'shim1' : 'shim2'} ${dur}s ease-in-out ${delay}s infinite`;
      container.appendChild(l);
    }

    // Twinkle stars
    for (let i = 0; i < 12; i++) {
      const t = document.createElement('div');
      t.className = 'twinkle-dot';
      t.style.width = (2 + Math.random() * 2) + 'px';
      t.style.height = t.style.width;
      t.style.left = (3 + Math.random() * 94) + '%';
      t.style.top = (3 + Math.random() * 94) + '%';
      t.style.animation = `twinkle ${2.5 + Math.random() * 4}s ease-in-out ${Math.random() * 6}s infinite`;
      container.appendChild(t);
    }

    // Geometric rings (for variety)
    if (Math.random() > 0.5) {
      for (let i = 0; i < 2; i++) {
        const r = document.createElement('div');
        r.className = 'geo-ring';
        const s = 40 + Math.random() * 80;
        r.style.width = s + 'px';
        r.style.height = s + 'px';
        r.style.left = (10 + Math.random() * 80) + '%';
        r.style.top = (10 + Math.random() * 80) + '%';
        r.style.animation = `ringRotate ${20 + Math.random() * 20}s linear infinite, ringFloat ${4 + Math.random() * 3}s ease-in-out infinite`;
        container.appendChild(r);
      }
    }
  }

  // Apply bg effects
  document.querySelectorAll('.about, .events, .wedding, .testimonials, .contact-section, .cta-section').forEach(createBgEffects);

  /* ----- 3D Tilt on Event Cards ----- */
  const cards = document.querySelectorAll('.event-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  /* ----- Counter Animation for Stats ----- */
  function animateCounter(el, target) {
    const duration = 2000;
    const start = performance.now();
    const isFloat = target % 1 !== 0;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (isFloat) {
        el.textContent = current.toFixed(1) + '+';
      } else {
        el.textContent = Math.floor(current) + '+';
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + '+';
      }
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const num = parseFloat(text) || 0;
        if (num > 0) {
          animateCounter(el, num);
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-item h3').forEach(el => counterObserver.observe(el));

  /* ----- Intersection Observer for reveals ----- */
  const revealOptions = { threshold: 0.08, rootMargin: '0px 0px -60px 0px' };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        if (el.classList.contains('reveal-stagger')) {
          Array.from(el.children).forEach((child, i) => {
            const delay = child.dataset.delay || i * 130;
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, delay);
          });
          el.classList.add('visible');
        } else {
          const delay = parseInt(el.dataset.delay) || 0;
          setTimeout(() => { el.classList.add('visible'); }, delay);
        }
        revealObserver.unobserve(el);
      }
    });
  }, revealOptions);

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up-down, .reveal-stagger, .event-card, .testimonial-card').forEach((el, i) => {
    if (el.classList.contains('event-card') || el.classList.contains('testimonial-card')) {
      const row = Math.floor(i / 2);
      const col = i % 2;
      el.dataset.delay = (row * 160) + (col * 120);
    }
    revealObserver.observe(el);
  });

  document.querySelectorAll('section').forEach(section => {
    [section.querySelector('.section-label'), section.querySelector('.section-title'), section.querySelector('.section-subtitle')].forEach((el, i) => {
      if (el && !el.classList.contains('reveal') && !el.closest('.reveal-stagger')) {
        el.classList.add('reveal');
        el.dataset.delay = i * 140;
        revealObserver.observe(el);
      }
    });
  });

  document.querySelectorAll('.about-grid, .wedding-frame, .cta-content, .contact-grid').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  /* ----- Hero parallax ----- */
  const hero = document.querySelector('.hero');
  const heroImg = hero?.querySelector('.hero-img');

  window.addEventListener('scroll', () => {
    const sy = window.pageYOffset;
    if (heroImg && sy < window.innerHeight) {
      heroImg.style.transform = `scale(1) translateY(${sy * 0.12}px)`;
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

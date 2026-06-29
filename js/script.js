/* ========== FZ Eventz — Interactions ========== */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Navigation scroll effect ----- */
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  /* ----- Mobile menu toggle ----- */
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
  const overlayTriggers = document.querySelectorAll('[data-open-overlay]');
  const overlay = document.getElementById('leadOverlay');
  const overlayClose = document.querySelector('.overlay-close');

  overlayTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeOverlay() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  overlayClose.addEventListener('click', closeOverlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeOverlay();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay();
  });

  /* ----- Staggered card reveal on scroll ----- */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.event-card, .wedding-frame, .about-grid, .testimonial-card').forEach((el, i) => {
    el.dataset.delay = i * 80;
    observer.observe(el);
  });

  /* ----- Lead form submission ----- */
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = leadForm.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(leadForm);
      const data = {};
      formData.forEach((value, key) => { data[key] = value; });

      // Format for WhatsApp (since we're not running a backend)
      const message = `*New Lead from FZ Eventz Website*%0A%0A` +
        `Name: ${data.name}%0A` +
        `Phone: ${data.phone}%0A` +
        `Email: ${data.email || 'N/A'}%0A` +
        `Event Type: ${data.eventType || 'N/A'}%0A` +
        `Message: ${data.message || 'N/A'}`;

      // Small delay to show the sending state
      setTimeout(() => {
        window.open(`https://wa.me/918970118819?text=${message}`, '_blank');
        submitBtn.textContent = 'Sent! ✓';
        submitBtn.style.background = '#22c55e';
        submitBtn.style.color = '#fff';

        setTimeout(() => {
          closeOverlay();
          leadForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
        }, 1500);
      }, 600);
    });
  }

  /* ----- Smooth anchor scroll with offset ----- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

});

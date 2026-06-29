// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.preloader').classList.add('hidden');
  }, 600);
});

// ===== NAV SCROLL =====
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.pageYOffset;
  if (current > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  lastScroll = current;
});

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navAnchors.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ===== LEAD FORM =====
const formOverlay = document.getElementById('leadForm');
const formTriggers = document.querySelectorAll('[data-form-trigger]');
const formClose = document.querySelector('.form-close');

formTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    formOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeForm() {
  formOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

formClose.addEventListener('click', closeForm);
formOverlay.addEventListener('click', (e) => {
  if (e.target === formOverlay) closeForm();
});

// ===== STAGGERED SERVICE CARD REVEAL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card').forEach((card, index) => {
  card.dataset.delay = index * 150;
  observer.observe(card);
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== HERO PARTICLES =====
(function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (6 + Math.random() * 4) + 's';
    particle.style.width = particle.style.height = (2 + Math.random() * 3) + 'px';
    container.appendChild(particle);
  }
})();

// ===== TESTIMONIALS CLONE FOR INFINITE SCROLL =====
(function initTestimonials() {
  const track = document.querySelector('.testimonials-track');
  if (!track) return;
  const clones = track.innerHTML;
  track.innerHTML += clones;
})();

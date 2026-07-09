/**
 * =====================================================
 *  DIVYANSH JAIN PORTFOLIO — script.js
 *  Editorial Theme | Interactions & Animations
 * =====================================================
 */

'use strict';

/* ───────────────────────────────────────────────────
   INIT ON DOM READY
─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTypingAnimation();
  initNavbar();
  initHamburger();
  initSmoothScroll();
  initScrollReveal();
  initSkillBars();
  initCounterAnimation();
  initHeroCounters();
  initContactForm();
  initScrollTop();
  initActiveNavHighlight();
  initProjectCardParallax();
});


/* ───────────────────────────────────────────────────
   1. TYPING ANIMATION
─────────────────────────────────────────────────── */
function initTypingAnimation() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = [
    'Aspiring AI Engineer',
    'Full Stack Developer',
    'C++ & DSA Enthusiast',
    'Machine Learning Explorer',
    'Problem Solver',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let isPaused    = false;

  function tick() {
    const current = phrases[phraseIndex];

    if (isPaused) {
      isPaused   = false;
      isDeleting = true;
      setTimeout(tick, 500);
      return;
    }

    if (isDeleting) {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting   = false;
        phraseIndex  = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 400);
      } else {
        setTimeout(tick, 38);
      }
    } else {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        isPaused = true;
        setTimeout(tick, 2400);
      } else {
        setTimeout(tick, 72);
      }
    }
  }

  setTimeout(tick, 900);
}


/* ───────────────────────────────────────────────────
   2. NAVBAR — shadow + scroll class
─────────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const update = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}


/* ───────────────────────────────────────────────────
   3. HAMBURGER MENU
─────────────────────────────────────────────────── */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  if (!hamburger || !navMenu) return;

  const toggle = () => {
    const isOpen = hamburger.classList.toggle('open');
    navMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const close = () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggle);
  navMenu.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', close));
  document.addEventListener('click', e => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) close();
  });
}


/* ───────────────────────────────────────────────────
   4. SMOOTH SCROLLING
─────────────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = document.getElementById('navbar')?.offsetHeight || 0;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}


/* ───────────────────────────────────────────────────
   5. ACTIVE NAV HIGHLIGHTING
─────────────────────────────────────────────────── */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  const navH     = document.getElementById('navbar')?.offsetHeight || 70;

  const update = () => {
    const pos = window.scrollY + navH + 20;
    let current = '';
    sections.forEach(s => { if (s.offsetTop <= pos) current = s.id; });
    links.forEach(l => l.classList.toggle('active', l.dataset.section === current));
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}


/* ───────────────────────────────────────────────────
   6. SCROLL REVEAL — Intersection Observer
─────────────────────────────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.delay || 0, 10);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => obs.observe(el));
}


/* ───────────────────────────────────────────────────
   7. SKILL BAR ANIMATION
─────────────────────────────────────────────────── */
function initSkillBars() {
  const fills = document.querySelectorAll('.sr-fill');
  if (!fills.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const fill  = entry.target;
      const width = fill.getAttribute('data-width');
      if (width) setTimeout(() => { fill.style.width = width + '%'; }, 150);
      obs.unobserve(fill);
    });
  }, { threshold: 0.4 });

  fills.forEach(f => obs.observe(f));
}


/* ───────────────────────────────────────────────────
   8. ACHIEVEMENT COUNTER ANIMATION
─────────────────────────────────────────────────── */
function initCounterAnimation() {
  const cards = document.querySelectorAll('.ach-card');
  if (!cards.length) return;

  let fired = false;
  const obs = new IntersectionObserver((entries) => {
    if (!fired && entries.some(e => e.isIntersecting)) {
      fired = true;
      animateNums('.ac-num');
      obs.disconnect();
    }
  }, { threshold: 0.3 });

  cards.forEach(c => obs.observe(c));
}

/**
 * Hero stats counter (smaller inline counters)
 */
function initHeroCounters() {
  const nums = document.querySelectorAll('.hs-num[data-target]');
  if (!nums.length) return;

  let fired = false;
  const obs = new IntersectionObserver((entries) => {
    if (!fired && entries.some(e => e.isIntersecting)) {
      fired = true;
      // Animate hero stat numbers with a delay
      nums.forEach((el, i) => {
        setTimeout(() => animateSingleCounter(el), i * 150 + 600);
      });
      obs.disconnect();
    }
  }, { threshold: 0.5 });

  const hero = document.querySelector('.hero-stats');
  if (hero) obs.observe(hero);
}

function animateNums(selector) {
  document.querySelectorAll(selector).forEach((el, idx) => {
    setTimeout(() => animateSingleCounter(el), idx * 130);
  });
}

function animateSingleCounter(el) {
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1600;
  const step     = 18;
  const steps    = Math.floor(duration / step);
  let   i        = 0;

  const timer = setInterval(() => {
    i++;
    const ease    = 1 - Math.pow(1 - i / steps, 3); // ease-out cubic
    el.textContent = Math.round(ease * target).toLocaleString();
    if (i >= steps) {
      clearInterval(timer);
      el.textContent = target.toLocaleString();
    }
  }, step);
}


/* ───────────────────────────────────────────────────
   9. CONTACT FORM
─────────────────────────────────────────────────── */
function initContactForm() {
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const btn    = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      setStatus('Please fill in all fields.', 'error'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('Please enter a valid email address.', 'error'); return;
    }

    btn.disabled = true;
    btn.querySelector('span').textContent = 'Sending…';

    // Simulate API call — replace with Formspree / EmailJS
    await new Promise(r => setTimeout(r, 1300));

    btn.disabled = false;
    btn.querySelector('span').textContent = 'Send Message';
    setStatus('Message sent! I\'ll get back to you soon. ✓', 'success');
    form.reset();
  });

  function setStatus(msg, type) {
    status.textContent = msg;
    status.className   = 'form-status ' + type;
    setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 5500);
  }
}


/* ───────────────────────────────────────────────────
   10. SCROLL-TO-TOP BUTTON
─────────────────────────────────────────────────── */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}


/* ───────────────────────────────────────────────────
   11. PROJECT CARD SUBTLE PARALLAX
─────────────────────────────────────────────────── */
function initProjectCardParallax() {
  // Prefer reduced motion check
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left - rect.width  / 2) / rect.width;
      const y    = (e.clientY - rect.top  - rect.height / 2) / rect.height;
      card.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 3}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}


/* ───────────────────────────────────────────────────
   12. COLLAGE IMAGE HOVER (subtle zoom handled in CSS)
       + gentle parallax on hero scroll
─────────────────────────────────────────────────── */
(function initHeroScrollParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;

  const collageMain = document.querySelector('.collage-main .collage-img');
  const collageAlt  = document.querySelector('.collage-secondary .collage-img');

  function onScroll() {
    const scrollY = window.scrollY;
    if (collageMain) collageMain.style.transform = `translateY(${scrollY * 0.08}px)`;
    if (collageAlt)  collageAlt.style.transform  = `translateY(${-scrollY * 0.05}px)`;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ───────────────────────────────────────────────────
   13. ABOUT PORTRAIT HOVER TILT
─────────────────────────────────────────────────── */
(function initPortraitTilt() {
  if (window.matchMedia('(hover: none)').matches) return;
  const portrait = document.querySelector('.about-portrait');
  if (!portrait) return;

  portrait.addEventListener('mousemove', e => {
    const rect = portrait.getBoundingClientRect();
    const x    = (e.clientX - rect.left - rect.width  / 2) / rect.width;
    const y    = (e.clientY - rect.top  - rect.height / 2) / rect.height;
    portrait.querySelector('.portrait-initials').style.transform =
      `perspective(400px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
  });
  portrait.addEventListener('mouseleave', () => {
    const el = portrait.querySelector('.portrait-initials');
    if (el) el.style.transform = '';
  });
})();


/* ───────────────────────────────────────────────────
   14. INTEREST TAG HOVER — ripple effect
─────────────────────────────────────────────────── */
document.querySelectorAll('.interest-tag').forEach(tag => {
  tag.addEventListener('click', function () {
    this.style.transform = 'scale(0.96)';
    setTimeout(() => { this.style.transform = ''; }, 120);
  });
});


/* ───────────────────────────────────────────────────
   15. FOOTER YEAR (auto-update)
─────────────────────────────────────────────────── */
(function updateFooterYear() {
  const copy = document.querySelector('.footer-copy');
  if (copy) {
    const year = new Date().getFullYear();
    copy.textContent = copy.textContent.replace('2026', String(year));
  }
})();

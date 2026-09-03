(() => {
  'use strict';

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // Service Areas dropdown (touch support + close on outside click / Escape)
  document.querySelectorAll('.nav__dropdown').forEach(drop => {
    const btn = drop.querySelector('.nav__dropbtn');
    btn?.addEventListener('click', e => {
      e.stopPropagation();
      const open = drop.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.nav__dropdown.open').forEach(drop => {
      drop.classList.remove('open');
      drop.querySelector('.nav__dropbtn')?.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav__dropdown.open').forEach(drop => {
        drop.classList.remove('open');
        drop.querySelector('.nav__dropbtn')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Nav hide/show on scroll
  let lastScroll = 0;
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 80) {
      nav.classList.toggle('hidden', current > lastScroll && current > 80);
    } else {
      nav.classList.remove('hidden');
    }
    lastScroll = current;
  }, { passive: true });

  // Testimonial slider
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let current = 0;
  let autoInterval;

  function goTo(index) {
    if (!testimonials.length) return;
    testimonials[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + testimonials.length) % testimonials.length;
    testimonials[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  prevBtn?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index));
      resetAuto();
    });
  });

  function resetAuto() {
    if (!testimonials.length) return;
    clearInterval(autoInterval);
    autoInterval = setInterval(() => goTo(current + 1), 5000);
  }
  resetAuto();

  // Scroll-scrubbed reveal: animation progress follows scroll position
  const scrubEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function scrubReveal() {
    const vh = window.innerHeight;
    const start = vh;      // element top at viewport bottom
    const end = vh * 0.55; // fully revealed just above middle
    scrubEls.forEach(el => {
      const top = el.getBoundingClientRect().top;
      const m = /stagger-(\d)/.exec(el.className);
      const lag = m ? parseInt(m[1], 10) * 0.06 : 0;
      let p = (start - top) / (start - end);
      p = Math.max(0, Math.min(1, (p - lag) / (1 - lag)));
      const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
      let x = 0, y = 40 * (1 - e), s = 0.98 + 0.02 * e;
      if (el.classList.contains('reveal-left')) { x = -60 * (1 - e); y = 0; }
      else if (el.classList.contains('reveal-right')) { x = 60 * (1 - e); y = 0; }
      else if (el.classList.contains('reveal-up')) { y = 60 * (1 - e); s = 1; }
      el.style.opacity = e.toFixed(3);
      el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) scale(' + s.toFixed(4) + ')';
    });
  }

  if (reduceMotion) {
    scrubEls.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
  } else {
    document.body.classList.add('scrub');
    scrubEls.forEach(el => el.classList.remove('visible'));
    let ticking = false;
    const requestScrub = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(() => { scrubReveal(); ticking = false; }); }
    };
    window.addEventListener('scroll', requestScrub, { passive: true });
    window.addEventListener('resize', requestScrub);
    scrubReveal();
  }

  // mailto: with Gmail fallback (no mail client configured)
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const mailto = link.getAttribute('href');
      const match = /^mailto:([^?]+)(?:\?subject=(.*))?$/.exec(mailto);
      const gmail = 'https://mail.google.com/mail/?view=cm&fs=1&to='
        + encodeURIComponent(match[1])
        + (match[2] ? '&su=' + encodeURIComponent(decodeURIComponent(match[2])) : '');
      let opened = false;
      const onBlur = () => { opened = true; window.removeEventListener('blur', onBlur); };
      window.addEventListener('blur', onBlur);
      window.location.href = mailto;
      setTimeout(() => {
        window.removeEventListener('blur', onBlur);
        if (!opened) window.open(gmail, '_blank', 'noopener');
      }, 800);
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();

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
    clearInterval(autoInterval);
    autoInterval = setInterval(() => goTo(current + 1), 5000);
  }
  resetAuto();

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
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

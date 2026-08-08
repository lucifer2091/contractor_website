// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// Scroll reveal
let scrollDirection = 'down';
let lastY = 0;

window.addEventListener('scroll', () => {
  scrollDirection = window.scrollY > lastY ? 'down' : 'up';
  lastY = window.scrollY;
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else if (scrollDirection === 'up') {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px 100px 0px' });

// Auto-add reveal classes
function addRevealClasses() {
  document.querySelectorAll('.label').forEach(el => el.classList.add('reveal'));
  
  document.querySelectorAll('h2').forEach(el => {
    el.classList.add('reveal');
    el.classList.add('stagger-1');
  });
  
  document.querySelectorAll('.section__sub').forEach(el => {
    el.classList.add('reveal');
    el.classList.add('stagger-2');
  });
  
  document.querySelectorAll('.about__image').forEach(el => el.classList.add('reveal-left'));
  document.querySelectorAll('.about__text').forEach(el => el.classList.add('reveal-right'));
  
  document.querySelectorAll('.about__highlight').forEach((el, i) => {
    el.classList.add('reveal-right');
    el.classList.add(`stagger-${i + 2}`);
  });
  
  document.querySelectorAll('.service').forEach((el, i) => {
    el.classList.add('reveal');
    el.classList.add(`stagger-${i + 1}`);
  });
  
  document.querySelectorAll('.gallery__item').forEach((el, i) => {
    el.classList.add('reveal');
    el.classList.add(`stagger-${(i % 4) + 1}`);
  });
  
  document.querySelectorAll('.why-choose__point').forEach((el, i) => {
    el.classList.add('reveal');
    el.classList.add(`stagger-${i + 1}`);
  });
  
  document.querySelectorAll('.why-choose__tags').forEach(el => {
    el.classList.add('reveal');
    el.classList.add('stagger-5');
  });
  
  document.querySelectorAll('.reviews-summary').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.testimonials').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.contact__form').forEach(el => el.classList.add('reveal-left'));
  document.querySelectorAll('.contact__info').forEach(el => el.classList.add('reveal-right'));
  
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

addRevealClasses();

// Counter animation
function animateCounter(el, target) {
  let current = 0;
  const increment = target / 30;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current.toFixed(1);
  }, 30);
}

const scoreEl = document.querySelector('.reviews-summary__score strong');
if (scoreEl) {
  const scoreObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(scoreEl, 5.0);
        scoreObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  scoreObserver.observe(scoreEl);
}

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
let current = 0;
let interval;

function show(index) {
  testimonials.forEach(t => t.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  testimonials[index].classList.add('active');
  dots[index].classList.add('active');
  current = index;
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    show(parseInt(dot.dataset.index));
    resetInterval();
  });
});

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(() => show((current + 1) % testimonials.length), 5000);
}

resetInterval();

// Contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    const orig = btn.textContent;
    btn.textContent = 'Sent!';
    btn.style.background = '#16a34a';
    form.reset();
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
    }, 3000);
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

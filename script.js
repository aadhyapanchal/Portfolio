/* =====================================================
   AADHYA PANCHAL — PORTFOLIO JAVASCRIPT
   Features:
   1. Dark / Light mode toggle
   2. Mobile hamburger menu open / close
   3. Contact form validation before submit
   4. Typing animation in hero
   5. Skill bar animation on scroll (IntersectionObserver)
   6. Active nav highlight on scroll
   ===================================================== */

/* ---- 1. DARK / LIGHT MODE TOGGLE ---- */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const body        = document.body;

// Load saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
} else {
  body.classList.remove('dark-mode');
  themeIcon.classList.remove('fa-sun');
  themeIcon.classList.add('fa-moon');
}

themeToggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-mode');
  if (isDark) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
});


/* ---- 2. HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


/* ---- 3. CONTACT FORM VALIDATION ---- */
const form = document.getElementById('contact-form');

function showError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.add('invalid');
  error.textContent = message;
}

function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.remove('invalid');
  error.textContent = '';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Clear previous errors
  ['name', 'email', 'subject', 'message'].forEach(id => clearError(id, `${id}-error`));

  if (!name) {
    showError('name', 'name-error', 'Please enter your name.');
    valid = false;
  }
  if (!email) {
    showError('email', 'email-error', 'Please enter your email.');
    valid = false;
  } else if (!validateEmail(email)) {
    showError('email', 'email-error', 'Please enter a valid email address.');
    valid = false;
  }
  if (!subject) {
    showError('subject', 'subject-error', 'Please enter a subject.');
    valid = false;
  }
  if (!message) {
    showError('message', 'message-error', 'Please enter a message.');
    valid = false;
  }

  if (valid) {
    // Show success message (no actual send — static site)
    const successMsg = document.getElementById('form-success');
    successMsg.classList.add('show');
    form.reset();
    setTimeout(() => successMsg.classList.remove('show'), 4000);
  }
});


/* ---- 4. TYPING ANIMATION ---- */
const typedEl = document.getElementById('typed-text');
const phrases = [
  'Information Technology Student',
  'Web Developer',
  'Problem Solver',
  'GTU Diploma Graduate'
];
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingDelay = 100;

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    typingDelay = 50;
  } else {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    typingDelay = 100;
  }

  if (!isDeleting && charIndex === current.length) {
    typingDelay = 1800; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingDelay = 400;
  }

  setTimeout(type, typingDelay);
}
setTimeout(type, 600);


/* ---- 5. SKILL BAR ANIMATION ON SCROLL ---- */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.dataset.width + '%';
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));


/* ---- 6. ACTIVE NAV HIGHLIGHT ON SCROLL ---- */
const sections   = document.querySelectorAll('section[id]');
const navItems   = document.querySelectorAll('.nav-item');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => item.classList.remove('active'));
      const active = document.querySelector(`.nav-item[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => navObserver.observe(section));


/* ---- BONUS: Smooth header shadow on scroll ---- */
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.style.boxShadow = '0 4px 24px rgba(34,34,59,0.12)';
  } else {
    header.style.boxShadow = 'none';
  }
});

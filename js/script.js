// script.js - Portfolio Interactivity

// DOM Elements
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');

const fadeElements = document.querySelectorAll('.fade-in, .skill-node, .skill-subnode, .project-card, .certificate-card');


// Navbar functionality
function toggleMobileMenu() {
  navList.classList.toggle('active');
  hamburger.classList.toggle('active');
}

// Smooth scrolling for nav links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      toggleMobileMenu();
    }
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Navbar active state on scroll
function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate', 'visible');
    }
  });
}, observerOptions);


// Observe elements for animation
fadeElements.forEach(el => observer.observe(el));

// Project GitHub hover functionality
document.querySelectorAll('.project-card[data-repo]').forEach(card => {
  const repoUrl = card.dataset.repo;
  const hoverIcon = card.querySelector('.github-hover-icon');
  
  if (hoverIcon) {
    hoverIcon.href = repoUrl;
  }
});


// Certificate Modal Functionality
const certificateCards = document.querySelectorAll('.certificate-card');
const modal = document.getElementById('certificate-modal');
const certImage = document.getElementById('cert-image');
const closeModal = document.querySelector('.close-modal');

certificateCards.forEach(card => {
  const viewBtn = card.querySelector('.view-cert-btn');
  const certSrc = card.dataset.cert;
  
  viewBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    certImage.src = certSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    navbar.style.backdropFilter = 'blur(30px)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.05)';
  }
  updateActiveNav();
});

// Mobile menu toggle
if (hamburger) {
  hamburger.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!navList.contains(e.target) && !hamburger.contains(e.target)) {
    navList.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

// Contact form handling (UI feedback only)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! This is a demo form.');
    contactForm.reset();
  });
}

// Theme Toggle Functionality (Animated Sun/Moon)
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const isLight = savedTheme === 'light' || (!savedTheme && !prefersDark);
  
  if (isLight) {
    body.classList.add('light');
    themeToggle.classList.add('active');
  } else {
    themeToggle.classList.remove('active');
  }
}

function toggleTheme() {
  body.classList.toggle('light');
  themeToggle.classList.toggle('active');
  
  const isLight = body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Event listeners
themeToggle.addEventListener('click', toggleTheme);
themeToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleTheme();
  }
});

if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', initTheme);
}

// Dark mode particles
function initParticles() {
  const hero = document.querySelector('.hero');
  const canvas = document.createElement('canvas');
  canvas.id = 'hero-particles';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1';
  hero.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  function resizeCanvas() {
    canvas.width = hero.clientWidth;
    canvas.height = hero.clientHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.8 + 0.2),
      radius: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.15 + 0.05,
      life: 1.0,
      decay: 0.98 + Math.random() * 0.01
    };
  }

  function animateParticles() {
    if (body.classList.contains('light')) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationId);
      return;
    }

    ctx.save();
    ctx.filter = 'blur(1px)';
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(148, 163, 184, 0.08)';
    particles.forEach((p, index) => {
      ctx.globalAlpha = p.opacity * p.life;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Gentle floating motion
      p.x += p.vx;
      p.y += p.vy;
      p.vy *= 0.995; // Slow upward drift
      p.life *= p.decay;
      p.opacity = 0.08 + (p.life * 0.12);

      // Respawn from bottom
      if (p.y < -20 || p.life < 0.01) {
        particles[index] = createParticle();
      }
    });

    ctx.restore();
    animationId = requestAnimationFrame(animateParticles);
  }

  // Create initial particles
  for (let i = 0; i < 30; i++) {
    particles.push(createParticle());
  }

  // Start animation when not in light mode
  if (!body.classList.contains('light')) {
    animateParticles();
  }

  // Listen for theme changes
  const observer = new MutationObserver(() => {
    if (body.classList.contains('light')) {
      cancelAnimationFrame(animationId);
    } else {
      animateParticles();
    }
  });
  observer.observe(body, { attributes: true, attributeFilter: ['class'] });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initParticles();
  
  // Preload animations for hero
  setTimeout(() => {
    document.querySelector('.hero-content h1').style.animationPlayState = 'running';
  }, 100);
});



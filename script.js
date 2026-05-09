// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});
// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

// ===== TYPEWRITER EFFECT =====
const roles = ['Python Developer', 'AI & ML Student', 'Web Developer', 'Problem Solver'];
const typewriterEl = document.getElementById('typewriter');
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typewrite() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typewriterEl.textContent = currentRole.substring(0, charIndex--);
    if (charIndex < 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; }
    setTimeout(typewrite, 40);
  } else {
    typewriterEl.textContent = currentRole.substring(0, charIndex++);
    if (charIndex > currentRole.length) { isDeleting = true; setTimeout(typewrite, 1800); }
    else setTimeout(typewrite, 80);
  }
}
typewrite();

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ===== ANIMATED COUNTERS =====
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute('data-count');
      let count = 0;
      const step = Math.ceil(target / 40);
      const interval = setInterval(() => {
        count += step;
        if (count >= target) { count = target; clearInterval(interval); }
        counter.textContent = count;
      }, 40);
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.getAttribute('data-width') + '%';
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bar-fill').forEach(el => skillObserver.observe(el));

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #00d4aa, #00b894)';
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.style.background = '';
    this.reset();
  }, 3000);
});

// ===== FLOATING PARTICLES =====
(function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    Object.assign(p.style, {
      position: 'absolute',
      width: size + 'px', height: size + 'px',
      background: `rgba(${Math.random() > 0.5 ? '108,99,255' : '0,212,170'}, ${Math.random() * 0.3 + 0.1})`,
      borderRadius: '50%',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
      animationDelay: Math.random() * 5 + 's'
    });
    container.appendChild(p);
  }

  // Add float keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
      25% { transform: translate(${rand()}px, ${rand()}px) scale(1.2); opacity: 0.8; }
      50% { transform: translate(${rand()}px, ${rand()}px) scale(0.8); opacity: 0.3; }
      75% { transform: translate(${rand()}px, ${rand()}px) scale(1.1); opacity: 0.6; }
    }
  `;
  document.head.appendChild(style);

  function rand() { return Math.floor(Math.random() * 60 - 30); }
})();

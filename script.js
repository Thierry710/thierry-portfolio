// ===== TYPED TEXT EFFECT =====
const typedEl = document.getElementById('typed');
const phrases = [
    'Cybersecurity Enthusiast',
    'Software Engineer',
    'SIEM Specialist',
    'Backend Developer',
    'Security Researcher',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
        typedEl.textContent = current.slice(0, charIndex--);
    } else {
        typedEl.textContent = current.slice(0, charIndex++);
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex > current.length) {
        isDeleting = true;
        delay = 1800;
    } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
    }

    setTimeout(type, delay);
}

type();

// ===== NAVBAR & BACK-TO-TOP ON SCROLL =====
const navbar = document.getElementById('navbar');
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

// ===== ACTIVE NAV LINK ON SCROLL =====
const allSections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { threshold: 0.35 });

allSections.forEach(s => sectionObserver.observe(s));

// ===== SMOOTH SCROLL =====
const navLinksMenu = document.getElementById('nav-links');
const hamburger = document.getElementById('hamburger');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: offset, behavior: 'smooth' });
        if (navLinksMenu.classList.contains('open')) {
            navLinksMenu.classList.remove('open');
            hamburger.classList.remove('open');
        }
    });
});

// ===== HAMBURGER MENU =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksMenu.classList.toggle('open');
});

// ===== BACK TO TOP =====
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SCROLL REVEAL =====
const revealTargets = [
    '.section-header',
    '.about-text',
    '.highlight-card',
    '.skill-category',
    '.project-card',
    '.cert-card',
    '.contact-item',
    '.contact-cta',
];

document.querySelectorAll(revealTargets.join(', ')).forEach(el => {
    el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

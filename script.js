// Initialize AOS
AOS.init({
    duration: 1200,
    once: false,
    mirror: true,
    offset: 100
});

// Loading Screen (Show only on first visit)
if (localStorage.getItem('visited')) {
    window.addEventListener('load', () => {
        const loadingScreen = document.querySelector('.loading-screen');
        const particleContainer = document.querySelector('.particle-container');

        // Create particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.setProperty('--x', `${(Math.random() - 0.5) * 200}px`);
            particle.style.setProperty('--y', `${(Math.random() - 0.5) * 200}px`);
            particle.style.animationDelay = `${Math.random() * 1.5}s`;
            particleContainer.appendChild(particle);
        }

        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            localStorage.setItem('visited', 'true');
        }, 3000); // 3 seconds
    });
} else {
    document.querySelector('.loading-screen').style.display = 'none';
}

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.innerHTML = body.dataset.theme === 'dark' ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
});

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Hero Slider
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');
const dotsContainer = document.querySelector('.slider-dots');
let currentSlide = 0;

function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
}

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    updateDots();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

if (slides.length > 0) {
    createDots();
    showSlide(currentSlide);
    const slideInterval = setInterval(nextSlide, 6000);

    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
    });
}

// Stats Counter
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    let count = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    function updateCount() {
        if (count < target) {
            count += increment;
            stat.textContent = Math.ceil(count);
            requestAnimationFrame(updateCount);
        } else {
            stat.textContent = target;
        }
    }

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            updateCount();
            observer.disconnect();
        }
    }, { threshold: 0.5 });

    observer.observe(stat);
});

// Parallax Effect for Sections
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    document.querySelectorAll('.hero, .about, .ceo-message, .mission-vision, .umbrella, .pillars, .partners').forEach(section => {
        const bg = section.querySelector('.slide') || section;
        bg.style.backgroundPositionY = `${scrolled * 0.1}px`;
    });
});

// Scroll to Top
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

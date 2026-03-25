// Carousel functionality
class Carousel {
    constructor(carouselElement, prevBtn, nextBtn) {
        this.carousel = carouselElement;
        this.track = carouselElement.querySelector('.carousel-track');
        this.items = Array.from(this.track.children);
        this.prevBtn = prevBtn;
        this.nextBtn = nextBtn;
        this.currentIndex = 0;
        this.itemWidth = this.items[0].offsetWidth + 32; // width + margin
        this.visibleItems = Math.floor(carouselElement.parentElement.offsetWidth / this.itemWidth);
        this.maxIndex = Math.max(0, this.items.length - this.visibleItems);
        
        this.init();
    }
    
    init() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Auto-slide
        this.autoSlide = setInterval(() => this.next(), 4000);
        
        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => clearInterval(this.autoSlide));
        this.carousel.addEventListener('mouseleave', () => {
            this.autoSlide = setInterval(() => this.next(), 4000);
        });
        
        // Touch/swipe support
        this.initTouch();
        
        this.updateButtons();
    }
    
    next() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.scrollToIndex();
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.maxIndex;
        }
        this.scrollToIndex();
    }
    
    scrollToIndex() {
        this.track.style.transform = `translateX(-${this.currentIndex * this.itemWidth}px)`;
        this.track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        this.updateButtons();
    }
    
    updateButtons() {
        this.prevBtn.style.opacity = this.currentIndex > 0 ? '1' : '0.5';
        this.nextBtn.style.opacity = this.currentIndex < this.maxIndex ? '1' : '0.5';
    }
    
    initTouch() {
        let startX = 0;
        let currentX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.carousel.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });
    }
}

// Initialize carousels
document.addEventListener('DOMContentLoaded', () => {
    // Skills carousel
    const skillsCarousel = document.getElementById('skillsCarousel');
    if (skillsCarousel) {
        new Carousel(
            skillsCarousel,
            document.getElementById('skillsPrev'),
            document.getElementById('skillsNext')
        );
    }
    
    // Projects carousel
    const projectsCarousel = document.getElementById('projectsCarousel');
    if (projectsCarousel) {
        new Carousel(
            projectsCarousel,
            document.getElementById('projectsPrev'),
            document.getElementById('projectsNext')
        );
    }
    
    // Theme toggle
    const themeBtn = document.getElementById('themeBtn');
    const body = document.body;
    
    themeBtn.addEventListener('click', () => {
        body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
        themeBtn.textContent = body.dataset.theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', body.dataset.theme);
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.dataset.theme = savedTheme;
    themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    
    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // CTA button scroll
    document.querySelector('.cta-btn').addEventListener('click', () => {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Form submission
    document.querySelector('.contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Mensaje enviado! (Simulado - agrega tu backend aquí)');
        e.target.reset();
    });
    
// Scroll animations with stagger for skills
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // For skills, use stagger delay
            if (entry.target.matches('.skill-item')) {
                const delay = parseFloat(entry.target.style.getPropertyValue('--anim-delay') || '0s');
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                }, delay * 1000);
            } else {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observe all sections and items
document.querySelectorAll('section, .skill-item, .project-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(60px) scale(0.9) rotate(-2deg)';
    el.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    observer.observe(el);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255,255,255,0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Enhanced parallax + floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    // Floating navbar elements
    const navItems = document.querySelectorAll('.nav-menu li');
    navItems.forEach((item, index) => {
        const speed = 0.1 + (index * 0.05);
        item.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Hero particles effect
function createParticles() {
    const particleCount = 50;
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;';
    document.querySelector('.hero').appendChild(particlesContainer);
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255,255,255,0.8);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
            animation-delay: ${Math.random() * 10}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add particles on load
setTimeout(createParticles, 100);

const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0% { transform: translateY(100vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(particleStyle);
});


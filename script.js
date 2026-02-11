// ==================== MOBILE MENU TOGGLE ====================
const menu = document.querySelector("#menu");
const toggle = document.querySelector("#toggle");

toggle.addEventListener("click", function() {
    menu.classList.toggle("show-menu");
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
    link.addEventListener("click", function() {
        menu.classList.remove("show-menu");
    });
});

// ==================== TYPED.JS INITIALIZATION ====================
const typed = new Typed(".typed-text", {
    strings: ["Frontend Developer", "UI/UX Enthusiast", "Web Developer"],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1500,
    startDelay: 500,
    loop: true,
    showCursor: true,
    cursorChar: "|",
    smartBackspace: true
});

// ==================== SCROLL SPY - ACTIVE NAVIGATION ====================
const sections = document.querySelectorAll("section[id]");
const navLinksForSpy = document.querySelectorAll(".nav-link");

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksForSpy.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });

    // Update navbar style on scroll
    const navbar = document.querySelector(".navbar");
    if (scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateActiveNav);

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("slide-in-active");
            // Optionally unobserve after animation
            // animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with .slide-in class
const elementsToAnimate = document.querySelectorAll(".slide-in, .feature-box, .timeline-item, .professional-summary, .skill-item, .project-card");
elementsToAnimate.forEach(el => animateOnScroll.observe(el));



// ==================== CLICK Sound ====================
// Uncomment if you have the audio file

const clickSound = new Audio("hlogza.mp3");
clickSound.preload = "auto";

document.querySelectorAll(".btn, .hero-buttons a, .menu a").forEach(element => {
    element.addEventListener("click", function() {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log("Audio play failed:", e));
    });
});


// ==================== PRELOAD ANIMATIONS ====================
// Trigger initial animation check
window.addEventListener('load', () => {
    updateActiveNav();
    
    // Small delay to ensure smooth initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-image, .hero-content');
        heroElements.forEach(el => el.style.opacity = '1');
    }, 100);
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce scroll event for better performance
let scrollTimeout;
window.addEventListener("scroll", () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(updateActiveNav);
}, { passive: true });

// ==================== ACCESSIBILITY ENHANCEMENTS ====================
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('show-menu')) {
        menu.classList.remove('show-menu');
    }
});

// Focus management for mobile menu
toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menu.classList.toggle('show-menu');
        if (menu.classList.contains('show-menu')) {
            navLinks[0]?.focus();
        }
    }
});

// ==================== LAZY LOADING FOR IMAGES ====================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

console.log("Portfolio initialized successfully! 🚀");
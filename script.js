// ==================== MOBILE MENU TOGGLE ====================
const menu = document.querySelector("#menu");
const toggle = document.querySelector("#toggle");

toggle.addEventListener("click", function () {
    menu.classList.toggle("show-menu");
    // Toggle icon between menu and close
    this.classList.toggle("ri-menu-fill");
    this.classList.toggle("ri-close-line");
});

// Close menu when clicking a nav link
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("show-menu");
        toggle.classList.add("ri-menu-fill");
        toggle.classList.remove("ri-close-line");
    });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove("show-menu");
        toggle.classList.add("ri-menu-fill");
        toggle.classList.remove("ri-close-line");
    }
});

// ==================== TYPED.JS ====================
const typed = new Typed(".typed-text", {
    strings: ["Frontend Developer", "UI/UX Enthusiast", "Web Developer", "Problem Solver"],
    typeSpeed: 90,
    backSpeed: 50,
    backDelay: 1800,
    startDelay: 600,
    loop: true,
    showCursor: true,
    cursorChar: "|",
    smartBackspace: true
});

// ==================== NAVBAR SCROLL BEHAVIOR ====================
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

let lastScrollY = 0;
let ticking = false;

function updateNavbar() {
    const scrollY = window.scrollY;

    // Scrolled class for shrink effect
    if (scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Active nav link (scroll spy)
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollY >= top && scrollY < bottom) {
            navLinks.forEach(link => link.classList.remove("active"));
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    });

    lastScrollY = scrollY;
    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();

        const offset = navbar.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top, behavior: "smooth" });
    });
});

// ==================== INTERSECTION OBSERVER — SCROLL ANIMATIONS ====================
const observerConfig = {
    threshold: 0.1,
    rootMargin: "0px 0px -60px 0px"
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("slide-in-active");
            scrollObserver.unobserve(entry.target); // animate once
        }
    });
}, observerConfig);

document.querySelectorAll(".slide-in").forEach(el => scrollObserver.observe(el));

// ==================== PROJECT CARD TILT EFFECT ====================
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * 4;
        const rotY = ((x - cx) / cx) * -4;

        card.style.transform = `translateY(-10px) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
        setTimeout(() => { card.style.transition = ""; }, 500);
    });
});

// ==================== SKILL HOVER TOOLTIP ====================
const skillLabels = {
    "HTML5": "HyperText Markup Language",
    "CSS3": "Cascading Style Sheets",
    "JavaScript": "ES6+ Scripting",
    "jQuery": "JS Library",
    "Bootstrap": "CSS Framework",
    "Git": "Version Control",
    "GitHub": "Code Hosting",
    "Node.js": "Runtime Environment",
    "Express": "Web Framework",
    "EJS": "Embedded JavaScript Templates"
};

document.querySelectorAll(".skill-item").forEach(item => {
    const label = item.querySelector("p")?.textContent.trim();
    if (label && skillLabels[label]) {
        item.setAttribute("title", skillLabels[label]);
    }
});

// ==================== CLICK SOUND (optional) ====================
try {
    const clickSound = new Audio("hlogza.mp3");
    clickSound.preload = "auto";
    document.querySelectorAll(".btn, .overlay-btn").forEach(el => {
        el.addEventListener("click", () => {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        });
    });
} catch (e) {}

// ==================== KEYBOARD ACCESSIBILITY ====================
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("show-menu")) {
        menu.classList.remove("show-menu");
        toggle.classList.add("ri-menu-fill");
        toggle.classList.remove("ri-close-line");
        toggle.focus();
    }
});

toggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        menu.classList.toggle("show-menu");
        if (menu.classList.contains("show-menu")) {
            document.querySelector(".nav-link")?.focus();
        }
    }
});

// ==================== HERO PARALLAX (subtle) ====================
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const shapes = document.querySelectorAll(".shape");
    shapes.forEach((shape, i) => {
        const speed = 0.08 + i * 0.04;
        shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
}, { passive: true });

// ==================== COUNTER ANIMATION (for future stats) ====================
function animateCount(el, target, duration = 1500) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start);
        }
    }, 16);
}

// ==================== INIT ====================
window.addEventListener("load", () => {
    updateNavbar();
    console.log("%c🚀 Portfolio loaded!", "color: #5777ff; font-weight: bold; font-size: 14px;");
});
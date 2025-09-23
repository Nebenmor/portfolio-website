// Mobile menu toggle with enhanced UX
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  }
});

// Scroll sections active link with improved performance
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");
let ticking = false;

function updateActiveLink() {
  let current = "";
  let scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });

  ticking = false;
}

window.onscroll = () => {
  if (!ticking) {
    requestAnimationFrame(updateActiveLink);
    ticking = true;
  }

  // Sticky navbar with enhanced backdrop
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // Remove toggle icon and navbar when scrolling
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// Enhanced scroll reveal animations
ScrollReveal({
  distance: "60px",
  duration: 2000,
  delay: 200,
  reset: false,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .contact-container",
  {
    origin: "bottom",
    interval: 200,
  }
);
ScrollReveal().reveal(
  ".home-content h1, .about-img, .skills-grid .skill-category:nth-child(odd)",
  {
    origin: "left",
    interval: 200,
  }
);
ScrollReveal().reveal(
  ".home-content p, .about-content, .skills-grid .skill-category:nth-child(even)",
  {
    origin: "right",
    interval: 200,
  }
);

// Enhanced typed.js animation
const typed = new Typed(".multiple-text", {
  strings: ["Full-Stack Developer", "React.js Developer", "Problem Solver"],
  typeSpeed: 80,
  backSpeed: 60,
  backDelay: 1200,
  loop: true,
  showCursor: true,
  cursorChar: "|",
});

// Update current year
document.getElementById("current-year").textContent = new Date().getFullYear();

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = document.querySelector("header").offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      menuIcon.classList.remove("bx-x");
      navbar.classList.remove("active");
    }
  });
});

// Enhanced form submission handling
const contactForm = document.querySelector(".contact form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const formEntries = Object.fromEntries(formData);

    // Simple validation
    if (Object.values(formEntries).some((value) => value.trim() === "")) {
      alert("Please fill in all fields.");
      return;
    }

    // Simulate form submission
    const submitBtn = this.querySelector(".btn");
    const originalText = submitBtn.value;
    submitBtn.value = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert("Thank you for your message! I'll get back to you soon.");
      this.reset();
      submitBtn.value = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Add fade-in animation class to elements as they come into view
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Observe all major sections
document
  .querySelectorAll("section, .skill-category, .services-box, .portfolio-box")
  .forEach((el) => {
    observer.observe(el);
  });

// Preload critical images
const criticalImages = ["images/Profile1.jpeg", "./images/profile2.jpeg"];

criticalImages.forEach((src) => {
  const img = new Image();
  img.src = src;
});

// Performance optimization: Lazy load portfolio images
const portfolioImages = document.querySelectorAll(".portfolio-box img");
const imageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      }
    });
  },
  { rootMargin: "50px" }
);

portfolioImages.forEach((img) => {
  imageObserver.observe(img);
});

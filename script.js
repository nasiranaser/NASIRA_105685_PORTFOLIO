/**
 * Nur Nasira's Personal Portfolio - Interactive Script
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. Mobile Navigation Menu Toggle
    // ==========================================
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            navbar.classList.toggle("active");
            menuToggle.textContent = navbar.classList.contains("active") ? "✕" : "☰";
        });

        document.querySelectorAll(".navbar a").forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                menuToggle.textContent = "☰";
            });
        });
    }

    // ==========================================
    // 2. Scroll-Based Active Nav Highlighting
    // ==========================================
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar a");

    window.addEventListener("scroll", () => {
        let currentScrollPos = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (currentScrollPos >= sectionTop && currentScrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active-link");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active-link");
                    }
                });
            }
        });
    });

    // ==========================================
    // 3. Back-to-Top Button Functionality
    // ==========================================
    const backToTopBtn = document.getElementById("backToTop");

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ==========================================
    // 4. Contact Form Validation & Feedback
    // ==========================================
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");

    if (contactForm && formFeedback) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameInput = document.getElementById("name").value.trim();
            const emailInput = document.getElementById("email").value.trim();
            const messageInput = document.getElementById("message").value.trim();

            if (nameInput === "" || emailInput === "" || messageInput === "") {
                formFeedback.style.color = "#d9534f";
                formFeedback.textContent = "Please fill in all required fields before submitting.";
                return;
            }

            formFeedback.style.color = "#5c061c";
            formFeedback.textContent = `Thank you, ${nameInput}! Your message has been sent successfully.`;
            
            contactForm.reset();

            setTimeout(() => {
                formFeedback.textContent = "";
            }, 5000);
        });
    }

    // ==========================================
    // 5. Scroll Reveal Animation (Intersection Observer)
    // ==========================================
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".clickable-box, .section-header, .contact-form, .contact-info-card");
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(25px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });

});
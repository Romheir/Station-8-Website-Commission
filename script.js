document.addEventListener("DOMContentLoaded", () => {
    // We initialize the mobile menu FIRST to guarantee it always works
    initMobileMenu();
    initScrollReveals();
    initTypewriter();
    initInventoryFilters();
});

// 1. THE MOBILE HAMBURGER MENU ENGINE
// 1. THE MOBILE HAMBURGER MENU ENGINE (Direct Click Method)
function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    // Safety check: If not found, skip gracefully
    if (!hamburger || !navLinks) return;

    // Force a clean, direct click listener
    hamburger.onclick = function() {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("toggle");
    };

    // Automatically close the menu if they tap a link
    const links = navLinks.querySelectorAll("a");
    links.forEach(link => {
        link.onclick = function() {
            navLinks.classList.remove("active");
            hamburger.classList.remove("toggle");
        };
    });
}

// 2. SCROLL REVEAL ANIMATIONS
function initScrollReveals() {
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length === 0) return;

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger once on load
}

// 3. HOME PAGE TYPEWRITER EFFECT
function initTypewriter() {
    const typewriterElement = document.getElementById("typewriter-engine");
    if (!typewriterElement) return;

    const words = ["Beautiful.", "Unforgettable.", "Extraordinary.", "Yours."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typewriterElement.textContent = currentWord.substring(0, charIndex);

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; 
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// 4. SPACES PAGE FILTER BUTTONS
function initInventoryFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const bentoCards = document.querySelectorAll(".bento-card");

    if (filterBtns.length === 0 || bentoCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            bentoCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.classList.remove("hide");
                    setTimeout(() => { card.style.display = "flex"; }, 50);
                } else {
                    card.classList.add("hide");
                    setTimeout(() => { 
                        if(card.classList.contains("hide")) {
                            card.style.display = "none"; 
                        }
                    }, 400); 
                }
            });
        });
    });
}

// 5. BOOKING FORM SUBMISSION MOCKUP
window.handleBookingSubmit = function(event) {
    event.preventDefault();
    const btnText = document.getElementById("btn-status-text");
    if (!btnText) return;

    const originalText = btnText.innerText;
    btnText.innerText = "Processing...";

    setTimeout(() => {
        btnText.innerText = "Request Sent!";
        btnText.style.color = "#48beba";
        document.getElementById("booking-form").reset();

        setTimeout(() => {
            btnText.innerText = originalText;
            btnText.style.color = "inherit";
        }, 3000);
    }, 1500);
}
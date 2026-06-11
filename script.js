/* ========================================================
   STATION 8 OFFICIAL MASTER INTERACTIVITY ENGINE
   ======================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initTypewriter();
    initScrollReveals();
    initInventoryFilters();
    initLightbox(); // <-- New addition (For lightbox) For gallery Optimization
});

// --- TYPEWRITER CONFIGURATION MATRIX ---
function initTypewriter() {
    const targetElement = document.getElementById("typewriter-engine");
    if (!targetElement) return;

    const phrases = [
        "Making Moments Beautiful.",
        "We Plan. You Celebrate.",
        "Corporate Meetings & Functions.",
        "Weddings & Birthdays."
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 120;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            targetElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            delay = 60;
        } else {
            targetElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            delay = 120;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            delay = 2000; // Freeze at full length for readability
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 500;
        }

        setTimeout(type, delay);
    }
    
    type();
}

// --- HIGH-PERFORMANCE INTERSECTION OBSERVER FOR SCROLL REVEALS ---
function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Optimize DOM tracking
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
}
// --- LIGHTBOX LOGIC ---
function initLightbox() {
    const modal = document.getElementById("lightbox");
    const modalImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-lightbox");
    const galleryItems = document.querySelectorAll(".gallery-item"); 

    if (!modal || !modalImg || !closeBtn) return;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // NOTE: When you replace placeholders with real <img> tags, 
            // you will update this to grab the src of the image itself.
            const innerElement = item.querySelector('.placeholder-img');
            const imageSource = innerElement.getAttribute('data-src'); 
            
            modal.classList.add("show");
            // modalImg.src = imageSource; // <-- Uncomment this when using real images
            document.body.style.overflow = "hidden"; // Freeze background scroll
        });
    });

    // Close Button Click
    closeBtn.addEventListener('click', () => {
        modal.classList.remove("show");
        document.body.style.overflow = "auto"; // Restore background scroll
    });

    // Close on clicking the dark background outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
            document.body.style.overflow = "auto";
        }
    });
}
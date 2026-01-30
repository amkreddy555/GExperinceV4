/** 
 * PRELOADER TIMING REFINEMENT
 * Switched from window.onload to DOMContentLoaded to prevent 5+ second delays on mobile 
 * caused by waiting for heavy hero videos to fully download. 
 * IMPACT: Page reveals in ~1.5s while videos buffer in background.
 * REVERT NOTE: To wait for 100% video download completion, swap back to 'window.onload'.
 */
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => { document.querySelector('.preloader').classList.add('fade-out'); }, 1500);
});
// Original: window.onload = () => { setTimeout(() => { document.querySelector('.preloader').classList.add('fade-out'); }, 1500); };
function toggleMenu() { document.querySelector('.nav-links').classList.toggle('active'); }
function closeMenu() { document.querySelector('.nav-links').classList.remove('active'); }

const heroContent = [
    {
        badge: "Next Gen Automation",
        title: "Smart Living.<br><span>Redefined.</span>",
        text: "Experience the seamless integration of eco-friendly luxury and digital technology with G Think."
    },
    {
        badge: "Smart Comfort",
        title: "Wake Up<br><span>Refresh.</span>",
        text: "Automated mood lighting and climate control for the perfect lifestyle routine."
    },
    {
        badge: "Proactive Living",
        title: "Adaptive Home<br><span>Intelligence.</span>",
        text: "Your home learns your routine to provide unprecedented comfort and efficiency."
    },
    {
        badge: "Luxury Tech",
        title: "Seamless<br><span>Elegance.</span>",
        text: "Premium hardware meets intuitive software for the ultimate modern lifestyle."
    },
    {
        badge: "Ultimate Experience",
        title: "Future of<br><span>Living.</span>",
        text: "Discover the pinnacle of smart home innovation with our premium automation suite."
    },
    {
        badge: "Born in India • Built for the World",
        title: "Engineered in India,<br>Designed for the World.",
        text: "Leading the global revolution in smart home intelligence. Premium technology that transcends borders."
    }
];

let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

// DOM Elements to Update
const heroBadge = document.querySelector('.hero-badge');
const heroTitle = document.querySelector('.hero-content h1');
const heroDesc = document.querySelector('.hero-content p');
const heroInfo = document.querySelector('.hero-content');

// Initialize Video Diagnostics
document.querySelectorAll('.video-slide video').forEach((v, i) => {
    v.addEventListener('loadstart', () => { });
    v.addEventListener('play', () => { });
    v.addEventListener('error', (e) => { });
});

function updateSlider() {
    if (slides.length === 0) return;

    // 1. Remove Active from OLD slide
    if (slides[currentSlide]) {
        slides[currentSlide].classList.remove('active');
    }

    // 2. Increment
    currentSlide = (currentSlide + 1) % slides.length;

    // 3. Add Active to NEW slide
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');

        // 4. Handle Video Playback
        const nextVideo = slides[currentSlide].querySelector('video');
        if (nextVideo) {
            nextVideo.currentTime = 0; // REWIND TO START
            const playPromise = nextVideo.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Autoplay started!
                }).catch(error => {
                    // Autoplay blocked/failed
                });
            }
        }
    }

    // 5. Update Text Content
    const content = heroContent[currentSlide];
    if (content && heroBadge && heroTitle && heroDesc && heroInfo) {
        heroBadge.textContent = content.badge;
        heroTitle.innerHTML = content.title;
        heroDesc.textContent = content.text;

        // Apply Global Luxe styling if it's the last slide (index 5)
        if (currentSlide === 5) {
            heroInfo.classList.add('global-luxe-mode');
        } else {
            heroInfo.classList.remove('global-luxe-mode');
        }
    }

    // 6. Schedule Next Update with Dynamic Timing
    // Specific delays for each slide
    const delays = [6000, 6000, 18000, 16000, 19000, 10000];
    const delay = delays[currentSlide] || 6000;

    setTimeout(updateSlider, delay);
}

// Start the cycle
setTimeout(updateSlider, 6000);

function toggleFaq(element) { element.classList.toggle('active'); }

// SCROLL SPY (Active Link Highlighter)
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY; // optimization

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Trigger when section is 30% visible or top
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        // Check if link href contains the current section id (handle both #id and page.html#id)
        if (current && a.getAttribute('href').includes('#' + current)) {
            a.classList.add('active');
        }
    });
});

// WHATSAPP FORM HANDLER
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // 1. Capture Data
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phoneInput = this.querySelector('input[type="tel"]');
    const phone = phoneInput.value.trim();

    /* PHONE VALIDATION */
    // Check for valid digit count (10-15 digits)
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
        alert("Please enter a valid phone number (10-15 digits). E.g. +91 90000 12345");
        phoneInput.focus();
        return;
    }

    const interest = this.querySelector('select').value;
    const details = this.querySelector('textarea').value;

    // 2. Format Message
    const message = `*New Inquiry via Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Interest:* ${interest}%0A*Details:* ${details}`;

    // 3. Open WhatsApp
    const whatsappUrl = `https://wa.me/919908799084?text=${message}`;
    window.open(whatsappUrl, '_blank');

    // 4. Reset
    this.reset();
});

/* HEADER SCROLL EFFECT */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

/* VIDEO PLAYLIST SCRIPT */
function playVideo(videoId, element) {
    // Update Iframe
    const iframe = document.getElementById('mainPlayer');
    iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`;

    // Update Active State in List
    document.querySelectorAll('.playlist-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');
}

window.addEventListener('load', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('stats-wrapper')) {
                    document.querySelectorAll('.counter').forEach(c => {
                        const target = +c.getAttribute('data-target');
                        const suffix = c.getAttribute('data-suffix') || '+'; // Default to + if no suffix
                        const duration = 2700; // Slowed down to 2.7 seconds as requested
                        const increment = target / (duration / 30); // Calculate increment based on 30ms update interval
                        let currentVal = 0; // Start from 0

                        const update = () => {
                            if (currentVal < target) {
                                currentVal = Math.min(target, currentVal + increment); // Ensure it doesn't exceed target
                                // Append suffix during animation too if desired, or just number. 
                                // Usually just number during count-up looks cleaner.
                                c.innerText = Math.ceil(currentVal) + suffix;
                                setTimeout(update, 30);
                            } else {
                                c.innerText = target + suffix;
                            }
                        };
                        update();
                    });
                }
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// FOOTER LIGHT-FOLLOW GLOW
const footer = document.querySelector('footer');
if (footer) {
    footer.addEventListener('mousemove', (e) => {
        const rect = footer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        footer.style.setProperty('--footer-glow-x', `${x}px`);
        footer.style.setProperty('--footer-glow-y', `${y}px`);
    });
}

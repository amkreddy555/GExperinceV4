window.onload = () => { setTimeout(() => { document.querySelector('.preloader').classList.add('fade-out'); }, 1500); };
function toggleMenu() { document.querySelector('.nav-links').classList.toggle('active'); }
function closeMenu() { document.querySelector('.nav-links').classList.remove('active'); }

const heroContent = [
    {
        badge: "Next Gen Automation",
        title: "Smart Living.<br><span>Redefined.</span>",
        text: "Experience the seamless integration of eco-friendly luxury and digital technology with G Think."
    },
    {
        badge: "G Smart App",
        title: "Total Control.<br><span>Everywhere.</span>",
        text: "Monitor and manage your entire home security and devices from the palm of your hand."
    },
    {
        badge: "Smart Comfort",
        title: "Wake Up<br><span>Refresh.</span>",
        text: "Automated mood lighting and climate control for the perfect lifestyle routine."
    }
];

let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

// DOM Elements to Update
const heroBadge = document.querySelector('.hero-badge');
const heroTitle = document.querySelector('.hero-content h1');
const heroDesc = document.querySelector('.hero-content p');

setInterval(() => {
    // 1. Remove Active
    slides[currentSlide].classList.remove('active');

    // 2. Increment
    currentSlide = (currentSlide + 1) % slides.length;

    // 3. Add Active
    slides[currentSlide].classList.add('active');

    // 4. Update Text Content with Fade Effect
    const content = heroContent[currentSlide]; // Assuming 4 slides match 4 content objects

    // Simple Text Swap (You could add opacity transition here if desired)
    if (content) {
        heroBadge.textContent = content.badge;
        heroTitle.innerHTML = content.title;
        heroDesc.textContent = content.text;
    }
}, 5000); // Increased to 5s for readability

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
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
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

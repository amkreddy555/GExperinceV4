function toggleSunriseMenu() {
    const menu = document.getElementById('sunriseMenu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sunriseMenu = document.getElementById('sunriseMenu');
    const sunriseLinks = document.querySelectorAll('.sunray-links a');

    if (sunriseMenu) {
        // 1. Close on Link Selection
        sunriseLinks.forEach(link => {
            link.addEventListener('click', () => {
                sunriseMenu.classList.remove('active');
            });
        });

        // 2. Click-Outside: Close if user clicks elsewhere on the page
        document.addEventListener('click', (event) => {
            const isClickInside = sunriseMenu.contains(event.target);
            if (!isClickInside && sunriseMenu.classList.contains('active')) {
                sunriseMenu.classList.remove('active');
            }
        });

        // 3. Scroll-Dismiss: Close if user scrolls significantly
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            if (sunriseMenu.classList.contains('active')) {
                const currentScrollY = window.scrollY;
                const scrollDistance = Math.abs(currentScrollY - lastScrollY);

                // If they scroll more than 100px while menu is open, close it
                if (scrollDistance > 100) {
                    sunriseMenu.classList.remove('active');
                }
            } else {
                lastScrollY = window.scrollY;
            }
        }, { passive: true });
    }
});

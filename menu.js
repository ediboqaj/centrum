// Register Service Worker (room pages)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
}

// Shared menu overlay logic for all pages

(function () {
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuClose = document.getElementById('menuClose');
    const menuImage = document.querySelector('.menu-image img');
    const menuItems = document.querySelectorAll('.menu-overlay .menu-item');

    if (!menuOverlay) return;

    const openMenu = () => {
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (menuToggle) menuToggle.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);

    menuOverlay.addEventListener('click', (e) => {
        if (e.target === menuOverlay) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) closeMenu();
    });

    // Swap image on hover of each menu item
    if (menuImage && menuItems.length) {
        menuItems.forEach((item) => {
            const handler = () => {
                const imgSrc = item.getAttribute('data-img');
                if (imgSrc) menuImage.src = imgSrc;
            };
            item.addEventListener('mouseenter', handler);
            item.addEventListener('focus', handler);
            item.addEventListener('touchstart', handler, { passive: true });
        });
    }
})();

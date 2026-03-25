// Register Service Worker for image caching
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
    });
}

// Menu toggle functionality & image swapping
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
const menuImage = document.querySelector('.menu-image img');
const menuItems = document.querySelectorAll('.menu-items .menu-item');

const highlightMenuSrcset = '';

const menuImageData = [
    {
        src: 'assets/Suite/DSC08732.jpg',
        sizes: '(max-width: 1024px) 0px, 560px'
    },
    {
        src: 'assets/Double Room/DSC08679.jpg',
        sizes: '(max-width: 1024px) 0px, 560px'
    },
    {
        src: 'assets/Double Room with Jacuzzi/DSC08528.jpg',
        sizes: '(max-width: 1024px) 0px, 560px'
    },
    {
        src: 'assets/Family Room/DSC08602.jpg',
        sizes: '(max-width: 1024px) 0px, 560px'
    },
    {
        src: 'assets/Triple Room/DSC08575.jpg',
        sizes: '(max-width: 1024px) 0px, 560px'
    }
];

const DEFAULT_IMAGE_INDEX = 0;
let currentImageIndex = DEFAULT_IMAGE_INDEX;

const updateBodyScroll = (isLocked) => {
    document.body.style.overflow = isLocked ? 'hidden' : 'auto';
};

const applyMenuImage = (index, label) => {
    if (!menuImage || !menuImageData.length) {
        return;
    }

    const imageInfo = menuImageData[index % menuImageData.length];
    if (!imageInfo) {
        return;
    }

    menuImage.src = imageInfo.src;

    if (imageInfo.srcset) {
        menuImage.srcset = imageInfo.srcset;
        menuImage.sizes = imageInfo.sizes || '(max-width: 1024px) 0px, 560px';
    } else {
        menuImage.removeAttribute('srcset');
        if (imageInfo.sizes) {
            menuImage.sizes = imageInfo.sizes;
        } else {
            menuImage.removeAttribute('sizes');
        }
    }

    if (label) {
        menuImage.alt = `${label} – Relais de Chambord`;
    }

    menuImage.dataset.currentIndex = String(index % menuImageData.length);
};

const resetMenuImage = () => {
    if (!menuItems.length) {
        return;
    }
    currentImageIndex = DEFAULT_IMAGE_INDEX;
    const label = menuItems[currentImageIndex].textContent.trim();
    applyMenuImage(currentImageIndex, label);
};

const showNextImage = (label) => {
    if (!menuImageData.length) {
        return;
    }
    currentImageIndex = (currentImageIndex + 1) % menuImageData.length;
    applyMenuImage(currentImageIndex, label);
};

const openMenu = () => {
    if (!menuOverlay) {
        return;
    }
    menuOverlay.classList.add('active');
    updateBodyScroll(true);
    resetMenuImage();
};

const closeMenu = () => {
    if (!menuOverlay) {
        return;
    }
    menuOverlay.classList.remove('active');
    updateBodyScroll(false);
    resetMenuImage();
};

if (menuToggle) {
    menuToggle.addEventListener('click', openMenu);
}

if (menuClose) {
    menuClose.addEventListener('click', closeMenu);
}

if (menuOverlay) {
    menuOverlay.addEventListener('click', (event) => {
        if (event.target === menuOverlay) {
            closeMenu();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
        closeMenu();
    }
});

if (menuItems.length && menuImage) {
    menuItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            const imgSrc = item.getAttribute('data-img');
            if (imgSrc) menuImage.src = imgSrc;
        });
        item.addEventListener('focus', () => {
            const imgSrc = item.getAttribute('data-img');
            if (imgSrc) menuImage.src = imgSrc;
        });
        item.addEventListener('touchstart', () => {
            const imgSrc = item.getAttribute('data-img');
            if (imgSrc) menuImage.src = imgSrc;
        }, { passive: true });
    });

    resetMenuImage();
}

// Rooms image changing functionality
document.addEventListener('DOMContentLoaded', function() {
    const roomItems = document.querySelectorAll('.room-item');
    const roomsImage = document.querySelector('.rooms-image');

    const roomImageData = [
        'assets/Suite/DSC08732.jpg',
        'assets/Double Room/DSC08679.jpg',
        'assets/Double Room with Jacuzzi/DSC08528.jpg',
        'assets/Family Room/DSC08602.jpg',
        'assets/Triple Room/DSC08575.jpg',
        'assets/Twin Room/DSC08847.jpg',
        'assets/Quadruple Room/DSC08805.jpg'
    ];

    let currentRoomIndex = 0;
    let roomAutoChangeInterval = null;

    const updateRoomImage = (index) => {
        if (!roomsImage || !roomImageData.length) {
            return;
        }
        const newIndex = index % roomImageData.length;
        roomsImage.src = roomImageData[newIndex];
    };

    const startRoomAutoChange = () => {
        stopRoomAutoChange(); // Clear any existing interval first
        if (window.innerWidth <= 768) {
            roomAutoChangeInterval = setInterval(() => {
                currentRoomIndex = (currentRoomIndex + 1) % roomImageData.length;
                updateRoomImage(currentRoomIndex);
                // Update active state
                roomItems.forEach((item, idx) => {
                    item.classList.toggle('active', idx === currentRoomIndex);
                });
            }, 5000);
        }
    };

    const stopRoomAutoChange = () => {
        if (roomAutoChangeInterval) {
            clearInterval(roomAutoChangeInterval);
            roomAutoChangeInterval = null;
        }
    };

    if (roomItems.length && roomsImage) {
        // Desktop: hover to change image
        roomItems.forEach((item, index) => {
            const handleRoomImageChange = () => {
                if (window.innerWidth > 768) {
                    stopRoomAutoChange();
                    currentRoomIndex = index;
                    updateRoomImage(index);
                    // Update active state
                    roomItems.forEach(ri => ri.classList.remove('active'));
                    item.classList.add('active');
                }
            };

            item.addEventListener('mouseenter', handleRoomImageChange);
            item.addEventListener('focus', handleRoomImageChange);
            item.addEventListener('touchstart', handleRoomImageChange, { passive: true });
        });

        // Initialize: start mobile auto-change if on mobile
        if (window.innerWidth <= 768) {
            startRoomAutoChange();
        }
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth <= 768) {
                    startRoomAutoChange();
                } else {
                    stopRoomAutoChange();
                }
            }, 250);
        });
    }
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Booking Form with Toast Notification (FormSubmit iframe method)
const bookingForm = document.getElementById('bookingForm');
const successToast = document.getElementById('successToast');

function showToast() {
    if (successToast) {
        successToast.classList.add('show');
        setTimeout(() => {
            successToast.classList.remove('show');
        }, 5000);
    }
}

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        // Form will submit to hidden iframe
        // Show toast immediately
        setTimeout(() => {
            showToast();
            bookingForm.reset();
        }, 500);
    });
}

// Initialize date pickers with VanillaJS Datepicker
document.addEventListener('DOMContentLoaded', function() {
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    if (checkInInput && typeof Datepicker !== 'undefined') {
        const checkInPicker = new Datepicker(checkInInput, {
            format: 'yyyy-mm-dd',
            minDate: new Date(),
            autohide: true,
            orientation: 'bottom'
        });
        
        checkInInput.addEventListener('changeDate', function(e) {
            if (checkOutPicker && e.detail.date) {
                const minCheckOut = new Date(e.detail.date);
                minCheckOut.setDate(minCheckOut.getDate() + 1);
                checkOutPicker.setOptions({
                    minDate: minCheckOut
                });
            }
        });
    }
    
    let checkOutPicker;
    if (checkOutInput && typeof Datepicker !== 'undefined') {
        checkOutPicker = new Datepicker(checkOutInput, {
            format: 'yyyy-mm-dd',
            minDate: new Date(),
            autohide: true,
            orientation: 'bottom'
        });
    }
});

// Pre-select room from URL query param and scroll to booking section
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const room = params.get('room');
    if (room) {
        const sel = document.getElementById('room-type');
        if (sel) sel.value = room;
        const section = document.getElementById('booking');
        if (section) {
            setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }
    }
});

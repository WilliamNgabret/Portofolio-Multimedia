/* =============================================
   WILBERT'S PORTFOLIO - INTERACTIVE ANIMATIONS
   Smooth scroll effects, parallax, and magic ✨
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    initScrollAnimations();
    initParallaxBlobs();
    initSmoothScroll();
    initCardInteractions();
    initHeroAnimationSequence();
    initHorizontalScrollHint();
    initLightbox();
    initVideoSection();
});

/* ========== SCROLL ANIMATIONS ========== */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add stagger delay if specified
                const delay = entry.target.dataset.delay || 0;

                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);

                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all scroll-animate elements
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

/* ========== PARALLAX FLOATING BLOBS ========== */
function initParallaxBlobs() {
    const blobs = document.querySelectorAll('.blob');
    let ticking = false;

    function updateBlobs() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        blobs.forEach((blob, index) => {
            // Different parallax speeds for each blob
            const speed = 0.02 + (index * 0.01);
            const yOffset = scrollY * speed;
            const xOffset = Math.sin(scrollY * 0.001 + index) * 20;

            blob.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${1 + Math.sin(scrollY * 0.001) * 0.05})`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateBlobs);
            ticking = true;
        }
    }, { passive: true });
}

/* ========== SMOOTH SCROLL FOR ANCHOR LINKS ========== */
function initSmoothScroll() {
    // Scroll arrow click handler
    const scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint) {
        scrollHint.addEventListener('click', () => {
            const introSection = document.getElementById('intro');
            if (introSection) {
                introSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        // Make it keyboard accessible
        scrollHint.style.cursor = 'pointer';
        scrollHint.setAttribute('role', 'button');
        scrollHint.setAttribute('tabindex', '0');
        scrollHint.setAttribute('aria-label', 'Scroll ke bawah');

        scrollHint.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const introSection = document.getElementById('intro');
                if (introSection) {
                    introSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
}

/* ========== CARD INTERACTIONS ========== */
function initCardInteractions() {
    const cards = document.querySelectorAll('.gallery-card, .gallery-card-horizontal');

    cards.forEach(card => {
        // Mouse move parallax effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-12px) 
                scale(1.02)
            `;
        });

        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });

        // Touch feedback for mobile
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        }, { passive: true });

        card.addEventListener('touchend', () => {
            card.style.transform = '';
        }, { passive: true });
    });

    // Add ripple effect on click
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            createRipple(e, card);
        });
    });
}

/* ========== RIPPLE EFFECT ========== */
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(179, 217, 255, 0.5) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-expand 0.6s ease-out forwards;
        pointer-events: none;
        z-index: 10;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-expand {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);

/* ========== HERO ANIMATION SEQUENCE ========== */
function initHeroAnimationSequence() {
    // Add extra sparkle animations after initial load
    setTimeout(() => {
        addFloatingParticles();
    }, 2000);
}

function addFloatingParticles() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    const particles = ['✨', '⭐', '💫', '🌟', '💖'];
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        z-index: 1;
    `;

    // Create floating particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('span');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.cssText = `
            position: absolute;
            font-size: ${16 + Math.random() * 16}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0;
            animation: particle-float ${5 + Math.random() * 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }

    hero.appendChild(particleContainer);

    // Add particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particle-float {
            0%, 100% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            50% {
                transform: translateY(-50px) rotate(180deg);
                opacity: 0.8;
            }
            90% {
                opacity: 0.6;
            }
        }
    `;
    document.head.appendChild(particleStyle);
}

/* ========== HORIZONTAL SCROLL HINT ========== */
function initHorizontalScrollHint() {
    const horizontalGallery = document.querySelector('.horizontal-gallery-wrapper');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (horizontalGallery && scrollIndicator) {
        // Hide indicator when scrolled
        horizontalGallery.addEventListener('scroll', () => {
            if (horizontalGallery.scrollLeft > 50) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '';
            }
        }, { passive: true });

        // Optional: Add drag-to-scroll for desktop
        let isDown = false;
        let startX;
        let scrollLeft;

        horizontalGallery.addEventListener('mousedown', (e) => {
            isDown = true;
            horizontalGallery.style.cursor = 'grabbing';
            startX = e.pageX - horizontalGallery.offsetLeft;
            scrollLeft = horizontalGallery.scrollLeft;
        });

        horizontalGallery.addEventListener('mouseleave', () => {
            isDown = false;
            horizontalGallery.style.cursor = '';
        });

        horizontalGallery.addEventListener('mouseup', () => {
            isDown = false;
            horizontalGallery.style.cursor = '';
        });

        horizontalGallery.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - horizontalGallery.offsetLeft;
            const walk = (x - startX) * 2;
            horizontalGallery.scrollLeft = scrollLeft - walk;
        });
    }
}

/* ========== CURSOR SPARKLE TRAIL ========== */
document.addEventListener('mousemove', throttle((e) => {
    // Only on desktop and not too frequently
    if (window.innerWidth < 768) return;
    if (Math.random() > 0.1) return; // Only 10% chance to create sparkle

    createCursorSparkle(e.clientX, e.clientY);
}, 50));

function createCursorSparkle(x, y) {
    const sparkle = document.createElement('span');
    const emojis = ['✨', '⭐', '💫'];
    sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: ${12 + Math.random() * 8}px;
        pointer-events: none;
        z-index: 9999;
        animation: cursor-sparkle 0.8s ease-out forwards;
    `;

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
}

// Add cursor sparkle animation
const cursorSparkleStyle = document.createElement('style');
cursorSparkleStyle.textContent = `
    @keyframes cursor-sparkle {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -100%) scale(1) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(cursorSparkleStyle);

/* ========== UTILITY: THROTTLE ========== */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ========== EASTER EGG: KONAMI CODE ========== */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateRainbowMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateRainbowMode() {
    document.body.style.animation = 'rainbow-bg 5s linear infinite';

    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow-bg {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);

    // Create celebration
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('span');
            confetti.textContent = ['🎉', '🎊', '✨', '💖', '⭐'][Math.floor(Math.random() * 5)];
            confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: -50px;
                font-size: ${20 + Math.random() * 20}px;
                pointer-events: none;
                z-index: 10000;
                animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 50);
    }

    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confetti-fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(confettiStyle);

    // Reset after 10 seconds
    setTimeout(() => {
        document.body.style.animation = '';
    }, 10000);
}

/* ========== PERFORMANCE: PAUSE ANIMATIONS WHEN NOT VISIBLE ========== */
document.addEventListener('visibilitychange', () => {
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach(blob => {
        blob.style.animationPlayState = document.hidden ? 'paused' : 'running';
    });
});

/* ========== LIGHTBOX GALLERY ========== */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    if (!lightbox) return;

    // Collect all gallery images
    let galleryImages = [];
    let currentIndex = 0;

    function collectImages() {
        galleryImages = [];
        const cards = document.querySelectorAll('.gallery-card, .gallery-card-horizontal');

        cards.forEach((card, index) => {
            const img = card.querySelector('.card-image-wrapper img');
            const title = card.querySelector('.card-title');

            if (img) {
                galleryImages.push({
                    src: img.src,
                    alt: img.alt,
                    title: title ? title.textContent : img.alt
                });

                // Add click handler to card
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    openLightbox(galleryImages.length - 1);
                });

                // Update the index for this card
                card.dataset.lightboxIndex = galleryImages.length - 1;
            }
        });

        // Re-attach click handlers with correct index
        cards.forEach((card) => {
            const idx = parseInt(card.dataset.lightboxIndex);
            card.onclick = (e) => {
                e.preventDefault();
                openLightbox(idx);
            };
        });
    }

    function openLightbox(index) {
        if (index < 0 || index >= galleryImages.length) return;

        currentIndex = index;
        const image = galleryImages[currentIndex];

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxTitle.textContent = image.title;

        lightbox.classList.add('is-active');
        document.body.style.overflow = 'hidden';

        // Update nav visibility
        updateNavButtons();

        // Focus trap
        lightboxClose.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('is-active');
        document.body.style.overflow = '';
    }

    function showPrev() {
        if (currentIndex > 0) {
            openLightbox(currentIndex - 1);
        }
    }

    function showNext() {
        if (currentIndex < galleryImages.length - 1) {
            openLightbox(currentIndex + 1);
        }
    }

    function updateNavButtons() {
        lightboxPrev.style.opacity = currentIndex === 0 ? '0.3' : '0.9';
        lightboxPrev.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';

        lightboxNext.style.opacity = currentIndex === galleryImages.length - 1 ? '0.3' : '0.9';
        lightboxNext.style.pointerEvents = currentIndex === galleryImages.length - 1 ? 'none' : 'auto';
    }

    // Event Listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrev);
    lightboxNext.addEventListener('click', showNext);

    // Close on overlay click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('is-active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrev();
                break;
            case 'ArrowRight':
                showNext();
                break;
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNext(); // Swipe left = next
            } else {
                showPrev(); // Swipe right = prev
            }
        }
    }

    // Initialize
    collectImages();
}

/* ========== VIDEO SECTION CONTROLLER ========== */
function initVideoSection() {
    const video = document.getElementById('main-video');
    const overlay = document.getElementById('video-overlay');
    const container = document.getElementById('video-container');

    if (!video || !overlay || !container) return;

    let isUserPaused = false;
    let hasStartedOnce = false;

    // Play video function
    function playVideo() {
        video.play().then(() => {
            video.classList.add('is-playing');
            overlay.classList.add('is-hidden');
            hasStartedOnce = true;
        }).catch(err => {
            console.log('Video autoplay prevented:', err);
        });
    }

    // Pause video function
    function pauseVideo() {
        video.pause();
        // Don't hide the playing class immediately for smooth transition
    }

    // Toggle play/pause on click
    container.addEventListener('click', () => {
        if (video.paused) {
            isUserPaused = false;
            playVideo();
        } else {
            isUserPaused = true;
            pauseVideo();
            video.classList.remove('is-playing');
            overlay.classList.remove('is-hidden');
        }
    });

    // Intersection Observer for scroll-triggered playback
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                // Video is 50%+ visible - auto play if not user paused
                if (!isUserPaused) {
                    playVideo();
                }
            } else if (entry.intersectionRatio < 0.3) {
                // Video is <30% visible - pause
                if (!video.paused && !isUserPaused) {
                    pauseVideo();
                }
            }
        });
    }, {
        threshold: [0, 0.3, 0.5, 1.0]
    });

    // Start observing
    const animationSection = document.getElementById('animation');
    if (animationSection) {
        videoObserver.observe(animationSection);
    }

    // Keyboard accessibility
    container.setAttribute('tabindex', '0');
    container.setAttribute('role', 'button');
    container.setAttribute('aria-label', 'Putar atau pause video');

    container.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            container.click();
        }
    });
}

console.log('✨ Portfolio loaded! Made with 💖 by Wilbert Reyhan Susabda');

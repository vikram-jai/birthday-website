// ============================================
// Birthday Surprise — Main Script
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ------- NAVBAR SCROLL EFFECT -------
    const navbar = document.querySelector('.navbar-main');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ------- COUNTDOWN TIMER -------
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (daysEl && hoursEl && minsEl && secsEl) {
        const countDate = new Date('Mar 07, 2026 00:00:00').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = countDate - now;

            if (distance <= 0) {
                daysEl.textContent = '🎉';
                hoursEl.textContent = '🎉';
                minsEl.textContent = '🎉';
                secsEl.textContent = '🎉';
                document.querySelectorAll('.count-label').forEach(function (el) {
                    el.textContent = 'YAY!';
                });
            } else {
                daysEl.textContent = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
                hoursEl.textContent = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
                minsEl.textContent = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
                secsEl.textContent = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
            }
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ------- FLOATING PARTICLES (Hero) -------
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const emojis = ['✨', '🎈', '🎉', '💫', '⭐', '🌟', '💖', '🎂'];
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.fontSize = (Math.random() * 16 + 10) + 'px';
            particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.bottom = '-30px';
            particlesContainer.appendChild(particle);
        }
    }

    // ------- TYPING ANIMATION (Letter Page) -------
    const typingEl = document.getElementById('typing');
    if (typingEl) {
        const text = "Dear Janani,\n\nYou are the strongest, funniest, and most caring girl in my life. Every moment spent with you is a memory I cherish forever.\n\nYour smile lights up the darkest days, your laughter is the best melody, and your heart is the purest I've ever known.\n\nOn this special day, I just want you to know — you are loved beyond words, appreciated beyond measure, and missed beyond belief.\n\nHappy Birthday, Queen! 👑🎂";

        let i = 0;
        const cursor = typingEl.querySelector('.cursor');

        function typeWriter() {
            if (i < text.length) {
                const char = text.charAt(i);
                if (char === '\n') {
                    typingEl.insertBefore(document.createElement('br'), cursor);
                } else {
                    typingEl.insertBefore(document.createTextNode(char), cursor);
                }
                i++;
                const delay = char === '.' || char === ',' || char === '\n' ? 120 : 35;
                setTimeout(typeWriter, delay);
            } else {
                // Show signature after typing ends
                const sig = document.getElementById('signature');
                if (sig) {
                    sig.style.transition = 'opacity 1s ease';
                    sig.style.opacity = '1';
                }
            }
        }

        // Start typing after a small delay
        setTimeout(typeWriter, 800);
    }

    // ------- SCROLL REVEAL ANIMATION -------
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    // ------- MUSIC TOGGLE -------
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');

    if (musicToggle && bgMusic) {
        // Check if music was playing (persisted state)
        const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
        if (wasPlaying) {
            bgMusic.play().then(function () {
                musicToggle.textContent = '🔊';
                musicToggle.classList.add('playing');
            }).catch(function () {
                // Autoplay blocked; require user click
            });
        }

        musicToggle.addEventListener('click', function () {
            if (bgMusic.paused) {
                bgMusic.play();
                musicToggle.textContent = '🔊';
                musicToggle.classList.add('playing');
                localStorage.setItem('musicPlaying', 'true');
            } else {
                bgMusic.pause();
                musicToggle.textContent = '🔇';
                musicToggle.classList.remove('playing');
                localStorage.setItem('musicPlaying', 'false');
            }
        });
    }

});

// ------- LIGHTBOX (Gallery) -------
function openLightbox(el) {
    const lightbox = document.getElementById('lightbox');
    const img = el.querySelector('img');
    if (lightbox && img) {
        document.getElementById('lightbox-img').src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox(event) {
    const lightbox = document.getElementById('lightbox');
    if (event.target === lightbox || event.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close lightbox with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});
/* ============================================
   DR. LISA SAMIR - MAIN JAVASCRIPT
   Premium Website Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initCounters();
    initFAQ();
    initBookingForm();
    initBlogFilter();
    initSmoothScroll();
});

/* ============ NAVBAR ============ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/* ============ MOBILE MENU ============ */
function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    const links = menu.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ============ SCROLL REVEAL ANIMATIONS ============ */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-header, .stat-card, .transformation-card, .service-card, ' +
        '.why-card, .reel-card, .testimonial-card, .faq-item, ' +
        '.about-grid, .mission-card, .cert-card, .philosophy-item, ' +
        '.media-card, .blog-card, .pricing-card, .detail-block'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal', 'active');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

/* ============ ANIMATED COUNTERS ============ */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/* ============ FAQ ACCORDION ============ */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* ============ BOOKING FORM MULTI-STEP ============ */
function initBookingForm() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    const steps = form.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextBtns = form.querySelectorAll('.step-next');
    const prevBtns = form.querySelectorAll('.step-prev');
    let currentStep = 1;

    function showStep(stepNum) {
        steps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.getAttribute('data-step')) === stepNum) {
                step.classList.add('active');
            }
        });

        progressSteps.forEach(ps => {
            const psStep = parseInt(ps.getAttribute('data-step'));
            ps.classList.toggle('active', psStep <= stepNum);
        });

        currentStep = stepNum;
    }

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < steps.length) {
                showStep(currentStep + 1);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show success message
        steps.forEach(step => step.classList.remove('active'));
        const success = document.getElementById('formSuccess');
        if (success) {
            success.style.display = 'block';
        }

        // Update progress
        progressSteps.forEach(ps => ps.classList.add('active'));
    });
}

/* ============ BLOG CATEGORY FILTER ============ */
function initBlogFilter() {
    const tabs = document.querySelectorAll('.category-tab');
    const cards = document.querySelectorAll('.blog-card');

    if (tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');

            // Filter cards
            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = '';
                    card.style.animation = 'fadeIn 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ============ SMOOTH SCROLL ============ */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============ LEAD FORM HANDLER ============ */
const leadForm = document.getElementById('leadForm');
if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = leadForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-check"></i> Guide Sent to Your Email!';
        btn.style.background = '#25D366';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            leadForm.reset();
        }, 3000);
    });
}

/* ============ NEWSLETTER FORM ============ */
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        btn.style.background = '#25D366';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            form.reset();
        }, 3000);
    });
});

/* ============ TRANSFORMATION CAROUSEL ============ */
(function initTransformationCarousel() {
    const carousel = document.querySelector('.transformations-carousel');
    if (!carousel) return;

    const cards = carousel.querySelectorAll('.transformation-card');
    const dots = document.querySelectorAll('.transformations .dot');
    const prevBtn = document.querySelector('.transformations .carousel-btn.prev');
    const nextBtn = document.querySelector('.transformations .carousel-btn.next');

    if (cards.length === 0) return;

    let current = 0;

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function updateCarousel() {
        if (isMobile()) {
            carousel.scrollTo({
                left: cards[current].offsetLeft - 16,
                behavior: 'smooth'
            });
        }
        dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            current = current > 0 ? current - 1 : cards.length - 1;
            updateCarousel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            current = current < cards.length - 1 ? current + 1 : 0;
            updateCarousel();
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            current = i;
            updateCarousel();
        });
    });
})();

/* ============ TESTIMONIAL SLIDER ============ */
(function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;

    const cards = slider.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.testimonial-controls .carousel-btn.prev');
    const nextBtn = document.querySelector('.testimonial-controls .carousel-btn.next');

    if (cards.length === 0) return;

    let current = 0;

    function updateSlider() {
        if (window.innerWidth <= 768) {
            slider.scrollTo({
                left: cards[current].offsetLeft - 16,
                behavior: 'smooth'
            });
        }
        dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            current = current > 0 ? current - 1 : cards.length - 1;
            updateSlider();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            current = current < cards.length - 1 ? current + 1 : 0;
            updateSlider();
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            current = i;
            updateSlider();
        });
    });

    // Auto-play
    setInterval(() => {
        current = current < cards.length - 1 ? current + 1 : 0;
        updateSlider();
    }, 5000);
})();

/* ============ PARALLAX EFFECT ON HERO ============ */
(function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const floatingItems = hero.querySelectorAll('.floating-item');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            floatingItems.forEach((item, i) => {
                const speed = 0.2 + (i * 0.1);
                item.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.02}deg)`;
            });
        }
    });
})();

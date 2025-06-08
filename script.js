// Enhanced JavaScript for the improved website
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced CTA button interactions
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        // Add click tracking
        button.addEventListener('click', function(e) {
            // Add analytics tracking here if needed
            console.log('CTA clicked:', this.href);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });

        // Enhanced hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Floating CTA visibility control
    const floatingCTA = document.getElementById('floating-cta');
    const mainCTA = document.getElementById('main-cta');
    
    function toggleFloatingCTA() {
        if (!mainCTA || !floatingCTA) return;
        
        const mainCTARect = mainCTA.getBoundingClientRect();
        const isMainCTAVisible = mainCTARect.top < window.innerHeight && mainCTARect.bottom > 0;
        
        if (isMainCTAVisible) {
            floatingCTA.style.opacity = '0';
            floatingCTA.style.pointerEvents = 'none';
        } else {
            floatingCTA.style.opacity = '1';
            floatingCTA.style.pointerEvents = 'auto';
        }
    }

    // Initial check and scroll listener
    toggleFloatingCTA();
    window.addEventListener('scroll', toggleFloatingCTA);

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.ebook-card, .value-item, .transformation-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Countdown timer (optional - can be activated if needed)
    function startCountdown(duration) {
        const urgencyBanner = document.querySelector('.urgency-banner .urgency-text');
        if (!urgencyBanner) return;

        let timer = duration;
        const countdown = setInterval(() => {
            const hours = Math.floor(timer / 3600);
            const minutes = Math.floor((timer % 3600) / 60);
            const seconds = timer % 60;

            if (hours > 0) {
                urgencyBanner.textContent = `🔥 OFERTA LIMITADA - ${hours}h ${minutes}m ${seconds}s restantes!`;
            } else {
                urgencyBanner.textContent = `🔥 OFERTA LIMITADA - ${minutes}m ${seconds}s restantes!`;
            }

            if (--timer < 0) {
                clearInterval(countdown);
                urgencyBanner.textContent = '🔥 OFERTA LIMITADA - Últimas horas!';
            }
        }, 1000);
    }

    // Uncomment to activate countdown (24 hours = 86400 seconds)
    // startCountdown(86400);

    // Enhanced scroll effects
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }

    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestScrollUpdate);

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger hero animation
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.animation = 'fadeInUp 1s ease-out';
        }
    });

    // Form validation and enhancement (if forms are added later)
    function enhanceForm(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add floating label effect
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Real-time validation
            input.addEventListener('input', function() {
                validateField(this);
            });
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;

        // Basic validation rules
        if (field.required && !value) {
            isValid = false;
        } else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        } else if (type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\(\)\+]+$/;
            isValid = phoneRegex.test(value);
        }

        // Visual feedback
        field.classList.toggle('invalid', !isValid);
        field.classList.toggle('valid', isValid && value);

        return isValid;
    }

    // Initialize forms if they exist
    const forms = document.querySelectorAll('form');
    forms.forEach(enhanceForm);

    // Add click tracking for analytics
    function trackClick(element, eventName) {
        element.addEventListener('click', function() {
            // Replace with your analytics code
            console.log('Event tracked:', eventName, {
                element: this.tagName,
                text: this.textContent.trim(),
                href: this.href || null,
                timestamp: new Date().toISOString()
            });
            
            // Example: Google Analytics 4
            // gtag('event', eventName, {
            //     'event_category': 'engagement',
            //     'event_label': this.textContent.trim()
            // });
        });
    }

    // Track important interactions
    const trackableElements = document.querySelectorAll('.cta-button, .floating-button, .ebook-card');
    trackableElements.forEach(el => {
        if (el.classList.contains('cta-button') || el.classList.contains('floating-button')) {
            trackClick(el, 'cta_click');
        } else if (el.classList.contains('ebook-card')) {
            trackClick(el, 'ebook_card_click');
        }
    });

    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        // Observe images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key to close any modals (if added later)
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => modal.classList.remove('active'));
        }
        
        // Enter key on CTA buttons
        if (e.key === 'Enter' && e.target.classList.contains('cta-button')) {
            e.target.click();
        }
    });

    console.log('Enhanced website loaded successfully! 🚀');
});


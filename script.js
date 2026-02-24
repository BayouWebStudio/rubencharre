// Language Toggle Functionality
let currentLang = localStorage.getItem('language') || 'es';

function initializeLanguage() {
    const langBtn = document.getElementById('lang-btn');
    const html = document.getElementById('html');
    const pageTitle = document.getElementById('page-title');
    const metaDescription = document.getElementById('meta-description');
    
    if (currentLang === 'en') {
        langBtn.textContent = 'ES';
        html.lang = 'en';
        pageTitle.textContent = 'Ruben Charre - Neo Traditional Tattoo Artist | San Luis Potosí';
        metaDescription.content = 'Neo traditional tattoo artist specialized in vibrant colors with Japanese influences. 42K+ Instagram followers. Based in San Luis Potosí, Mexico.';
    } else {
        langBtn.textContent = 'EN';
        html.lang = 'es';
        pageTitle.textContent = 'Ruben Charre - Tatuador Neo Tradicional | San Luis Potosí';
        metaDescription.content = 'Artista tatuador especializado en neo tradicional en San Luis Potosí. Más de 42K seguidores. Estilo vibrante con influencias japonesas.';
    }
    
    updateContent();
}

function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('language', currentLang);
    initializeLanguage();
}

function updateContent() {
    const elements = document.querySelectorAll('[data-es][data-en]');
    
    elements.forEach(element => {
        if (currentLang === 'es') {
            element.textContent = element.getAttribute('data-es');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
}

// Mobile Navigation
function initializeMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Background on Scroll
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

// Portfolio Image Modal (Simple Lightbox)
function initializePortfolioModal() {
    const portfolioItems = document.querySelectorAll('.portfolio-item img');
    
    portfolioItems.forEach(img => {
        img.addEventListener('click', () => {
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;
            
            // Add modal styles
            modal.style.cssText = `
                position: fixed;
                z-index: 10000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                animation: fadeIn 0.3s ease;
            `;
            
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
            `;
            
            const modalImg = modal.querySelector('img');
            modalImg.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: 10px;
            `;
            
            const closeBtn = modal.querySelector('.close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                color: #fafafa;
                font-size: 35px;
                font-weight: bold;
                cursor: pointer;
                z-index: 10001;
            `;
            
            // Close modal functionality
            const closeModal = () => {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
            
            document.body.appendChild(modal);
        });
    });
}

// Intersection Observer for Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.service-card, .portfolio-item, .about-text, .contact-info');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Add CSS animations
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .service-card, .portfolio-item, .about-text, .contact-info {
            opacity: 0;
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.fade-in, .portfolio-item.fade-in, .about-text.fade-in, .contact-info.fade-in {
            opacity: 1;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .service-card, .portfolio-item, .about-text, .contact-info {
                opacity: 1;
                animation: none !important;
                transition: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    initializeMobileNav();
    initializeSmoothScrolling();
    initializeNavbarScroll();
    initializePortfolioModal();
    addAnimationStyles();
    
    // Delay animations slightly to ensure smooth page load
    setTimeout(initializeAnimations, 500);
});

// Handle page visibility changes (for better performance)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause any animations or intensive operations
    } else {
        // Page is visible again
    }
});

// Performance optimization: Lazy load portfolio images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);
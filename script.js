document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('js-scroll');
    console.log('DOM Content Loaded');
    
    // Logo click handler to return to hero
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Remove active class from all nav links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
        });
    }

    // Project links handling
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach((link, index) => {
        // Add multiple event listeners to ensure we catch the click
        ['click', 'mousedown', 'touchstart'].forEach(eventType => {
            link.addEventListener(eventType, function(e) {
                if (eventType !== 'click') return; // Only process click events
                
                const href = this.getAttribute('href');
                
                // Always prevent default first
                e.preventDefault();
                e.stopPropagation();
                
                // Check if it's a placeholder or empty link
                if (!href || href === '#' || href.trim() === '') {
                    alert('This project link will be available soon!');
                    return;
                }
                
                // For real URLs, let them open in new tab
                if (href.includes('github.com') || href.includes('demo') || href.includes('http')) {
                    try {
                        window.open(href, '_blank', 'noopener,noreferrer');
                    } catch (error) {
                        alert('Error opening link. Please try again.');
                    }
                } else {
                    // Try to open anyway
                    window.open(href, '_blank', 'noopener,noreferrer');
                }
            }, true); // Use capture phase
        });
        
        // Also add a direct onclick as backup
        link.onclick = function(e) {
            return false; // Prevent default
        };
    });

    // Coin flip initialization
    const coin = document.getElementById('coin');
    console.log('Coin element:', coin);
    
    if (coin) {
        console.log('Adding click event listener to coin');
        coin.addEventListener('click', flipCoin);
        
        // Preload images
        const frontImage = new Image();
        const backImage = new Image();
        
        // Update image paths to match the actual files
        frontImage.src = 'icons/orb blue 3.svg';
        backImage.src = 'icons/orb red.svg';
        
        frontImage.onload = () => {
            console.log('Front image loaded');
            const img = coin.querySelector('.coin-front img');
            if (img) {
                img.src = frontImage.src;
                img.style.opacity = '1';
            }
        };
        
        backImage.onload = () => {
            console.log('Back image loaded');
            const img = coin.querySelector('.coin-back img');
            if (img) {
                img.src = backImage.src;
                img.style.opacity = '1';
            }
        };
        
        // Add error handling
        frontImage.onerror = () => console.error('Failed to load front image');
        backImage.onerror = () => console.error('Failed to load back image');
    } else {
        console.error('Coin element not found!');
    }

    // Experience tab functionality
    const experienceNavItems = document.querySelectorAll('.experience-nav li');
    const experienceItems = document.querySelectorAll('.experience-item');
    
    experienceNavItems.forEach(navItem => {
        navItem.addEventListener('click', function() {
            const experienceKey = this.getAttribute('data-experience');
            
            // Remove active class from all nav items and experience items
            experienceNavItems.forEach(item => item.classList.remove('active'));
            experienceItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Show corresponding experience content
            const targetContent = document.querySelector(`[data-experience-content="${experienceKey}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Navbar scroll effect (keep only the scrolled class effect)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Calculate offset
                const navbarHeight = 80; // px, adjust if needed
                const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: sectionTop - navbarHeight,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    this.classList.add('active');
                }, 1000);
            }
        });
    });

    // Initialize navigation
    updateActiveNavLink();

    // Add scroll-fade-in to all main sections
    ['about', 'experience', 'projects'].forEach(id => {
        const section = document.getElementById(id);
        if (section) section.classList.add('scroll-fade-in');
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Navbar scroll effect
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Experience tabs
    const experienceTabs = document.querySelectorAll('.experience-nav li');
    const experienceContents = document.querySelectorAll('.experience-item');

    experienceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            experienceTabs.forEach(t => t.classList.remove('active'));
            experienceContents.forEach(c => {
                c.classList.remove('active');
                c.style.display = 'none';
            });
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content with animation
            const targetContent = document.querySelector(`[data-experience-content="${tab.dataset.experience}"]`);
            if (targetContent) {
                targetContent.style.display = 'block';
                // Trigger reflow
                targetContent.offsetHeight;
                targetContent.classList.add('active');
            }
        });
    });

    // Add smooth hover effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Add CSS classes for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .loaded {
            opacity: 1;
        }
        
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});

// Function for smooth scrolling (used by buttons)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Enable smooth scrolling after page loads
window.addEventListener('load', function() {
    document.documentElement.classList.add('smooth-scroll');
    // Additional fix to ensure we're at top
    window.scrollTo(0, 0);
});

// Coin flip animation
let isFlipping = false;

function flipCoin() {
    if (isFlipping) return;
    
    isFlipping = true;
    const coin = document.getElementById('coin');
    
    if (coin) {
        coin.classList.add('flipping');
        
        setTimeout(() => {
            isFlipping = false;
            coin.classList.remove('flipping');
            void coin.offsetWidth; // Force reflow
        }, 1200);
    }
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Experience tabs
const experienceTabs = document.querySelectorAll('.experience-nav li');
const experienceContents = document.querySelectorAll('.experience-item');

experienceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        experienceTabs.forEach(t => t.classList.remove('active'));
        experienceContents.forEach(c => {
            c.classList.remove('active');
            c.style.display = 'none';
        });
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding content with animation
        const targetContent = document.querySelector(`[data-experience-content="${tab.dataset.experience}"]`);
        if (targetContent) {
            targetContent.style.display = 'block';
            // Trigger reflow
            targetContent.offsetHeight;
            targetContent.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in
document.querySelectorAll('.project-card, .experience-container, .hero-badge, .typewriter, .hero-subtitle, .hero-actions').forEach(el => {
    el.classList.add('fade-in-element');
    observer.observe(el);
});

// Coin flip animation
const coin = document.getElementById('coin');
if (coin) {
    coin.addEventListener('click', () => {
        coin.classList.add('flipping');
        setTimeout(() => {
            coin.classList.remove('flipping');
        }, 1000);
    });
}

// Add smooth hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style); 
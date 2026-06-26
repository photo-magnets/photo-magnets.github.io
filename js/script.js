// ============================================
// MAGNETIC MEMORIES - WEBSITE FUNCTIONALITY
// ============================================

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// Smooth Scrolling for anchor links
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

// Product link placeholder button fallback
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.href && this.href !== window.location.href && !this.href.endsWith('#')) {
            return;
        }

        e.preventDefault();
        const productName = this.closest('.shop-product').querySelector('h3').textContent;
        const price = this.closest('.product-footer').querySelector('.price').textContent;
        
        // Show notification
        showNotification(`Product link coming soon: ${productName} - ${price}`);
        
        // Add animation
        this.textContent = '✓ Selected';
        this.style.backgroundColor = '#7ED321';
        
        setTimeout(() => {
            this.textContent = 'Link Coming Soon';
            this.style.backgroundColor = '';
        }, 2000);
    });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (validateEmail(email)) {
            showNotification(`Thank you! Check your email at ${email} for confirmation.`, 'success');
            this.reset();
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// Sort Dropdown Functionality
const sortDropdown = document.querySelector('.sort-dropdown');
if (sortDropdown) {
    sortDropdown.addEventListener('change', function() {
        const selectedSort = this.value;
        console.log('Sorting by:', selectedSort);
        // In a real application, this would sort the products
        showNotification(`Sorted: ${selectedSort}`);
    });
}

// Filter Checkboxes
const filterCheckboxes = document.querySelectorAll('.filter-list input[type="checkbox"]');
filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const filterName = this.parentElement.textContent.trim();
        if (this.checked) {
            showNotification(`Filter applied: ${filterName}`);
        }
    });
});

// Pagination
const pageButtons = document.querySelectorAll('.page-btn');
pageButtons.forEach(button => {
    button.addEventListener('click', function() {
        pageButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Smooth scroll to top of products
        const shopProducts = document.querySelector('.shop-products');
        if (shopProducts) {
            shopProducts.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Product Card Hover Effect
const productCards = document.querySelectorAll('.product-card, .shop-product');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// CTA Button Click Handler
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            showNotification('Redirecting to shop...');
            setTimeout(() => {
                window.location.href = 'shop.html';
            }, 500);
        }
    });
});

// Feature Card Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const featureCards = document.querySelectorAll('.feature-card, .testimonial, .sidebar-box');
featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#44A08D' : type === 'error' ? '#E74C3C' : '#A77A3E'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Email Validation
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Add CSS Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        gap: 0.5rem;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Scroll to Top Button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #A77A3E;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 24px;
        z-index: 999;
        display: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#765126';
        this.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#A77A3E';
        this.style.transform = 'scale(1)';
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
}

// Initialize scroll to top button
createScrollToTopButton();

// Image Lazy Loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Track Page Views (for analytics)
function trackPageView() {
    const page = window.location.pathname;
    console.log('Page viewed:', page);
    // In a real application, send this to an analytics service
}

trackPageView();

// Performance Monitoring
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    }
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        showNotification
    };
}

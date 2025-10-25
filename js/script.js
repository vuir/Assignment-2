// ===========================
// Portfolio Website JavaScript
// ===========================

(function() {
    'use strict';

    // DOM Elements - References to key HTML elements used throughout the application
    const navbar = document.getElementById('navbar'); // Main navigation bar
    const navToggle = document.getElementById('nav-toggle'); // Mobile menu toggle button (hamburger icon)
    const navMenu = document.getElementById('nav-menu'); // Desktop navigation menu (hidden on mobile)
    const navLinks = document.querySelectorAll('.nav-link'); // All navigation links for section navigation
    const contactForm = document.getElementById('contact-form'); // Contact form for user inquiries
    const formStatus = document.getElementById('form-status'); // Element to display form submission status
    const currentYear = document.getElementById('current-year'); // Element to display current year in copyright
    const greetingMessage = document.getElementById('greeting-message'); // Personalized greeting message in footer

    // Application State - Variables that track the current state of the UI
    let isMenuOpen = false; // Tracks whether mobile menu is currently open
    let currentSection = 'home'; // Tracks the currently active section for navigation highlighting

    // ===========================
    // Utility Functions
    // ===========================

    /**
     * Debounce function to limit the rate at which a function can fire
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Get element's offset from top of page
     */
    function getOffsetTop(element) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.pageYOffset;
    }


    // ===========================
    // Navigation Functions
    // ===========================

    /**
     * Toggle mobile navigation menu - shows/hides mobile menu and updates UI state
     */
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen; // Toggle the menu state

        // Update CSS classes to show/hide menu and animate hamburger icon
        navToggle.classList.toggle('active', isMenuOpen);
        navMenu.classList.toggle('active', isMenuOpen);

        // Update ARIA attributes for accessibility (screen readers)
        navToggle.setAttribute('aria-expanded', isMenuOpen);
        navMenu.setAttribute('aria-hidden', !isMenuOpen);

        // Prevent body scroll when menu is open to improve UX on mobile
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        if (isMenuOpen) {
            toggleMobileMenu();
        }
    }

    /**
     * Handle navigation link clicks
     */
    function handleNavLinkClick(e) {
        e.preventDefault();

        const href = e.target.getAttribute('href');
        const targetSection = href.substring(1); // Remove '#'

        // Close mobile menu if open
        closeMobileMenu();

        // Smooth scroll to section
        scrollToSection(targetSection);

        // Update active link
        setActiveNavLink(targetSection);
    }

    /**
     * Smooth scroll to section
     */
    function scrollToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (!targetElement) return;

        const targetPosition = getOffsetTop(targetElement) - navbar.offsetHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    /**
     * Update active navigation link based on current section
     */
    function setActiveNavLink(sectionId) {
        currentSection = sectionId;

        navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (href === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * Scroll spy - update active nav link based on scroll position
     * Uses reverse iteration to find the section currently in view
     */
    function updateActiveNavLink() {
        const sections = ['home', 'about', 'skills', 'projects', 'contact'];
        const scrollPosition = window.pageYOffset + navbar.offsetHeight + 100; // Account for navbar height + buffer

        // Loop backwards through sections to find the one currently in view
        // This ensures we get the section that's most recently scrolled into view
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section && getOffsetTop(section) <= scrollPosition) {
                // Only update if we're in a different section than before
                if (currentSection !== sections[i]) {
                    setActiveNavLink(sections[i]);
                }
                break; // Stop at the first section we find (since we're going backwards)
            }
        }
    }

    // ===========================
    // Form Validation Functions
    // ===========================

    /**
     * Validate form field - performs validation based on field type and requirements
     */
    function validateField(field) {
        const value = field.value.trim(); // Remove whitespace from beginning and end
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);

        let isValid = true;
        let errorMessage = '';

        // Required field validation - check if field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        }

        // Name validation - minimum length check
        if (fieldName === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
        }

        // Email validation - regex pattern matching for email format
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation pattern
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Message validation - minimum length check
        if (fieldName === 'message' && value) {
            if (value.length < 5) {
                isValid = false;
                errorMessage = 'Message must be at least 5 characters long';
            }
        }

        // Update field styling and error message display
        field.classList.toggle('error', !isValid); // Add/remove error class for styling
        if (errorElement) {
            errorElement.textContent = errorMessage; // Display error message
            errorElement.setAttribute('aria-live', isValid ? 'off' : 'polite'); // Screen reader support
        }

        return isValid;
    }

    /**
     * Show form status message
     */
    function showFormStatus(message, type = 'error') {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.setAttribute('aria-live', 'polite');

        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        }
    }

    /**
     * Handle form submission
     */
    async function handleFormSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const formFields = contactForm.querySelectorAll('.form-input');
        let isFormValid = true;
        let firstInvalidField = null;

        formFields.forEach(field => {
            const isFieldValid = validateField(field);
            if (!isFieldValid && !firstInvalidField) {
                firstInvalidField = field;
            }
            isFormValid = isFormValid && isFieldValid;
        });

        // Focus first invalid field
        if (firstInvalidField) {
            firstInvalidField.focus();
            showFormStatus('Please fix the highlighted fields');
            return;
        }

        // If form is valid, submit to Formspree
        if (isFormValid) {
            try {
                // Show loading state
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Prepare form data
                const formData = new FormData(contactForm);

                // Submit to Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showFormStatus('Thank you! Your message has been sent successfully.', 'success');

                    // Reset form after successful submission
                    setTimeout(() => {
                        contactForm.reset();
                        // Clear any error states
                        formFields.forEach(field => {
                            field.classList.remove('error');
                            const errorElement = document.getElementById(`${field.name}-error`);
                            if (errorElement) {
                                errorElement.textContent = '';
                            }
                        });
                    }, 1000);
                } else {
                    throw new Error('Form submission failed');
                }

            } catch (error) {
                console.error('Form submission error:', error);
                showFormStatus('Oops! There was a problem sending your message. Please try again.', 'error');
            } finally {
                // Reset button state
                const submitBtn = contactForm.querySelector('.submit-btn');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }
    }

    // ===========================
    // Event Listeners
    // ===========================

    /**
     * Initialize event listeners
     */
    function initEventListeners() {
        // Navigation toggle
        navToggle.addEventListener('click', toggleMobileMenu);

        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavLinkClick);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !navbar.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Handle escape key to close mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMobileMenu();
            }
        });

        // Form submission
        contactForm.addEventListener('submit', handleFormSubmit);

        // Form field validation on blur
        contactForm.querySelectorAll('.form-input').forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                // Clear error state on input
                if (field.classList.contains('error')) {
                    validateField(field);
                }
            });
        });

        // Scroll event for scroll spy
        window.addEventListener('scroll', debounce(updateActiveNavLink, 100));

        // Resize event to handle mobile menu
        window.addEventListener('resize', () => {
            if (window.innerWidth > 860 && isMenuOpen) {
                closeMobileMenu();
            }
        });
    }

    // ===========================
    // Initialize Functions
    // ===========================

    /**
     * Update greeting message based on time of day - displays contextual welcome message
     */
    function updateGreetingMessage() {
        const hour = new Date().getHours(); // Get current hour (0-23)
        let greeting;

        // Determine appropriate greeting based on time of day
        if (hour >= 5 && hour < 12) {
            greeting = "Good morning! ☀️ Thank you for visiting my portfolio.";
        } else if (hour >= 12 && hour < 17) {
            greeting = "Good afternoon! 🌤️ Thank you for visiting my portfolio.";
        } else if (hour >= 17 && hour < 21) {
            greeting = "Good evening! 🌆 Thank you for visiting my portfolio.";
        } else {
            greeting = "Good night! 🌙 Thank you for visiting my portfolio.";
        }

        // Update the greeting message in the footer if element exists
        if (greetingMessage) {
            greetingMessage.textContent = greeting;
        }
    }

    /**
     * Update footer year
     */
    function updateFooterYear() {
        const year = new Date().getFullYear();
        if (currentYear) {
            currentYear.textContent = year;
        }
    }

    /**
     * Add loading animation to skill icons - fade in and slide up when visible
     */
    function initSkillAnimations() {
        const skillItems = document.querySelectorAll('.skill-item');

        // Intersection Observer to trigger animations when elements come into view
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate in when element becomes visible
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of element is visible
            rootMargin: '0px 0px -50px 0px' // Trigger 50px before element enters viewport
        });

        skillItems.forEach((item, index) => {
            // Set initial state for animation (hidden and slightly below)
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            // Staggered animation delay based on index for wave effect
            item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

            skillObserver.observe(item); // Start observing for intersection
        });
    }

    /**
     * Add loading animation to project cards - fade in and slide up when visible
     */
    function initProjectAnimations() {
        const projectCards = document.querySelectorAll('.project-card');

        // Intersection Observer to trigger animations when project cards come into view
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate in when project card becomes visible
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of element is visible
        });

        projectCards.forEach((card, index) => {
            // Set initial state for animation (hidden and slightly below)
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            // Longer staggered delay for project cards (0.2s between each)
            card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;

            projectObserver.observe(card); // Start observing for intersection
        });
    }

    /**
     * Initialize the application
     */
    function init() {
        // Update greeting message based on time of day
        updateGreetingMessage();

        // Update footer year
        updateFooterYear();

        // Initialize event listeners
        initEventListeners();

        // Initialize animations
        initSkillAnimations();
        initProjectAnimations();

        // Set initial active nav link
        setActiveNavLink('home');

        // Add loaded class to body for any CSS animations
        document.body.classList.add('loaded');

        console.log('Portfolio website initialized successfully!');
    }

    // ===========================
    // Initialize on DOM Load
    // ===========================

    // Check if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

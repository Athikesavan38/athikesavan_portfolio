document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------
    // 0. PAGE LOADER
    // ----------------------------------------------------
    const pageLoader = document.getElementById('page-loader');
    
    // Hide loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            pageLoader.classList.add('hidden');
        }, 500);
    });
    
    // ----------------------------------------------------
    // 0.5. MOBILE MENU
    // ----------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.remove('opacity-0', 'pointer-events-none');
        mobileMenuOverlay.classList.add('opacity-100');
        mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.add('opacity-0', 'pointer-events-none');
        mobileMenuOverlay.classList.remove('opacity-100');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }
    
    if (closeMobileMenuBtn) {
        closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when clicking nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // ----------------------------------------------------
    // 1. DARK/LIGHT MODE TOGGLE
    // ----------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const themeIconDark = document.getElementById('theme-icon-dark');
    const themeIconLight = document.getElementById('theme-icon-light');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the theme on page load
    if (currentTheme === 'light') {
        htmlElement.classList.add('light-mode');
        themeIconDark.classList.remove('hidden');
        themeIconLight.classList.add('hidden');
    }
    
    // Function to update navbar colors based on theme
    function updateNavbarTheme() {
        const navbar = document.querySelector('.floating-nav');
        const isLightMode = htmlElement.classList.contains('light-mode');
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll > 100) {
                if (isLightMode) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.15)';
                } else {
                    navbar.style.background = 'rgba(13, 19, 35, 0.95)';
                    navbar.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.7)';
                }
            } else {
                if (isLightMode) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.8)';
                    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.background = 'rgba(13, 19, 35, 0.7)';
                    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
                }
            }
        }
    }
    
    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            htmlElement.classList.toggle('light-mode');
            
            if (htmlElement.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                themeIconDark.classList.remove('hidden');
                themeIconLight.classList.add('hidden');
            } else {
                localStorage.setItem('theme', 'dark');
                themeIconDark.classList.add('hidden');
                themeIconLight.classList.remove('hidden');
            }
            
            // Update navbar colors immediately
            updateNavbarTheme();
        });
    }
    
    // ----------------------------------------------------
    // 2. CUSTOM CURSOR LOGIC WITH MASSIVE EFFECTS
    // ----------------------------------------------------
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let particleTimer = null;

    // Track mouse movement (only if cursor elements exist)
    if (cursorDot && cursorRing) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instant movement for the dot
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
            
            // Create particle trail effect (throttled)
            if (!particleTimer) {
                createParticle(mouseX, mouseY);
                particleTimer = setTimeout(() => {
                    particleTimer = null;
                }, 50); // Create particle every 50ms
            }
        });

        // Smooth animation loop for the trailing ring
        function animateCursor() {
            // LERP (Linear Interpolation) for smooth trailing effect
            ringX += (mouseX - ringX) * 0.2;
            ringY += (mouseY - ringY) * 0.2;
            
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Create particle trail
        function createParticle(x, y) {
            const particle = document.createElement('div');
            particle.className = 'cursor-particle';
            
            // Random color between primary and secondary accent
            const colors = [
                'linear-gradient(135deg, #6366f1, #2dd4bf)',
                'linear-gradient(135deg, #2dd4bf, #6366f1)',
                'radial-gradient(circle, #6366f1, transparent)',
                'radial-gradient(circle, #2dd4bf, transparent)'
            ];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            // Random offset for natural spread
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;
            
            particle.style.left = `${x + offsetX}px`;
            particle.style.top = `${y + offsetY}px`;
            
            document.body.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 800);
        }
        
        // Create ripple effect on click
        function createRipple(x, y) {
            const ripple = document.createElement('div');
            ripple.className = 'cursor-ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            document.body.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }

        // Add hover effect states for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .nav-link');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
        
        // Add magnetic effect for buttons
        const magneticElements = document.querySelectorAll('button, .nav-btn, .cta-btn');
        magneticElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-magnetic');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-magnetic');
            });
            
            // Magnetic pull effect
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Apply subtle magnetic pull
                el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
        
        // Add click effect with ripple
        document.addEventListener('mousedown', (e) => {
            document.body.classList.add('cursor-click');
            createRipple(e.clientX, e.clientY);
            
            // Create burst of particles on click
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    createParticle(e.clientX, e.clientY);
                }, i * 20);
            }
        });
        
        document.addEventListener('mouseup', () => {
            document.body.classList.remove('cursor-click');
        });
    }
    
    // ----------------------------------------------------
    // 2.5. NAVBAR SCROLL EFFECTS & ACTIVE LINKS
    // ----------------------------------------------------
    const navbar = document.querySelector('.floating-nav');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    const scrollDownBtn = document.querySelector('.scroll-down');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    // Scroll to top button functionality
    if (scrollToTopBtn) {
        const progressCircle = document.getElementById('progress-circle');
        const circumference = 2 * Math.PI * 22; // 2πr where r=22
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide scroll to top button and update progress based on scroll position
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            
            // Update progress circle
            if (progressCircle) {
                const offset = circumference - (scrollPercentage / 100) * circumference;
                progressCircle.style.strokeDashoffset = offset;
            }
            
            // Show/hide button
            if (scrollTop > 500) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.pointerEvents = 'auto';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.pointerEvents = 'none';
            }
        });
    }
    
    // Scroll down button functionality
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Hide scroll button when user scrolls down
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 200) {
                scrollDownBtn.style.opacity = '0';
                scrollDownBtn.style.pointerEvents = 'none';
            } else {
                scrollDownBtn.style.opacity = '1';
                scrollDownBtn.style.pointerEvents = 'auto';
            }
        });
    }
    
    // Add scroll effect to navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Check if light mode is active
        const isLightMode = document.documentElement.classList.contains('light-mode');
        
        // Add shadow and background on scroll
        if (currentScroll > 100) {
            if (isLightMode) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(13, 19, 35, 0.95)';
                navbar.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.7)';
            }
        } else {
            if (isLightMode) {
                navbar.style.background = 'rgba(255, 255, 255, 0.8)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(13, 19, 35, 0.7)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            }
        }
        
        // Highlight active section in navbar
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-link');
            }
        });
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ----------------------------------------------------
    // 3. 3D TILT EFFECT ON HERO IMAGE
    // ----------------------------------------------------
    const tiltWrapper = document.querySelector('.tilt-wrapper');
    const tiltElement = document.querySelector('.tilt-element');

    if (tiltWrapper && tiltElement) {
        tiltWrapper.addEventListener('mousemove', (e) => {
            const rect = tiltWrapper.getBoundingClientRect();
            
            // Calculate mouse position relative to the center of the element
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate percentage of mouse position (-1 to 1)
            const percentX = (x - centerX) / centerX;
            const percentY = -((y - centerY) / centerY); // Invert Y for natural tilt
            
            // Apply transform (max 15 degrees tilt for a professional look)
            const tiltX = percentY * 15;
            const tiltY = percentX * 15;
            
            tiltElement.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });

        // Reset tilt when mouse leaves smoothly
        tiltWrapper.addEventListener('mouseleave', () => {
            tiltElement.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }

    // ----------------------------------------------------
    // 4. TYPEWRITER EFFECT
    // ----------------------------------------------------
    const roles = [
        'Full Stack Developer', 
        'Python Enthusiast',
        'Problem Solver',
        'Web Developer', 
        'Open Source Contributor'
    ];
    
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeTextEl = document.getElementById('typewriter-text');
    
    if (typeTextEl) {
        function type() {
            const currentWord = roles[roleIdx];
            
            if (!isDeleting) {
                typeTextEl.textContent = currentWord.slice(0, charIdx++);
                if (charIdx > currentWord.length) {
                    isDeleting = true;
                    setTimeout(type, 2000); // Pause at end of word
                    return;
                }
            } else {
                typeTextEl.textContent = currentWord.slice(0, charIdx--);
                if (charIdx === 0) {
                    isDeleting = false;
                    roleIdx = (roleIdx + 1) % roles.length;
                    setTimeout(type, 500); // Pause before next word
                    return;
                }
            }
            setTimeout(type, isDeleting ? 30 : 80);
        }
        
        // Start typing after initial intro animations
        setTimeout(type, 1500); 
    }

    // Enable scrolling after intro animations finish (prevents jank)
    setTimeout(() => {
        document.body.style.overflowX = 'hidden';
        document.body.style.overflowY = 'auto';
    }, 1500);

    // ----------------------------------------------------
    // 5. SCROLL REVEAL ANIMATIONS
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom of the screen
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // When element comes into view, remove the translation and opacity classes
                entry.target.classList.remove('translate-y-6', 'opacity-0');
                // Stop observing once it has been revealed so it stays visible
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // ----------------------------------------------------
    // 6. FORMSPREE AJAX SUBMISSION WITH ANIMATIONS
    // ----------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');
    const btnLoading = document.getElementById('btn-loading');
    const successOverlay = document.getElementById('success-overlay');
    const closeSuccessBtn = document.getElementById('close-success');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop the default page redirect
            
            // 1. Change UI to loading state
            btnText.innerText = 'Sending...';
            btnIcon.classList.add('hidden');
            btnLoading.classList.remove('hidden');
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-70');

            try {
                // 2. Send the data silently
                const response = await fetch('https://formspree.io/f/mrejgnvp', {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // 3. Success - Show animated overlay
                    successOverlay.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
                    successOverlay.classList.add('opacity-100', 'scale-100');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after a delay
                    setTimeout(() => {
                        btnText.innerText = 'Send Message';
                        btnIcon.classList.remove('hidden');
                        btnLoading.classList.add('hidden');
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('opacity-70');
                    }, 1000);
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                // 4. Error UI
                btnText.innerText = 'Failed to Send';
                btnIcon.classList.remove('hidden');
                btnLoading.classList.add('hidden');
                
                setTimeout(() => {
                    btnText.innerText = 'Send Message';
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-70');
                }, 3000);
            }
        });
        
        // Close success overlay
        if (closeSuccessBtn) {
            closeSuccessBtn.addEventListener('click', () => {
                successOverlay.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
                successOverlay.classList.remove('opacity-100', 'scale-100');
            });
        }
    }
});
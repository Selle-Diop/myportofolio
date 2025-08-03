// Enhanced Portfolio JavaScript
// Selle Diop - Fullstack Developer Portfolio

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initSkillBars();
    initProjectFiltering();
    initProjectModal();
    initContactAnimations();
    initPerformanceOptimizations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Navbar background on scroll
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Hero section animations
function initHeroAnimations() {
    const profileImage = document.querySelector('.profile-image');
    const techIcons = document.querySelectorAll('.tech-icon');
    const codeSnippets = document.querySelectorAll('.code-snippet');

    // Profile image click effect
    if (profileImage) {
        profileImage.addEventListener('click', () => {
            profileImage.style.animation = 'none';
            profileImage.offsetHeight; // Trigger reflow
            profileImage.style.animation = 'profilePulse 0.6s ease, profileFloat 4s ease-in-out infinite';
            
            // Speed up tech icons temporarily
            techIcons.forEach((icon, index) => {
                icon.style.animationDuration = '3s';
                setTimeout(() => {
                    icon.style.animationDuration = '20s';
                }, 3000);
            });
        });
    }

    // Tech icons hover effects
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.4)';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
            icon.style.boxShadow = '';
        });

        // Click effect with tooltip
        icon.addEventListener('click', () => {
            const tooltip = icon.querySelector('.tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    tooltip.style.transform = 'translateY(0)';
                }, 2000);
            }
        });
    });

    // Parallax effect for code snippets
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        codeSnippets.forEach((snippet, index) => {
            const rate = scrolled * -0.5 * (index + 1);
            snippet.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Add scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollIndicator.style.width = scrolled + '%';
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const percentage = skillBar.getAttribute('data-percentage') || '90';
                setTimeout(() => {
                    skillBar.style.width = percentage + '%';
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
        // Set data-percentage if not set
        if (!bar.getAttribute('data-percentage')) {
            const skillName = bar.closest('.skill-item').querySelector('.skill-name').textContent;
            const percentages = {
                'JavaScript': '95',
                'React': '90',
                'Node.js': '88',
                'Python': '85',
                'HTML5': '98',
                'CSS3': '95',
                'Git': '90',
                'Docker': '80'
            };
            bar.setAttribute('data-percentage', percentages[skillName] || '85');
        }
    });
}

// Project filtering
function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Project modal functionality
function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTechStack = document.getElementById('modalTechStack');
    const modalLiveLink = document.getElementById('modalLiveLink');
    const modalGithubLink = document.getElementById('modalGithubLink');
    const mainImage = document.getElementById('mainImage');
    const currentImageSpan = document.getElementById('currentImage');
    const totalImagesSpan = document.getElementById('totalImages');
    const galleryThumbnails = document.querySelector('.gallery-thumbnails');
    const prevImageBtn = document.getElementById('prevImage');
    const nextImageBtn = document.getElementById('nextImage');
    const modalClose = document.querySelector('.modal-close');

    let currentImageIndex = 0;
    let currentProject = null;

    // Sample project data
    const projectsData = {
        'refonte': {
            title: 'Projet de refonte de la plateforme ETPE du Trésor Public du Sénégal',
            description: 'Plateforme de gestion des paiements des agents de l\'État sénégalais en poste à l\'étranger. Modernisation du système pour améliorer la traçabilité, la sécurité et l\'efficacité des transactions financières internationales',
            techStack: ['Angular', 'Java', 'MySql',],
            liveUrl: 'sim',
            githubUrl: 'https://github.com/dashboard',
            images: [
                './images/login.png',
                './images/dashbord.png',
                './images/detail-recette.png',
                './images/creneau.png',
                './images/tableau.png'
            ]
        },
        'livelearn-web': {
            title: 'Application Web-Gestion de Cours Livelearn',
            description: 'Tableau de bord interactif pour l\'analyse de données en temps réel avec graphiques dynamiques, métriques personnalisables et rapports automatisés. Interface intuitive pour la visualisation de données complexes.',
            techStack: ['Angular', 'Laravel', 'WordPress', 'Mysql'],
            liveUrl: 'https://www.livelearn.nl/home',
          githubUrl: 'https://github.com/dashboard',
            images: [
            './images/login-web.png',
                './images/livelearnhomepage.png'
            ]
        },
        'mobile-livelearn': {
            title: 'Application Mobile-Gestion de Cours Livelearn',
            description: 'Application mobile cross-platform  dédiée à la gestion interactive de cours en ligne,pour les entreprises et particuliers avec des podcats,video, notifications push. Elle est disponible sur iOS et Android.',
            techStack: ['Flutter', 'Firebase', 'WordPress','Laravel', 'Mysql'],
            liveUrl: 'https://apps.apple.com/nl/app/livelearn/id1666976386',
            githubUrl: 'https://github.com/dashboard',
            images: [
                './images/login-mobile.jpeg',
                './images/home-mobile.jpeg',
              
            ]
        },
         'task-simplon': {
            title: 'Plateforme web Simplon Projet',
            description: 'La Simplon Projet est une plateforme de Simplon Africa qui a été créé dans le but de permettre à toutes les Fabriques propres de Simplon Africa de centralisé leur données et de gérer les projet de manière plus efficace et adapté à leurs activités de formation.**Solution interne** déployée à l\'échelle du réseau,Adaptée aux spécificités des centres de formation Simplon,Interface intuitive pour une prise en main rapide',
            techStack: ['Angular', 'Laravel','MySql'],
            liveUrl: 'https://example.com',
            githubUrl:'https://github.com/dashboard',
            images: [
               './images/simplon1.jpeg',
                './images/simplon2.jpeg',
                './images/simplon3.jpeg',
                './images/simplon4.jpeg',
                  './images/simplon5.jpeg',   
                  './images/simplon6.jpeg',
            ]
        },
        'duaneko': {
            title: 'Social Network',
            description: 'Réseau social moderne avec système de posts, messagerie en temps réel, profils utilisateurs, système d\'amis et notifications. Architecture scalable et sécurisée pour gérer de nombreux utilisateurs.',
            techStack: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis'],
            liveUrl: 'https://example.com',
            githubUrl: 'https://github.com/example',
            images: [
                'https://via.placeholder.com/800x600/fbbf24/1f2937?text=News+Feed',
                'https://via.placeholder.com/800x600/f59e0b/1f2937?text=User+Profile',
                'https://via.placeholder.com/800x600/64748b/ffffff?text=Messaging',
                'https://via.placeholder.com/800x600/475569/ffffff?text=Friends+Network'
            ]
        }
    };

    // Open modal
    function openModal(projectId) {
        currentProject = projectsData[projectId];
        if (!currentProject) return;

        currentImageIndex = 0;
        
        // Populate modal content
        modalTitle.textContent = currentProject.title;
        modalDescription.textContent = currentProject.description;
        modalLiveLink.href = currentProject.liveUrl;
        modalGithubLink.href = currentProject.githubUrl;

        // Tech stack
        modalTechStack.innerHTML = '';
        currentProject.techStack.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            span.textContent = tech;
            modalTechStack.appendChild(span);
        });

        // Images
        updateModalImage();
        createThumbnails();

        // Show modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Update main image
    function updateModalImage() {
        if (!currentProject) return;
        
        mainImage.src = currentProject.images[currentImageIndex];
        currentImageSpan.textContent = currentImageIndex + 1;
        totalImagesSpan.textContent = currentProject.images.length;

        // Update thumbnail active state
        const thumbnails = galleryThumbnails.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex);
        });
    }

    // Create thumbnails
    function createThumbnails() {
        if (!currentProject) return;
        
        galleryThumbnails.innerHTML = '';
        currentProject.images.forEach((image, index) => {
            const thumb = document.createElement('img');
            thumb.src = image;
            thumb.className = 'thumbnail';
            thumb.addEventListener('click', () => {
                currentImageIndex = index;
                updateModalImage();
            });
            galleryThumbnails.appendChild(thumb);
        });
    }

    // Navigation
    function nextImage() {
        if (!currentProject) return;
        currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
        updateModalImage();
    }

    function prevImage() {
        if (!currentProject) return;
        currentImageIndex = currentImageIndex === 0 ? currentProject.images.length - 1 : currentImageIndex - 1;
        updateModalImage();
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        currentProject = null;
    }

    // Event listeners
    // Open modal when clicking on external link
    document.querySelectorAll('.external-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectCard = e.target.closest('.project-card');
            const projectId = projectCard.getAttribute('data-project') || 'refonte';
            openModal(projectId);
        });
    });

    // Open modal when clicking anywhere on the project card
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open modal if clicking on a link
            if (e.target.closest('a')) return;
            
            e.preventDefault();
            const projectId = card.getAttribute('data-project') || 'refonte';
            openModal(projectId);
        });
        
        // Add cursor pointer to indicate clickability
        card.style.cursor = 'pointer';
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (nextImageBtn) nextImageBtn.addEventListener('click', nextImage);
    if (prevImageBtn) prevImageBtn.addEventListener('click', prevImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('show')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });

    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Contact animations
function initContactAnimations() {
    const contactItems = document.querySelectorAll('.contact-item');
    const socialLinks = document.querySelectorAll('.social-link');

    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.02)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) scale(1.1) rotate(10deg)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.classList.add('loading');
        imageObserver.observe(img);
    });

    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-smooth', 'none');
        document.documentElement.style.setProperty('--transition-bounce', 'none');
    }

    // Debounced scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            // Scroll-dependent animations here
        });
    });
}

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Console signature
console.log(`
%c🚀 Portfolio de Selle Diop - Développeur Fullstack
%cSite web développé avec passion ❤️
%cTechnologies: HTML5, CSS3, JavaScript ES6+
`, 
'color: #6366f1; font-size: 16px; font-weight: bold;',
'color: #8b5cf6; font-size: 14px;',
'color: #06b6d4; font-size: 12px;'
);

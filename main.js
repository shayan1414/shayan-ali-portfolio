// Portfolio Projects Data
const portfolioProjects = [
    {
        title: "Age Calculator",
        description: "A sleek web app for calculating age with precision",
        link: "https://shayan1414.github.io/Age_Calculator/",
        github: "https://github.com/shayan1414/Age_Calculator"
    },
    {
        title: "Word Counter",
        description: "Advanced word and character counting tool",
        link: "https://shayan1414.github.io/word_counter/",
        github: "https://github.com/shayan1414/word_counter"
    },
    {
        title: "Password Generator",
        description: "Secure password generation tool with customization",
        link: "https://shayan1414.github.io/password_generator/",
        github: "https://github.com/shayan1414/password_generator"
    }
];

// Skills Data
const skills = [
    { name: "HTML5", icon: "fab fa-html5" },
    { name: "CSS3", icon: "fab fa-css3-alt" },
    { name: "JavaScript", icon: "fab fa-js" },
    { name: "React", icon: "fab fa-react" }
];

// Initialize the portfolio section
function initPortfolio() {
    const portfolioGrid = document.querySelector('.projects-grid');
    if (!portfolioGrid) return;
    
    // Clear existing content first
    portfolioGrid.innerHTML = '';
    
    portfolioProjects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-card glass-effect';
        projectElement.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            <div class="project-links">
                <a href="${project.link}" class="demo-link" target="_blank">Live Demo</a>
                <a href="${project.github}" class="github-link" target="_blank">GitHub</a>
            </div>
        `;
        portfolioGrid.appendChild(projectElement);
    });
}

// Initialize the skills section
function initSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;
    
    // Clear existing content first
    skillsGrid.innerHTML = '';
    
    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item';
        skillElement.innerHTML = `
            <i class="${skill.icon}"></i>
            <span>${skill.name}</span>
        `;
        skillsGrid.appendChild(skillElement);
    });
}

// Mobile menu handling
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
const navLinks = document.querySelectorAll('.nav-link');

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navbarCollapse.classList.contains('show') &&
        !navbarToggler.contains(e.target) &&
        !navbarCollapse.contains(e.target)) {
        navbarCollapse.classList.remove('show');
        navbarToggler.setAttribute('aria-expanded', 'false');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form validation and submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        let isValid = true;
        const inputs = this.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
                showNotification('Please fill in all fields', 'error');
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        if (isValid) {
            // Show success message
            showNotification('Message sent successfully!', 'success');
            this.reset();
        }
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification.success {
        background: var(--gradient-success);
        box-shadow: 0 4px 15px rgba(46, 204, 113, 0.2);
    }
    
    .notification.error {
        background: var(--accent-color);
        box-shadow: 0 4px 15px rgba(231, 76, 60, 0.2);
    }
`;
document.head.appendChild(style);

// Skill progress animation
const skillItems = document.querySelectorAll('.skill-item');
const animateSkills = () => {
    skillItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const itemBottom = item.getBoundingClientRect().bottom;
        
        if (itemTop < window.innerHeight && itemBottom > 0) {
            item.classList.add('animate-fade-in');
        }
    });
};

window.addEventListener('scroll', animateSkills);
animateSkills(); // Initial check

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'var(--box-shadow)';
            });
        });

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-title, .card, .skill-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate-fade-in');
        }
    });
};

// Initial check for elements in view
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Check for elements in view on scroll
window.addEventListener('scroll', animateOnScroll);

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
    initSkills();
});

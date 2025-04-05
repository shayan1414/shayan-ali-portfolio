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
    { name: "React", icon: "fab fa-react" },
    { name: "Node.js", icon: "fab fa-node-js" },
    { name: "Git", icon: "fab fa-git-alt" }
];

// Initialize the portfolio section
function initPortfolio() {
    const portfolioGrid = document.querySelector('.projects-grid');
    if (!portfolioGrid) return;
    
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
    
    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item';
        skillElement.innerHTML = `
            <i class="${skill.icon}"></i>
            <h3>${skill.name}</h3>
        `;
        skillsGrid.appendChild(skillElement);
    });
}

// Theme toggler
function initThemeToggle() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme based on user's system preference
    if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
    }
    
    // Add theme toggle button if needed
    const navbar = document.querySelector('.navbar-nav');
    if (navbar) {
        const themeToggle = document.createElement('li');
        themeToggle.className = 'nav-item ms-lg-3';
        themeToggle.innerHTML = `
            <button class="nav-link theme-toggle border-0 bg-transparent">
                <i class="fas ${prefersDarkScheme.matches ? 'fa-sun' : 'fa-moon'}"></i>
            </button>
        `;
        navbar.appendChild(themeToggle);
        
        themeToggle.querySelector('.theme-toggle').addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.body.removeAttribute('data-theme');
                themeToggle.querySelector('i').className = 'fas fa-moon';
            } else {
                document.body.setAttribute('data-theme', 'dark');
                themeToggle.querySelector('i').className = 'fas fa-sun';
            }
        });
    }
}

// Form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        console.log('Form submitted:', data);
        contactForm.reset();
        alert('Thank you for your message! I will get back to you soon.');
    });
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu after clicking
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarToggler && !navbarToggler.classList.contains('collapsed')) {
                    navbarToggler.click();
                }
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm', 'bg-light');
            if (document.body.getAttribute('data-theme') === 'dark') {
                navbar.classList.remove('bg-light');
                navbar.classList.add('bg-dark');
            }
        } else {
            navbar.classList.remove('shadow-sm', 'bg-light', 'bg-dark');
        }
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
    initSkills();
    initThemeToggle();
    initContactForm();
    initSmoothScroll();
    initNavbarScroll();
});

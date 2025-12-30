document.addEventListener('DOMContentLoaded', function() {
    initPortfolio();
    initCursor();
    initParticles();
    initFloatingWords();
    initTypingAnimation();
    initNavigation();
    initSkillsFilter();
    initIntersectionObserver();
    initBackToTop();
    initContactLinks();
    initCurrentYear();
});

function initPortfolio() {
    document.title = `${config.name} - Cybersecurity Portfolio`;
    document.querySelector('.logo').textContent = config.name;
    document.querySelector('.hero h1').textContent = config.name;
    
    const aboutText = document.querySelector('.about-text h3');
    aboutText.textContent = `Hello! I'm ${config.name}`;
    
    const aboutParagraphs = document.querySelector('.about-text p');
    aboutParagraphs.innerHTML = config.about.paragraphs.map(p => `<p>${p}</p>`).join('');
    
    const stats = document.querySelectorAll('.stat-number');
    config.about.stats.forEach((stat, index) => {
        if (stats[index]) {
            stats[index].setAttribute('data-target', stat.number);
            stats[index].nextElementSibling.textContent = stat.label;
        }
    });
    
    const skillsGrid = document.getElementById('skillsGrid');
    skillsGrid.innerHTML = config.skills.map(skill => `
        <div class="skill-card" data-category="${skill.category}">
            <div class="skill-icon">${skill.icon}</div>
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>
            <div class="skill-level">
                <div class="skill-level-fill" data-level="${skill.level}"></div>
            </div>
        </div>
    `).join('');
    
    const certsGrid = document.getElementById('certificationsGrid');
    certsGrid.innerHTML = config.certifications.map(cert => `
        <div class="cert-card">
            <div class="cert-icon">${cert.icon}</div>
            <h3>${cert.name}</h3>
            <p style="color: var(--text-gray); margin: 1rem 0;">${cert.description}</p>
            <p style="color: var(--primary-color); font-weight: bold;">Issued: ${cert.year}</p>
        </div>
    `).join('');
    
    // Populate projects with PDF download support
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = config.projects.map((project, index) => `
        <div class="project-card" data-project-index="${index}">
            <div class="project-image">${project.icon}</div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                </div>
                ${project.isPDF ? '<div class="download-badge">📄 Download PDF</div>' : ''}
            </div>
        </div>
    `).join('');
    
    // Add click handlers for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const index = this.getAttribute('data-project-index');
            const project = config.projects[index];
            if (project.isPDF) {
                // Download PDF
                const link = document.createElement('a');
                link.href = project.link;
                link.download = project.link.split('/').pop();
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                // Open link in new tab
                window.open(project.link, '_blank');
            }
        });
    });
    
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = config.experience.map(exp => `
        <div class="timeline-item">
            <div class="timeline-content">
                <div class="timeline-date">${exp.date}</div>
                <h3>${exp.title}</h3>
                <p>${exp.description}</p>
            </div>
        </div>
    `).join('');
}

function initContactLinks() {
    document.getElementById('emailContact').addEventListener('click', () => {
        window.location.href = `mailto:${config.email}`;
    });
    
    document.getElementById('linkedinContact').addEventListener('click', () => {
        window.open(config.social.linkedin, '_blank');
    });
    
    document.getElementById('githubContact').addEventListener('click', () => {
        window.open(config.social.github, '_blank');
    });
    
    document.getElementById('tryhackmeContact').addEventListener('click', () => {
        if (config.social.tryhackme) {
            window.open(config.social.tryhackme, '_blank');
        }
    });
    
    document.querySelector('#emailContact span:nth-child(2)').textContent = config.email;
    document.querySelector('#linkedinContact span:nth-child(2)').textContent = 'LinkedIn Profile';
    document.querySelector('#githubContact span:nth-child(2)').textContent = 'GitHub Profile';
}

function initCurrentYear() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
}

function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(16, 185, 129, 0.5)';
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function initFloatingWords() {
    const container = document.getElementById('floatingWords');
    config.floatingWords.forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'floating-word';
        span.textContent = word;
        span.style.left = Math.random() * 100 + '%';
        span.style.top = Math.random() * 100 + '%';
        span.style.animationDelay = (index * 0.5) + 's';
        container.appendChild(span);
    });
}

function initTypingAnimation() {
    const element = document.getElementById('typingText');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = config.typingTexts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        element.innerHTML = element.textContent + '<span class="cursor-blink"></span>';

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % config.typingTexts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();
}

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        lastScroll = currentScroll;

        const scrollProgress = document.querySelector('.scroll-progress');
        const scrollPercentage = (currentScroll / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrollPercentage + '%';

        document.querySelectorAll('.nav-link').forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

function initSkillsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            skillCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        const level = card.querySelector('.skill-level-fill').getAttribute('data-level');
                        card.querySelector('.skill-level-fill').style.width = level + '%';
                    }, 100);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    setTimeout(() => {
        skillCards.forEach(card => {
            const level = card.querySelector('.skill-level-fill').getAttribute('data-level');
            card.querySelector('.skill-level-fill').style.width = level + '%';
        });
    }, 500);
}

function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .skill-card, .project-card, .cert-card, .stat-number').forEach(el => {
        observer.observe(el);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

function initBackToTop() {
    const button = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Helper function to extract file extension
function getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
}

// Helper function to get file type label
function getFileTypeLabel(filename) {
    const ext = getFileExtension(filename);
    const fileTypes = {
        'pdf': 'PDF Document',
        'zip': 'ZIP Archive',
        'zip.001': 'Split ZIP Part 1',
        'zip.002': 'Split ZIP Part 2',
        'doc': 'Word Document',
        'docx': 'Word Document',
        'txt': 'Text File'
    };
    return fileTypes[ext] || ext.toUpperCase() + ' File';
}

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
    checkPDFFiles(); // Debug function to check file availability
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
    
    // Populate projects with correct download support
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
                <div class="download-section">
                    <div class="download-badge">
                        ${project.isPDF ? '📄 PDF' : '📦 Download'} 
                        <small style="font-size: 0.8em; margin-left: 5px;">
                            ${getFileTypeLabel(project.link)}
                        </small>
                    </div>
                    ${project.note ? `<small style="display: block; margin-top: 5px; color: #ff6b6b; font-size: 0.8em;">${project.note}</small>` : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers for project cards with improved download
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const index = this.getAttribute('data-project-index');
            const project = config.projects[index];
            
            console.log('Download clicked:', {
                title: project.title,
                link: project.link,
                isPDF: project.isPDF,
                fileType: getFileTypeLabel(project.link)
            });
            
            // Check if file exists before attempting download
            fetch(project.link, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        // File exists - proceed with download
                        const link = document.createElement('a');
                        link.href = project.link;
                        
                        // Set appropriate download filename
                        if (project.isPDF) {
                            link.download = project.title.replace(/\s+/g, '_') + '.pdf';
                        } else {
                            link.download = project.link.split('/').pop();
                        }
                        
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        
                        // Show download confirmation
                        showDownloadNotification(project.title, getFileTypeLabel(project.link));
                    } else {
                        // File not found
                        console.error('File not found:', project.link);
                        showErrorNotification(`File not found: ${project.link.split('/').pop()}`);
                    }
                })
                .catch(error => {
                    console.error('Error accessing file:', error);
                    showErrorNotification('Error accessing file. Please try again.');
                });
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

function showDownloadNotification(title, fileType) {
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center;">
            <span style="margin-right: 10px;">✅</span>
            <div>
                <strong>Download started</strong>
                <div style="font-size: 0.9em;">${title} (${fileType})</div>
            </div>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(16, 185, 129, 0.95);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 9999;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center;">
            <span style="margin-right: 10px;">⚠️</span>
            <div>
                <strong>Download Error</strong>
                <div style="font-size: 0.9em;">${message}</div>
            </div>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(239, 68, 68, 0.95);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 9999;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Debug function to check file availability
function checkPDFFiles() {
    console.log('Checking file availability:');
    config.projects.forEach((project, index) => {
        fetch(project.link, { method: 'HEAD' })
            .then(response => {
                console.log(`File ${index + 1}: ${project.title}`);
                console.log(`  Path: ${project.link}`);
                console.log(`  Status: ${response.ok ? '✅ Found' : '❌ Not Found'}`);
                console.log(`  Status Code: ${response.status}`);
                console.log(`  Type: ${getFileTypeLabel(project.link)}`);
            })
            .catch(error => {
                console.log(`File ${index + 1}: ${project.title}`);
                console.log(`  Path: ${project.link}`);
                console.log(`  Error: ❌ ${error.message}`);
            });
    });
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

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Helper function to extract file extension
function getFileExtension(filename) {
    if (!filename) return '';
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop().toLowerCase() : '';
}

// Helper function to get file type label
function getFileTypeLabel(filename) {
    const ext = getFileExtension(filename);
    const fileTypes = {
        'pdf': 'PDF Document',
        'zip': 'ZIP Archive',
        '001': 'ZIP Part 1',
        '002': 'ZIP Part 2',
        'doc': 'Word Document',
        'docx': 'Word Document',
        'txt': 'Text File'
    };
    return fileTypes[ext] || (ext ? ext.toUpperCase() + ' File' : 'File');
}

// Check if link is external
function isExternalLink(url) {
    return url.startsWith('http://') || 
           url.startsWith('https://') || 
           url.includes('google.com') || 
           url.includes('drive.google.com');
}

// Show download notification
function showDownloadNotification(title, fileType, isExternal = false) {
    const notification = document.createElement('div');
    const icon = isExternal ? '🔗' : '✅';
    const bgColor = isExternal ? 'rgba(59, 130, 246, 0.95)' : 'rgba(16, 185, 129, 0.95)';
    
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center;">
            <span style="margin-right: 10px; font-size: 1.2em;">${icon}</span>
            <div>
                <strong>${isExternal ? 'Opening external link' : 'Download started'}</strong>
                <div style="font-size: 0.9em;">${title} (${fileType})</div>
                ${isExternal ? '<div style="font-size: 0.8em; margin-top: 3px; opacity: 0.9;">Will open in new tab</div>' : ''}
            </div>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
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
    }, isExternal ? 4000 : 3000);
}

// Show error notification
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

// Download file function (handles both local and external)
function downloadFile(filePath, fileName, fileType, isExternal = false) {
    console.log('Download initiated:', { filePath, fileName, fileType, isExternal });
    
    if (isExternal) {
        // For external links, open in new tab
        window.open(filePath, '_blank', 'noopener,noreferrer');
        showDownloadNotification(fileName, getFileTypeLabel(filePath), true);
        return;
    }
    
    // Local file handling
    fetch(filePath, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                const link = document.createElement('a');
                link.href = filePath;
                link.download = fileName || filePath.split('/').pop();
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showDownloadNotification(fileName || 'File', getFileTypeLabel(filePath), false);
            } else {
                console.error('File not found:', filePath);
                showErrorNotification(`File not found: ${filePath.split('/').pop()}`);
            }
        })
        .catch(error => {
            console.error('Error accessing file:', error);
            showErrorNotification('Error accessing file. Please try again.');
        });
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
    
    // Populate projects with proper external/internal indicators
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
                
                <!-- Main Download Button -->
                <div class="download-section">
                    <button class="download-btn main-download ${project.isExternal ? 'external-link' : ''}" 
                            data-project-index="${index}" 
                            data-file-type="main"
                            data-is-external="${project.isExternal || false}">
                        ${project.isPDF ? '📄 ' : '📦 '}
                        ${project.isExternal ? 'Open PDF (Google Drive)' : 'Download PDF'}
                        <small>${getFileTypeLabel(project.link)} ${project.isExternal ? '↗' : ''}</small>
                    </button>
                    
                    ${project.isExternal ? 
                        `<div class="google-drive-note">
                            <small>📢 Large file hosted on Google Drive</small>
                        </div>` 
                        : ''
                    }
                    
                    <!-- Additional Download Buttons -->
                    ${project.additionalDownloads && project.additionalDownloads.length > 0 ? `
                        <div class="additional-downloads">
                            <h4 style="margin: 15px 0 10px 0; font-size: 0.9em; color: var(--text-gray);">
                                Additional Files:
                            </h4>
                            ${project.additionalDownloads.map((download, dIndex) => `
                                <button class="download-btn secondary-download ${isExternalLink(download.link) ? 'external-link' : ''}" 
                                        data-project-index="${index}" 
                                        data-download-index="${dIndex}"
                                        data-is-external="${isExternalLink(download.link)}">
                                    ${download.icon} ${download.name}
                                    <small>${download.description || getFileTypeLabel(download.link)} 
                                    ${isExternalLink(download.link) ? '↗' : ''}</small>
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
    
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
    
    // Initialize download button handlers
    initDownloadButtons();
}

// Initialize download button handlers
function initDownloadButtons() {
    // Main download buttons
    document.querySelectorAll('.main-download').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const index = this.getAttribute('data-project-index');
            const isExternal = this.getAttribute('data-is-external') === 'true';
            const project = config.projects[index];
            
            // Visual feedback for external links
            if (isExternal) {
                this.classList.add('loading');
                this.innerHTML = '⏳ Opening Google Drive...';
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = `
                        ${project.isPDF ? '📄 ' : '📦 '}
                        ${project.isExternal ? 'Open PDF (Google Drive)' : 'Download PDF'}
                        <small>${getFileTypeLabel(project.link)} ↗</small>
                    `;
                }, 1500);
            }
            
            downloadFile(project.link, project.title, 'main', isExternal);
        });
    });
    
    // Secondary download buttons
    document.querySelectorAll('.secondary-download').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectIndex = this.getAttribute('data-project-index');
            const downloadIndex = this.getAttribute('data-download-index');
            const isExternal = this.getAttribute('data-is-external') === 'true';
            const project = config.projects[projectIndex];
            const download = project.additionalDownloads[downloadIndex];
            
            downloadFile(download.link, download.name, 'additional', isExternal);
        });
    });
    
    // Project card click (for main download only)
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Only trigger if not clicking a download button
            if (!e.target.closest('.download-btn')) {
                const index = this.getAttribute('data-project-index');
                const project = config.projects[index];
                const isExternal = project.isExternal || isExternalLink(project.link);
                downloadFile(project.link, project.title, 'main', isExternal);
            }
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

// Add CSS styles for notifications and buttons
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
    
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.7; }
        100% { opacity: 1; }
    }
    
    .download-section {
        margin-top: 15px;
        width: 100%;
    }
    
    .download-btn {
        width: 100%;
        border: none;
        padding: 12px 15px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        text-align: center;
        position: relative;
    }
    
    .download-btn.loading {
        animation: pulse 1s infinite;
        cursor: wait;
    }
    
    .main-download {
        background: linear-gradient(135deg, var(--primary-color), #10b981);
        color: white;
    }
    
    .main-download.external-link {
        background: linear-gradient(135deg, #4285f4, #34a853);
    }
    
    .secondary-download {
        background: linear-gradient(135deg, #6b7280, #4b5563);
        color: white;
        font-size: 0.9em;
        padding: 10px 12px;
    }
    
    .secondary-download.external-link {
        background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    }
    
    .download-btn:hover:not(.loading) {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
    
    .main-download:hover:not(.loading) {
        box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
    }
    
    .main-download.external-link:hover:not(.loading) {
        box-shadow: 0 8px 20px rgba(66, 133, 244, 0.3);
    }
    
    .secondary-download:hover:not(.loading) {
        box-shadow: 0 8px 20px rgba(107, 114, 128, 0.3);
    }
    
    .secondary-download.external-link:hover:not(.loading) {
        box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
    }
    
    .download-btn small {
        font-size: 0.8em;
        opacity: 0.9;
        margin-top: 3px;
        font-weight: normal;
    }
    
    .additional-downloads {
        margin-top: 15px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 15px;
    }
    
    .google-drive-note {
        font-size: 0.85em;
        color: #4285f4;
        margin-top: 8px;
        padding: 6px 10px;
        background: rgba(66, 133, 244, 0.1);
        border-radius: 6px;
        border-left: 3px solid #4285f4;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .google-drive-note small {
        font-size: 0.9em;
    }
    
    /* External link indicator */
    .external-link::after {
        content: " ↗";
        font-size: 0.9em;
        position: absolute;
        right: 15px;
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

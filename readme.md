// ========== MAIN SCRIPT ==========
// Dynamically loads content from config.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize with config data
    initPortfolio();
    
    // Initialize all interactive features
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
    // Update page title and name
    document.title = `${config.name} - Cybersecurity Portfolio`;
    document.querySelector('.logo').textContent = config.name;
    document.querySelector('.hero h1').textContent = config.name;
    
    // Update about section
    const aboutText = document.querySelector('.about-text h3');
    aboutText.textContent = `Hello! I'm ${config.name}`;
    
    const aboutParagraphs = document.querySelector('.about-text p');
    aboutParagraphs.innerHTML = config.about.paragraphs.map(p => `<p>${p}</p>`).join('');
    
    // Update stats
    const stats = document.querySelectorAll('.stat-number');
    config.about.stats.forEach((stat, index) => {
        if (stats[index]) {
            stats[index].setAttribute('data-target', stat.number);
            stats[index].nextElementSibling.textContent = stat.label;
        }
    });
    
    // Populate skills
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
    
    // Populate certifications
    const certsGrid = document.getElementById('certificationsGrid');
    certsGrid.innerHTML = config.certifications.map(cert => `
        <div class="cert-card">
            <div class="cert-icon">${cert.icon}</div>
            <h3>${cert.name}</h3>
            <p style="color: var(--text-gray); margin: 1rem 0;">${cert.description}</p>
            <p style="color: var(--primary-color); font-weight: bold;">Issued: ${cert.year}</p>
        </div>
    `).join('');
    
    // Populate projects
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = config.projects.map(project => `
        <div class="project-card" onclick="window.open('${project.link}', '_blank')">
            <div class="project-image">${project.icon}</div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    // Populate timeline
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
    // Email contact
    document.getElementById('emailContact').addEventListener('click', () => {
        window.location.href = `mailto:${config.email}`;
    });
    
    // LinkedIn contact
    document.getElementById('linkedinContact').addEventListener('click', () => {
        window.open(config.social.linkedin, '_blank');
    });
    
    // GitHub contact
    document.getElementById('githubContact').addEventListener('click', () => {
        window.open(config.social.github, '_blank');
    });
    
    // TryHackMe contact
    document.getElementById('tryhackmeContact').addEventListener('click', () => {
        if (config.social.tryhackme) {
            window.open(config.social.tryhackme, '_blank');
        }
    });
    
    // Update contact text
    document.querySelector('#emailContact span:nth-child(2)').textContent = config.email;
    document.querySelector('#linkedinContact span:nth-child(2)').textContent = 'LinkedIn: ' + config.social.linkedin.split('/').pop();
    document.querySelector('#githubContact span:nth-child(2)').textContent = 'GitHub: ' + config.social.github.split('/').pop();
}

function initCurrentYear() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// ========== ALL OTHER FUNCTIONS FROM PREVIOUS CODE ==========
// Copy all the JavaScript functions from the previous response here

// (Cursor, Particles, Navigation, Animations, etc.)
To reconstruct: Download all parts and use 7-Zip to extract.

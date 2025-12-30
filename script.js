// In initPortfolio() function, update the projectsGrid.innerHTML:
projectsGrid.innerHTML = config.projects.map((project, index) => `
    <div class="project-card" data-project-index="${index}">
        <div class="project-image">${project.icon}</div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-stack">
                ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
            </div>
            <div class="download-options">
                ${project.downloads ? project.downloads.map((download, i) => `
                    <button class="download-option-btn" data-project-index="${index}" data-download-index="${i}">
                        ${download.icon} ${download.label}
                        ${download.note ? `<small>${download.note}</small>` : ''}
                    </button>
                `).join('') : `
                    <button class="download-option-btn" data-project-index="${index}">
                        ${project.isPDF ? '📄 Download PDF' : '📦 Download File'}
                    </button>
                `}
            </div>
        </div>
    </div>
`).join('');

// Update the click handler:
document.querySelectorAll('.project-card, .download-option-btn').forEach(element => {
    element.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const projectIndex = this.getAttribute('data-project-index');
        const downloadIndex = this.getAttribute('data-download-index');
        const project = config.projects[projectIndex];
        
        let downloadLink;
        if (downloadIndex !== null && project.downloads) {
            // Multiple download options
            downloadLink = project.downloads[downloadIndex].link;
        } else {
            // Single download option
            downloadLink = project.link;
        }
        
        // Download the file
        const link = document.createElement('a');
        link.href = downloadLink;
        link.download = downloadLink.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showDownloadNotification(project.title, getFileTypeLabel(downloadLink));
    });
});

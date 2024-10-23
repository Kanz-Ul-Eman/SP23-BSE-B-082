async function loadProjects() {
    try {
        const response = await fetch('project-descriptions.json');
        const projects = await response.json();
        
        const projectGrid = document.getElementById('projectGrid');
        
        Object.entries(projects).forEach(([id, project]) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-image"></div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <button class="desc-btn" data-project-id="${id}">Description</button>
                    <div class="project-desc" id="${id}-desc" style="display: none;">
                        Loading description...
                    </div>
                </div>
            `;
            projectGrid.appendChild(projectCard);
        });

        document.querySelectorAll('.desc-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const projectId = button.dataset.projectId;
                const descElement = document.getElementById(`${projectId}-desc`);
                
                if (descElement.style.display === 'none') {
                    descElement.style.display = 'block';
                    if (descElement.textContent === 'Loading description...') {
                        const project = projects[projectId];
                        descElement.textContent = project.description;
                    }
                } else {
                    descElement.style.display = 'none';
                }
            });
        });
    } catch (error) {
        console.error('Error loading project descriptions:', error);
        document.getElementById('projectGrid').innerHTML = '<p>Error loading projects. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadProjects);

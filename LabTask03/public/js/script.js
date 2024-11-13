document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
});

const projects = [
  {
    id: "project1",
    title: "E-commerce Website",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&auto=format",
    summary: "A full-featured e-commerce platform built with React and Node.js",
  },
  {
    id: "project2",
    title: "Task Management App",
    image:
      "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=500&auto=format",
    summary: "A productivity app for managing daily tasks and projects",
  },
  {
    id: "project3",
    title: "Social Media Dashboard",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format",
    summary: "Analytics dashboard for social media management",
  },
];

function loadProjects() {
  const projectGrid = document.getElementById("projectGrid");

  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";

    projectCard.innerHTML = `
            <div class="project-image" 
                 style="background-image: url('${project.image}')"
                 onerror="this.style.backgroundColor='#f0f0f0'">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.summary}</p>
                <button class="desc-btn" data-project-id="${project.id}">Show Description</button>
                <div class="project-desc" id="${project.id}-desc" style="display: none;">
                    Loading description...
                </div>
            </div>
        `;
    projectGrid.appendChild(projectCard);
  });

  document.querySelectorAll(".desc-btn").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const projectId = button.dataset.projectId;
      const descElement = document.getElementById(`${projectId}-desc`);

      if (descElement.style.display === "none") {
        try {
          const response = await fetch(`text/${projectId}.txt`);
          if (!response.ok) {
            throw new Error("Failed to load description");
          }
          const description = await response.text();
          descElement.textContent = description;
          descElement.style.display = "block";
          button.textContent = "Hide Description";
        } catch (error) {
          console.error("Error loading project description:", error);
          descElement.textContent =
            "Error loading description. Please try again later.";
          descElement.style.display = "block";
        }
      } else {
        descElement.style.display = "none";
        button.textContent = "Show Description";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", loadProjects);

document.querySelector(".contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for your message! I will get back to you soon.");
  e.target.reset();
});

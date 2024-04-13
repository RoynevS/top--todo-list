import { projectList } from "./project-list";

function screenController() {
  const projects = projectList()

  const addProjectButton = document.querySelector(".add-project-btn");

  const addProject = () => {
    projects.createNewProject(
      "The Odin Project", 
      "in Progress", 
      {
        projectDescription: "Learn Web Development", 
        projectCategory: "Coding"
      }
    );
    updateNavbar();
  };

  const updateNavbar = () => {
    clearProjectsFromNavbar();
    fillNavbarWithProjects();
  };

  const clearProjectsFromNavbar = () => {
    const projectSectionDOM = document.querySelector(".project-section");
    if (projectSectionDOM.children.length > 0) {
      const child = projectSectionDOM.children[0];
      projectSectionDOM.removeChild(child);
    }
  };

  const fillNavbarWithProjects = () => {
    const projectSectionDOM = document.querySelector(".project-section");

    const projectsListDOM = document.createElement("ul");
    projects.getListOfProjects().forEach(project => {
      const listItem = document.createElement("li");
      listItem.textContent = project.getProjectName();
      projectsListDOM.appendChild(listItem);
    });

    projectSectionDOM.appendChild(projectsListDOM);
  };

  addProjectButton.addEventListener("click", addProject);
}

screenController();
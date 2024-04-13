import { projectList } from "./project-list";
import { dataStorage } from "./data-storage";


function screenController() {
  const projects = projectList()

  const addProjectButton = document.querySelector(".add-project-btn");

  const randomNumber = () => {
    return Math.floor(Math.random() * 20);
  };

  const addProject = () => {
    projects.createNewProject(
      `The Odin Project${randomNumber()}`, 
      "in Progress", 
      {
        projectDescription: "Learn Web Development", 
        projectCategory: "Coding",
      }
    );

    // projects.getListOfProjects().forEach((project, index) => {
    //   dataStorage().postData(project, index);
    // });
    const index = projects.getListOfProjects().length - 1;
    const newestProject = projects.getListOfProjects()[index];
    dataStorage().postData(newestProject, index);

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
    dataStorage().getData().forEach(project => {
        const listItem = document.createElement("li");
        listItem.textContent = project.projectName;
        projectsListDOM.appendChild(listItem);
      });
    projectSectionDOM.appendChild(projectsListDOM);
  };

  const siteLoad = () => {
    if (dataStorage().getDataLength() === 0) return;
    fillNavbarWithProjects();
  };

  siteLoad();

  addProjectButton.addEventListener("click", addProject);
}

screenController();
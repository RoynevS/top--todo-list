import { projectList } from "./project-list";
import { createID } from "./project";
import { dataStorage } from "./data-storage";


function screenController() {
  const projects = projectList()

  const addProjectButton = document.querySelector(".add-project-btn");
  const addTodoButton = document.querySelector(".add-todo-btn");

  const randomNumber = () => {
    return Math.floor(Math.random() * 20);
  };

  const addProject = () => {
    const newProject = {
      projectName: `The Odin Project${randomNumber()}`,
      projectState: "in Progress",
      projectID: createID(),
      projectOptions: {
        projectDescription: "Learn Web Development", 
        projectCategory: "Coding",
      },
    };

    projects.getSavedProjects().push(newProject);

    dataStorage().postData(projects.getSavedProjects());

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

    projects.listOfProjects().forEach(project => {
      const todoBtn = document.createElement("button");
      todoBtn.classList.add("add-todo-btn");
      todoBtn.textContent = "+ Todo";
      todoBtn.dataset.id = project.getProjectID()
      todoBtn.addEventListener("click", event => {
        project.createTodoItem("This is just a tribute", {});
      });
      const listItem = document.createElement("li");
      listItem.textContent = project.getProjectName();
      listItem.appendChild(todoBtn);
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
  // addTodoButton.addEventListener("click", addTodoButton);
}

screenController();
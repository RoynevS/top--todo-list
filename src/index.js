import { projectList } from "./project-list";
import { createID } from "./project";
import { dataStorage } from "./data-storage";


function screenController() {
  const projects = projectList()

  const addProjectButton = document.querySelector(".add-project-btn");
  const projectSectionDOM = document.querySelector(".project-section");


  const randomNumber = () => {
    return Math.floor(Math.random() * 20);
  };

  const addProject = () => {
    const newProject = {
      projectName: `The Odin Project${randomNumber()}`,
      projectState: "in Progress",
      listOfTodos: [],
      projectID: createID(),
      projectOptions: {
        projectDescription: "Learn Web Development", 
        projectCategory: "Coding",
      },
    };

    projects.saveNewProjectData(newProject);

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
    const projectsListDOM = document.createElement("ul");

    const listOfProjects = projects.createListOfProjects();

    listOfProjects.forEach(project => {
      const todoBtn = document.createElement("button");
      todoBtn.classList.add("add-todo-btn");
      todoBtn.textContent = "+ Todo";
      todoBtn.dataset.id = project.getProjectID();
      const listItem = document.createElement("li");
      listItem.textContent = project.getProjectName();
      listItem.appendChild(todoBtn);
      projectsListDOM.appendChild(listItem);
    });
    projectSectionDOM.appendChild(projectsListDOM);
  };

  const addTodoItem = event => {
    if (event.target.classList.contains("add-todo-btn")) {
      const [ selectedProject ] = projects.getSavedProjects()
        .filter(element => element.projectID === event.target.dataset.id);
      console.log(selectedProject);
      selectedProject.listOfTodos.push(
        {
          title: "Learn JavaScript",
          id: selectedProject.projectID + createID(),
          project: selectedProject.projectName,
          options: {
            description: "build javascript projects",
            dueDate: new Date(),
            priority: "high",
          },
        }
      );
      dataStorage().postData(projects.getSavedProjects());
    }
  }

  const siteLoad = () => {
    if (dataStorage().getDataLength() === 0) return;
    fillNavbarWithProjects();
  };

  siteLoad();

  projectSectionDOM.addEventListener("click", addTodoItem);
  addProjectButton.addEventListener("click", addProject);
}

screenController();
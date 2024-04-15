import { projectList } from "./project-list";
import { createID } from "./project";
import { dataStorage } from "./data-storage";


function screenController() {
  const projects = projectList()

  const addProjectButton = document.querySelector(".add-project-btn");
  const projectSectionDOM = document.querySelector(".project-section");
  const main = document.querySelector("main");


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
      // const todoBtn = document.createElement("button");
      // todoBtn.classList.add("add-todo-btn");
      // todoBtn.textContent = "+ Todo";
      // todoBtn.dataset.id = project.getProjectID();
      const listItem = document.createElement("li");
      const projectBtn = document.createElement("button");
      projectBtn.textContent = project.getProjectName();
      projectBtn.classList.add("project-btn");
      projectBtn.dataset.id = project.getProjectID();
      projectBtn.dataset.projectName = project.getProjectName();
      // listItem.appendChild(todoBtn);
      listItem.appendChild(projectBtn);
      projectsListDOM.appendChild(listItem);
    });
    projectSectionDOM.appendChild(projectsListDOM);
  };

  const addTodoItem = event => {
    if (event.target.classList.contains("add-todo-btn")) {
      const [ selectedProject ] = projects.getSavedProjects()
        .filter(element => element.projectID === event.target.dataset.id);

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

  const fillMain = projectClicked => {
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content-section");
    const [ selectedProject ] = projects.createListOfProjects()
      .filter(element => element.getProjectID() === projectClicked);
    main.appendChild(contentDiv);
    fillMainWithDescription(selectedProject, contentDiv);
    fillMainWithTodoList(selectedProject, contentDiv);
  };


  const fillMainWithDescription = (selectedProject, contentDiv) => {
    const mainHeader = document.createElement("div");
    const projectHeading = document.createElement("h2");
    
    const descriptionPara = document.createElement("p");

    mainHeader.classList.add("main-header");
    descriptionPara.classList.add("description-text");

    projectHeading.textContent = selectedProject.getProjectName();
    projectHeading.classList.add("project-heading-main");
    
    if (selectedProject.getProjectDescription()) {
      descriptionPara.textContent = selectedProject.getProjectDescription();
    }

    mainHeader.appendChild(projectHeading);
    mainHeader.appendChild(descriptionPara);
    contentDiv.appendChild(mainHeader);
  };


  const fillMainWithTodoList = (selectedProject, contentDiv) => {
    const mainContent = document.createElement("div")
    const addTodoBtn = document.createElement("button");

    mainContent.classList.add("main-content-section");
    addTodoBtn.classList.add("add-todo-btn");
    addTodoBtn.textContent = "+ Todo";
    addTodoBtn.dataset.id = selectedProject.getProjectID();

    mainContent.appendChild(addTodoBtn);
    contentDiv.appendChild(mainContent);
  };


  const clearMain = () => {
    if (main.children.length > 0) {
      const child = main.children[0];
      main.removeChild(child);
    }
  };


  const projectBtnClickHandler = event => {
    if (event.target.classList.contains("project-btn")) {
      dataStorage().postData(event.target.dataset.id);
      clearMain();
      fillMain(event.target.dataset.id);
    }
  }

  const siteLoad = () => {
    if (dataStorage().getDataLength() === 0) return;
    fillNavbarWithProjects();
    if (dataStorage().getActiveTab()) fillMain(dataStorage().getActiveTab());
  };

  siteLoad();

  projectSectionDOM.addEventListener("click", projectBtnClickHandler);
  main.addEventListener("click", addTodoItem);
  addProjectButton.addEventListener("click", addProject);
}

export { screenController };
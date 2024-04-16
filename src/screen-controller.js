import { projectList } from "./project-list";
import { createID } from "./project";
import { dataStorage } from "./data-storage";
import { format } from "date-fns";
import editImage from "./images/square-edit-outline.png";
import deleteImage from "./images/delete.png";


function screenController() {
  const projects = projectList()

  const addProjectButton = document.querySelector(".add-project-btn");
  const projectSectionDOM = document.querySelector(".project-section");
  const main = document.querySelector("main");
  const aside = document.querySelector("aside");


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
      const listItem = document.createElement("li");
      const projectBtn = document.createElement("button");
      projectBtn.textContent = project.getProjectName();
      projectBtn.classList.add("project-btn");
      projectBtn.dataset.id = project.getProjectID();
      projectBtn.dataset.projectName = project.getProjectName();
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
          optionObject: {
            description: "build javascript projects",
            dueDate: "2024-04-15",
            priority: "high",
          },
        }
      );
      dataStorage().postData(projects.getSavedProjects());
      clearMain();
      fillMain(selectedProject.projectID);
    }
  }

  const fillMain = projectClicked => {
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content-section");
    const [ selectedProject ] = projects.createListOfProjects()
      .filter(element => element.getProjectID() === projectClicked);
    main.appendChild(contentDiv);
    switch (projectClicked) {
      case "1":
        return;
      case "2":
        return;
      case "3":
        return;
      case undefined:
        return;
      default:
        fillMainWithDescription(selectedProject, contentDiv);
        fillMainWithTodoList(selectedProject, contentDiv);
    };
  };


  const fillMainWithDescription = (selectedProject, contentDiv) => {
    const mainHeader = document.createElement("div");
    const headingDiv = document.createElement("div");
    const projectHeading = document.createElement("h2");
    const descriptionPara = document.createElement("p");
    const editProjectBtn = document.createElement("button");
    const deleteProjectBtn = document.createElement("button");

    const newEditImage = new Image();
    newEditImage.src = editImage;
    const newDeleteImage = new Image();
    newDeleteImage.src = deleteImage;

    mainHeader.classList.add("main-header");
    headingDiv.classList.add("heading-section");
    editProjectBtn.classList.add("edit-project-btn");
    deleteProjectBtn.classList.add("delete-project-btn");
    descriptionPara.classList.add("description-text");
    projectHeading.classList.add("project-heading-main");

    editProjectBtn.dataset.id = selectedProject.getProjectID();
    deleteProjectBtn.dataset.id = selectedProject.getProjectID();
    
    projectHeading.textContent = selectedProject.getProjectName();
    
    if (selectedProject.getProjectDescription()) {
      descriptionPara.textContent = selectedProject.getProjectDescription();
    }
    deleteProjectBtn.appendChild(newDeleteImage);
    editProjectBtn.appendChild(newEditImage);
    headingDiv.appendChild(projectHeading);
    headingDiv.appendChild(editProjectBtn);
    headingDiv.appendChild(deleteProjectBtn);
    mainHeader.appendChild(headingDiv);
    mainHeader.appendChild(descriptionPara);
    contentDiv.appendChild(mainHeader);
  };


  const fillMainWithTodoList = (selectedProject, contentDiv) => {
    const mainContent = document.createElement("div")
    const addTodoBtn = document.createElement("button");
    const todoList = document.createElement("ul");

    selectedProject.getListOfTodos().forEach(todo => {
      const todoItem = document.createElement("li");
      const todoTitleText = document.createElement("h3");
      const todoDescriptionText = document.createElement("p");
      const todoPriorityText = document.createElement("p");
      const todoDueDateText = document.createElement("p");
      const checkbox = document.createElement("input");
      const editBtn = document.createElement("button");
      const deleteBtn = document.createElement("button");
      const btnContainer = document.createElement("div");
      
      const newEditImage = new Image();
      newEditImage.src = editImage;

      const newDeleteImage = new Image();
      newDeleteImage.src = deleteImage;

      checkbox.type = "checkbox";
      todoTitleText.textContent = todo.getTitle();
      todoDescriptionText.textContent = todo.getDescription();
      todoPriorityText.textContent = todo.getPriority();
      todoDueDateText.textContent = format(
                                      new Date(todo.getDueDate()),
                                      "EEEE',' dd MMMM"
                                    );

      todoItem.classList.add("todo-item");
      editBtn.classList.add("todo-edit-btn");
      deleteBtn.classList.add("todo-delete-btn");
      btnContainer.classList.add("btn-container");
      btnContainer.dataset.id = todo.getID();
      editBtn.dataset.id = todo.getID();
      deleteBtn.dataset.id = todo.getID();

      editBtn.appendChild(newEditImage);
      deleteBtn.appendChild(newDeleteImage);
      btnContainer.appendChild(editBtn);
      btnContainer.appendChild(deleteBtn);
      todoItem.appendChild(checkbox);
      todoItem.appendChild(todoTitleText);
      todoItem.appendChild(todoDescriptionText);
      todoItem.appendChild(todoPriorityText);
      todoItem.appendChild(todoDueDateText);
      todoItem.appendChild(btnContainer);
      todoList.appendChild(todoItem);
    });

    mainContent.classList.add("main-content-section");
    addTodoBtn.classList.add("add-todo-btn");
    addTodoBtn.textContent = "+ Todo";
    addTodoBtn.dataset.id = selectedProject.getProjectID();

    mainContent.appendChild(todoList);
    mainContent.appendChild(addTodoBtn);
    contentDiv.appendChild(mainContent);
  };


  const clearMain = () => {
    if (main.children.length > 0) {
      const child = main.children[0];
      main.removeChild(child);
    }
  };


  const asideBtnClickHandler = event => {
    if (event.target.classList.contains("project-btn") || event.target.classList.contains("nav-btn")) {
      dataStorage().postData(event.target.dataset.id);
      clearMain();
      fillMain(event.target.dataset.id);
    }
  }

  const deleteItem = event => {
    if (event.target.classList.contains("todo-delete-btn") || event.target.parentElement.classList.contains("todo-delete-btn")) {
      const [ selectedProject ] = projects.getSavedProjects()
        .filter(element => element.projectID === dataStorage().getActiveTab());
      const itemToDelete = selectedProject.listOfTodos
        .find(item => item.id === event.target.parentElement.dataset.id);
      const index = selectedProject.listOfTodos.indexOf(itemToDelete);
      selectedProject.listOfTodos.splice(index, 1);
      dataStorage().postData(projects.getSavedProjects());
      clearMain();
      fillMain(dataStorage().getActiveTab())
    }
    if (event.target.classList.contains("delete-project-btn") || event.target.parentElement.classList.contains("delete-project-btn")) {
      const selectedProject = projects.getSavedProjects().find(project => project.projectID === event.target.parentElement.dataset.id)
      const index = projects.getSavedProjects().indexOf(selectedProject);
      projects.getSavedProjects().splice(index, 1);
      dataStorage().postData(projects.getSavedProjects());
      clearMain();
      updateNavbar();
    }
  };

  const siteLoad = () => {
    if (dataStorage().getDataLength() === 0) return;
    fillNavbarWithProjects();

    switch (dataStorage().getActiveTab()) {
      case "1":
        return;
      case "2":
        return;
      case "3":
        return;
      case undefined:
        return;
      default:
        fillMain(dataStorage().getActiveTab());
    };
  };


  main.addEventListener("click", deleteItem);
  aside.addEventListener("click", asideBtnClickHandler);
  main.addEventListener("click", addTodoItem);
  addProjectButton.addEventListener("click", addProject);

  siteLoad();
}

export { screenController };
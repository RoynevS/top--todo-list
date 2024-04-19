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
  const modalAddProjectBtn = document.querySelector(".modal-btn-add-project");
  const modalCloseBtn = document.querySelector(".modal-btn-close");
  const projectModal = document.querySelector(".project-modal");
  const projectNameInput = document.querySelector("#project-name");
  const projectStateInput = document.querySelector("#project-state");
  const projectDescriptionInput = document.querySelector("#project-description");
  const projectCategoryInput = document.querySelector("#project-category");
  const taskModal = document.querySelector(".task-modal");
  const taskNameInput = document.querySelector("#task-name");
  const taskProjectInput = document.querySelector("#task-project");
  const taskDescriptionInput = document.querySelector("#task-description");
  const taskPriorityInput = document.querySelector("#task-priority");
  const taskDueDateInput = document.querySelector("#due-date");
  const taskCloseModalBtn = document.querySelector(".modal-btn-close-task");
  const modalAddTaskBtn = document.querySelector(".modal-btn-add-task");


  const addProject = (projectNameInputValue, projectStateInputValue, projectDescriptionInputValue, projectCategoryInputValue) => {
    const newProject = {
      projectName: projectNameInputValue,
      projectState: projectStateInputValue,
      listOfTodos: [],
      projectID: createID(),
      projectOptions: {
        projectDescription: projectDescriptionInputValue, 
        projectCategory: projectCategoryInputValue,
      },
    };

    projects.saveNewProjectData(newProject);

    updateNavbar();
    dataStorage().postData(newProject.projectID);
    clearMain();
    fillMain(newProject.projectID);
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

  const addTodoItem = (taskNameInputValue, taskProjectInputValue, taskDescriptionInputValue, taskPriorityInputValue, taskDueDateInputValue) => {
    // TODO: Change to given name from id
    const [ selectedProject ] = projects.getSavedProjects()
      .filter(element => element.projectID === taskProjectInputValue);

    selectedProject.listOfTodos.push(
      {
        title: taskNameInputValue,
        id: selectedProject.projectID + createID(),
        project: selectedProject.projectName,
        optionObject: {
          description: taskDescriptionInputValue,
          dueDate: taskDueDateInputValue,
          priority: taskPriorityInputValue,
        },
      }
    );
    dataStorage().postData(projects.getSavedProjects());
    clearMain();
    fillMain(selectedProject.projectID);
  }

  const fillMain = projectClicked => {
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content-section");
    const [ selectedProject ] = projects.createListOfProjects()
      .filter(element => element.getProjectID() === projectClicked);
    main.appendChild(contentDiv);
    switch (projectClicked) {
      case "1":
        loadTodaySite(contentDiv);
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
      checkbox.name = "complete-task";
      todoTitleText.textContent = todo.getTitle();
      if (todo.getDescription()) todoDescriptionText.textContent = todo.getDescription();
      if (todo.getPriority()) todoPriorityText.textContent = todo.getPriority();
      if (todo.getDueDate()) {
        todoDueDateText.textContent = format(
                                        new Date(todo.getDueDate()),
                                        "EEEE',' dd MMMM"
                                      );
      }

      todoItem.classList.add("todo-item");
      editBtn.classList.add("todo-edit-btn");
      deleteBtn.classList.add("todo-delete-btn");
      btnContainer.classList.add("btn-container");
      todoItem.dataset.id = todo.getID();
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
    addTodoBtn.textContent = "+ Task";
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
    const [ selectedProject ] = projects.getSavedProjects()
        .filter(element => element.projectID === event.target.parentElement.dataset.id.slice(0, 4));
    const itemToDelete = selectedProject.listOfTodos
      .find(item => item.id === event.target.parentElement.dataset.id);
    const index = selectedProject.listOfTodos.indexOf(itemToDelete);
    selectedProject.listOfTodos.splice(index, 1);
    dataStorage().postData(projects.getSavedProjects());
    clearMain();
    fillMain(dataStorage().getActiveTab())
  };


  const deleteProject = event => {
    const selectedProject = projects.getSavedProjects().find(project => project.projectID === event.target.parentElement.dataset.id)
    const index = projects.getSavedProjects().indexOf(selectedProject);
    projects.getSavedProjects().splice(index, 1);
    dataStorage().postData(projects.getSavedProjects());
    clearMain();
    dataStorage().postData("1");
    fillMain(dataStorage().getActiveTab());
    updateNavbar();
  };


  const onMainButtonPress = event => {
    if (
        event.target.classList.contains("todo-delete-btn") 
        || event.target.parentElement.classList.contains("todo-delete-btn") 
        || event.target.name === "complete-task"
      ) {
      deleteItem(event);
    } else if (
        event.target.classList.contains("delete-project-btn") 
        || event.target.parentElement.classList.contains("delete-project-btn")
      ) {
      deleteProject(event);
    } else if (
      event.target.classList.contains("edit-project-btn") 
      || event.target.parentElement.classList.contains("edit-project-btn")
    ) {
      showEditModal(event);
    }
  };

  const openModal = (btnText) => {
    btnText = (typeof btnText === "string") ? btnText : "Add";
    const actionBtnDiv = document.querySelector(".action-btn");
    const actionBtn = document.createElement("button");
    actionBtn.textContent = btnText;
    (btnText === "Add") 
            ? actionBtn.classList.add("modal-btn-add-project") 
            : actionBtn.classList.add("modal-btn-edit-project");
    actionBtnDiv.replaceChildren(actionBtn);
    projectModal.showModal();
  };

  const populateSelectInputField = id => {
    projects.getSavedProjects().forEach(project => {
      const option = document.createElement("option");
      option.textContent = project.projectName;
      option.value = project.projectID;
      if (project.projectID === id) {
        option.selected = true;
      }
      taskProjectInput.appendChild(option);
    });
  };

  const clearSelectInputField = () => {
    taskProjectInput.replaceChildren();
  }; 

  const openTaskModal = event => {
    if (event.target.classList.contains("add-todo-btn")) {
      populateSelectInputField(event.target.dataset.id);
      taskModal.showModal();
    }
  };

  const addTaskHandler = () => {
    if (taskNameInput.value && taskProjectInput.value) {
      addTodoItem(taskNameInput.value, taskProjectInput.value, taskDescriptionInput.value, taskPriorityInput.value, taskDueDateInput.value)
      clearSelectInputField();
      // TODO: clear input fields
    }
  };

  const addProjectHandler = () => {
    if (projectNameInput.value && projectStateInput.value) {
      addProject(projectNameInput.value, projectStateInput.value, projectDescriptionInput.value, projectCategoryInput.value);
      // TODO: put back after testing
      // clearInputFields(projectNameInput, projectStateInput, projectDescriptionInput, projectCategoryInput);
    }
  };

  const closeModal = event => {
    event.preventDefault();
    projectModal.close();
    // TODO: put back after testing
    // clearInputFields(projectNameInput, projectStateInput, projectDescriptionInput, projectCategoryInput);
  };

  const closeTaskModal = event => {
    event.preventDefault();
    clearSelectInputField();
    taskModal.close();
    // TODO: clear input fields
  }

  const clearInputFields = (projectNameInput, projectStateInput, projectDescriptionInput, projectCategoryInput) => {
    projectNameInput.value = "";
    projectStateInput.value = "";
    projectDescriptionInput.value = "";
    projectCategoryInput.value = "";
  };

  const showEditModal = () => {
    const selectedProject = projects.getSavedProjects().find(project => project.projectID === dataStorage().getActiveTab());
    projectNameInput.value = selectedProject.projectName;
    projectStateInput.value = selectedProject.projectState;
    projectDescriptionInput.value = selectedProject.projectOptions.projectDescription;
    projectCategoryInput.value = selectedProject.projectOptions.projectCategory;
    openModal("Edit");
  };

  const projectModalClickHandler = event => {
    if (event.target.classList.contains("modal-btn-add-project")) {
      addProjectHandler();
    } else if (event.target.classList.contains("modal-btn-edit-project")) {
      editProjectHandler();
    }
  };

  const editProjectHandler = () => {
    const selectedProject = projects.getSavedProjects().find(project => project.projectID === dataStorage().getActiveTab());
    selectedProject.projectName = projectNameInput.value;
    selectedProject.projectState = projectStateInput.value;
    selectedProject.projectOptions.projectDescription = projectDescriptionInput.value;
    selectedProject.projectOptions.projectCategory = projectCategoryInput.value;
    dataStorage().postData(projects.getSavedProjects());
    clearMain();
    fillMain(dataStorage().getActiveTab());
    updateNavbar();
  };

  const loadTodaySite = contentDiv => {
    const allTasks = [];
    const listOfProjects = projects.createListOfProjects();
    listOfProjects.forEach(project => allTasks.push(...project.getListOfTodos()));
    const tasksToday = allTasks.filter(task => task.getDueDate() === format(new Date(), 'yyyy-MM-dd'));

    const mainContent = document.createElement("div")
    const todoList = document.createElement("ul");

    tasksToday.forEach(todo => {
      const todoItem = document.createElement("li");
      const todoTitleText = document.createElement("h3");
      const todoDescriptionText = document.createElement("p");
      const todoPriorityText = document.createElement("p");
      const todoDueDateText = document.createElement("p");
      const todoProject = document.createElement("p");
      const checkbox = document.createElement("input");
      const editBtn = document.createElement("button");
      const deleteBtn = document.createElement("button");
      const btnContainer = document.createElement("div");

      const newEditImage = new Image();
      newEditImage.src = editImage;

      const newDeleteImage = new Image();
      newDeleteImage.src = deleteImage;

      checkbox.type = "checkbox";
      checkbox.name = "complete-task";
      todoTitleText.textContent = todo.getTitle();
      todoProject.textContent = todo.getProject();
      if (todo.getDescription()) todoDescriptionText.textContent = todo.getDescription();
      if (todo.getPriority()) todoPriorityText.textContent = todo.getPriority();
      if (todo.getDueDate()) {
        todoDueDateText.textContent = format(
                                        new Date(todo.getDueDate()),
                                        "EEEE',' dd MMMM"
                                      );
      }

      todoItem.classList.add("todo-item");
      editBtn.classList.add("todo-edit-btn");
      deleteBtn.classList.add("todo-delete-btn");
      btnContainer.classList.add("btn-container");
      todoItem.dataset.id = todo.getID();
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
      todoItem.appendChild(todoProject);
      todoItem.appendChild(todoDueDateText);
      todoItem.appendChild(btnContainer);
      todoList.appendChild(todoItem);
    });

    mainContent.classList.add("main-content-section");

    mainContent.appendChild(todoList);
    contentDiv.appendChild(mainContent);
  };

  const siteLoad = () => {
    if (dataStorage().getDataLength() === 0) return;
    fillNavbarWithProjects();

    switch (dataStorage().getActiveTab()) {
      case "1":
        fillMain("1");
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


  projectModal.addEventListener("click", projectModalClickHandler);
  modalCloseBtn.addEventListener("click", closeModal);
  taskCloseModalBtn.addEventListener("click", closeTaskModal);
  modalAddTaskBtn.addEventListener("click", addTaskHandler);
  main.addEventListener("click", onMainButtonPress);
  aside.addEventListener("click", asideBtnClickHandler);
  main.addEventListener("click", openTaskModal);
  addProjectButton.addEventListener("click", openModal);

  siteLoad();
}

export { screenController };
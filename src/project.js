function todoItem(title, projectID, project, optionObject) {
  let {
    description,
    dueDate,
    priority,
  } = optionObject;

  let statusDone = false;

  const id = projectID + createID();

  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getProject = () => project;
  const getID = () => id;

  const changeTitle = newTitle => {
    title = newTitle;
  };

  const changeDescription = newDescription => {
    description = newDescription;
  };

  const changeDueDate = newDueDate => {
    dueDate = newDueDate;
  };

  const changePriority = newPriority => {
    priority = newPriority;
  };

  const changeProject = newProject => {
    project = newProject;
  };

  const changeStatus = () => {
    statusDone = true;
  }

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getProject,
    getID,
    changeTitle,
    changeDescription,
    changeDueDate,
    changePriority,
    changeProject,
    changeStatus,
  };
}


function Project({ projectName, projectState, projectID, projectOptions }) {
  let { projectDescription, projectCategory } = projectOptions;
  const listOfItems = [];

  const getProjectName = () => projectName;
  const getProjectState = () => projectState;
  const getProjectDescription = () => projectDescription;
  const getProjectCategory = () => projectCategory;
  const getProjectID = () => projectID;


  const createTodoItem = (title, optionObject) => {
    const newTodo = todoItem(title, projectID, projectName, optionObject);
    listOfItems.push(newTodo);
  };


  const deleteTodoItem = (id) => {
    const item = listOfItems.filter(element => element.getID() === id);
    const index = listOfItems.indexOf(item[0]);
    if (index !== -1) listOfItems.splice(index, 1);
  }

  const changeProjectState = (newState) => {
    projectState = newState;
  }


  const changeProjectName = (newProjectName) => {
    projectName = newProjectName;
  }

  return {
    listOfItems,
    getProjectName,
    getProjectState,
    getProjectDescription,
    getProjectCategory,
    getProjectID,
    createTodoItem,
    deleteTodoItem,
    changeProjectState,
    changeProjectName,
  };
}

// TODO: Check for duplicate ids
function createID() {
  let id = "";
  for (let i = 0; i < 4; i++) {
    id += Math.floor(Math.random() * 10);
  }
  return id;
}

export { Project, createID };

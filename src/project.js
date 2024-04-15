function todoItem({ title, projectID, project, optionObject }) {
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


function Project({ projectName, projectState, listOfTodos, projectID, projectOptions }) {
  let { projectDescription, projectCategory } = projectOptions;

  const getProjectName = () => projectName;
  const getProjectState = () => projectState;
  const getProjectDescription = () => projectDescription;
  const getProjectCategory = () => projectCategory;
  const getProjectID = () => projectID;
  const getListOfTodos = () => listOfTodos;

  listOfTodos = listOfTodos.map(todo => todoItem(todo));
  
  const deleteTodoItem = (id) => {
    const item = listOfTodos.filter(element => element.getID() === id);
    const index = listOfTodos.indexOf(item[0]);
    if (index !== -1) listOfTodos.splice(index, 1);
  }

  const changeProjectState = (newState) => {
    projectState = newState;
  }


  const changeProjectName = (newProjectName) => {
    projectName = newProjectName;
  }

  return {
    getProjectName,
    getProjectState,
    getProjectDescription,
    getProjectCategory,
    getProjectID,
    getListOfTodos,
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

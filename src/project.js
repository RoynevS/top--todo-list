function todoItem(title, projectID, project, optionObject) {
  let {
    description,
    dueDate,
    priority,
  } = optionObject;

  let done = false;

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
    done = true;
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


function Project(projectName, projectState, projectOptions) {
  let { projectDescription, projectCategory } = projectOptions;
  const listOfItems = [];
  const projectID = createID(); 

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

  // used for testing
  const printTodos = () => {
    listOfItems.forEach((item) => {
      console.log(item.getTitle());
      // console.log(item.getID());
      // console.log(item.getDescription());
      // console.log(item.getDueDate());
      // console.log(item.getPriority());
      // console.log(item.getProject());
    });
    return listOfItems[1].getID();
  };

  return {
    getProjectName,
    getProjectState,
    getProjectDescription,
    getProjectCategory,
    getProjectID,
    createTodoItem,
    deleteTodoItem,
    printTodos,
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

export { Project };

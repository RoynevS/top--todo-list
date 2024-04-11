function todoItem(title, optionObject) {
  let {
    description,
    dueDate,
    priority,
    project
  } = optionObject;

  let done = false;

  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getProject = () => project;

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

  const getProjectName = () => projectName;
  const getProjectState = () => projectState;
  const getProjectDescription = () => projectDescription;
  const getProjectCategory = () => projectCategory;


  const createTodoItem = (title, optionObject) => {
    const newTodo = todoItem(title, optionObject);
    listOfItems.push(newTodo);
  };


  const deleteTodoItem = (title) => {
    const item = listOfItems.filter(element => element.getTitle() === title);
    const index = listOfItems.indexOf(item[0]);
    console.log(index);
    listOfItems.splice(index, 1);
  }

  // use to give each item an index to use for deletion later
  const printTodos = () => {
    listOfItems.forEach((item, index) => {
      console.log(item.getTitle());
      console.log(index);
      // console.log(item.getDescription());
      // console.log(item.getDueDate());
      // console.log(item.getPriority());
      // console.log(item.getProject());
    });
  };

  return {
    getProjectName,
    getProjectState,
    getProjectDescription,
    getProjectCategory,
    createTodoItem,
    deleteTodoItem,
    printTodos,
  };
}

const testProject = Project("The Odin Project", "in Progress", {projectDescription: "Learn Web Development", projectCategory: "Coding"});
console.log(testProject.getProjectName());
testProject.createTodoItem("Learn Javascript", {priority: "high", project: testProject.getProjectName()});
testProject.createTodoItem("Learn CSS", {});
testProject.createTodoItem("Learn HTML", {});
testProject.printTodos();
testProject.deleteTodoItem("");
testProject.printTodos();

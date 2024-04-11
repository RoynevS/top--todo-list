function todoItem(title, optionObject) {
  let {
    description,
    dueDate,
    priority,
    project
  } = optionObject;

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
  };
}

// const testItem = todoItem("Test", {description:"This is just a test", priority:"important"});
// console.log(testItem.getTitle());
// testItem.changeTitle("New Test");
// console.log(testItem.getTitle());
// console.log(testItem.getDescription());
// console.log(testItem.getDueDate());
// console.log(testItem.getPriority());
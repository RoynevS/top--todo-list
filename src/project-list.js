import { Project } from "./project";

function projectList() {
  const listOfProjects = [];

  const getListOfProjects = () => listOfProjects;

  // used for testing
  const getProjectAttributes = () => {
    listOfProjects.forEach(project => {
      console.log(project.getProjectName());
      console.log(project.getProjectState());
    });
  };

  const createNewProject = (name, state, projectOptions) => {
    const newProject = Project(name, state, projectOptions);
    listOfProjects.push(newProject);
  };

  const deleteProject = (id) => {
    const project = listOfProjects.filter(element => element.getProjectID() === id);
    const index = listOfProjects.indexOf(project[0]);
    if (index !== -1) listOfProjects.splice(index, 1);
  }

  const setProjectState = (newState, id) => {
    const project = listOfProjects.filter(element => element.getProjectID() === id);
    project[0].changeProjectState(newState);
  }

  return {
    getListOfProjects,
    getProjectAttributes,
    createNewProject,
    deleteProject,
    setProjectState,
  };
}




const projects = projectList();
projects.createNewProject("The Odin Project", "in Progress", {projectDescription: "Learn Web Development", projectCategory: "Coding"});
projects.createNewProject("Learn Blender", "halted", {projectCategory: "3D Art"});
projects.getProjectAttributes();
const projectID = projects.getListOfProjects()[1].getProjectID();
projects.setProjectState("in progress", projectID);
// projects.deleteProject(projectID);
projects.getProjectAttributes();
// const testProject = projects.getListOfProjects()[0];
// const testProject2 = projects.getListOfProjects()[1];
// testProject.createTodoItem("Learn Javascript", {priority: "high"});
// testProject.createTodoItem("Learn CSS", {});
// testProject.createTodoItem("Learn HTML", {});
// const testID = testProject.printTodos();
// testProject.deleteTodoItem(testID);
// testProject.printTodos();
// testProject2.createTodoItem("Watch Busstop Tutorial", {});
// testProject2.createTodoItem("Watch Sword Tutorial", {});
// testProject2.createTodoItem("Watch Random Tutorial", {});
// const testID2 = testProject2.printTodos();
// testProject2.deleteTodoItem(testID2);
// testProject2.printTodos();
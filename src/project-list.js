import { Project } from "./project";
import { dataStorage } from "./data-storage";

function projectList() {
  let savedProjects;

  if (dataStorage().getDataLength() === 0) {
    savedProjects = [];
  } else {
    savedProjects = dataStorage().getData();
  }
  
  const getSavedProjects = () => savedProjects;


  const saveNewProjectData = (newProject) => {
    getSavedProjects().push(newProject);
    dataStorage().postData(getSavedProjects());
  };

  const createListOfProjects = () => {
    if (getSavedProjects().length === 0) return [];
    return getSavedProjects().map(project => Project(project));
  };

  const deleteProject = (id) => {
    const project = savedProjects.filter(element => element.getProjectID() === id);
    const index = savedProjects.indexOf(project[0]);
    if (index !== -1) savedProjects.splice(index, 1);
  }

  return {
    getSavedProjects,
    saveNewProjectData,
    createListOfProjects,
    deleteProject,
  };
}

export { projectList };
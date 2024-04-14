function dataStorage() {
  const postData = (projectList) => {
    localStorageData().itemSetter(projectList);
  };

  const getData = () => localStorageData().itemGetter();

  const getDataLength = () => localStorageData().getLength();


  return {
    postData,
    getData,
    getDataLength,
  };
}


function localStorageData() {
  const itemSetter = (projectList) => {
    const stringItem = JSON.stringify(projectList);
    localStorage.setItem(`projects`, stringItem);
  }

  const itemGetter = () => JSON.parse(localStorage.getItem("projects"));

  const getLength = () => localStorage.length;

  return {
    itemSetter,
    itemGetter,
    getLength,
  };
}

export { dataStorage };
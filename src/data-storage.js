function dataStorage() {
  const postData = (project, index) => {
    localStorageData().itemSetter(project, index);
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
  const itemSetter = (itemToStore, index) => {
    const stringItem = JSON.stringify(itemToStore);
    localStorage.setItem(`project${index}`,stringItem);
  }

  const itemGetter = () => {
    const projectArray = Object.entries(localStorage);
    const itemArray = [];
    for (let i = 0; i < localStorage.length; i++) {
      const project = JSON.parse(projectArray[i][1]);
      itemArray.push(project);
    }
    return itemArray;
  };

  const getLength = () => localStorage.length;

  return {
    itemSetter,
    itemGetter,
    getLength,
  };
}

export { dataStorage };
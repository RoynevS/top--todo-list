function dataStorage() {
  const postData = (data) => {
    localStorageData().itemSetter(data);
  };

  const getData = () => localStorageData().itemGetter();
  const getActiveTab = () => localStorageData().activeTabGetter();

  const getDataLength = () => localStorageData().getLength();


  return {
    postData,
    getData,
    getActiveTab,
    getDataLength,
  };
}


function localStorageData() {
  const itemSetter = (data) => {
    if (typeof data === "string") {
      const stringItem = JSON.stringify(data);
      localStorage.setItem("activeTab", stringItem);
      return;
    }
    const stringItem = JSON.stringify(data);
    localStorage.setItem(`projects`, stringItem);
  };

  const itemGetter = () => JSON.parse(localStorage.getItem("projects"));
  const activeTabGetter = () => JSON.parse(localStorage.getItem("activeTab"));

  const getLength = () => itemGetter() ? itemGetter().length : 0;

  return {
    itemSetter,
    itemGetter,
    activeTabGetter,
    getLength,
  };
}

export { dataStorage };
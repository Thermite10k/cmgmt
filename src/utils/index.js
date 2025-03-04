const getIndex = () => {
  let index = localStorage.getItem("index");
  const returnIndex = index;

  if (index !== null) {
    localStorage.setItem("index", ++index);
    return returnIndex;
  }

  resetIndex();

  return localStorage.getItem("index");
};

const resetIndex = () => {
  localStorage.setItem("index", 1);
};
export { getIndex, resetIndex };

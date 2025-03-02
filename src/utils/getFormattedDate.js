const getFormattedData = () => {
  const today = new Date();

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const year = String(today.getFullYear());

  return `${month}/${day}/${year}`;
};

export default getFormattedData;

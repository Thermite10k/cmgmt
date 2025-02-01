import { createContext, useState, useEffect } from "react";

const dataContext = createContext(1);

const initialState = {
  0: {
    name: "Tables",
    time: 0,
    extras: 0,
    total: 0,
  },
  1: {
    name: "Play Stations",
    time: 0,
    extras: 0,
    total: 0,
  },
  2: {
    name: "Extras",
    total: 0,
  },
  total: 0,
};
export const DataProvider = ({ children }) => {
  const [storedData, setStoredData] = useState(() => {
    const savedData = localStorage.getItem("saleStats");
    return savedData ? JSON.parse(savedData) : initialState;
  });
  const resetData = () => {
    setStoredData(initialState);
    localStorage.removeItem("saleStats");
  };
  useEffect(() => {
    localStorage.setItem("saleStats", JSON.stringify(storedData));
  }, [storedData]);

  return (
    <dataContext.Provider value={{ storedData, setStoredData, resetData }}>
      {children}
    </dataContext.Provider>
  );
};
export { dataContext };

import { createContext, useState, useEffect } from "react";

const dataContext = createContext(1);

const initialState = {
  services: {
    Tables: {
      name: "Tables",
      time: 0,
      extras: 0,
      total: 0,
    },
    "Play Stations": {
      name: "Play Stations",
      time: 0,
      extras: 0,
      total: 0,
    },
    extras: {
      name: "Extras",
      total: 0,
    },
  },
  total: 0,
};
export const DataProvider = ({ children }) => {
  const [storedData, setStoredData] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("saleStats"));

    return savedData && savedData.services ? savedData : initialState;
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

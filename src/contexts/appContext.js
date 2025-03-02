import { createContext, useState, useEffect } from "react";
import getFormattedData from "../utils/getFormattedDate";

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
  serviceStatus: {},
  history: {},
  total: 0,
};
export const DataProvider = ({ children }) => {
  const [storedData, setStoredData] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("saleStats"));

    return savedData &&
      Object.keys(savedData).length == Object.keys(initialState).length
      ? savedData
      : initialState;
  });
  const resetHistory = () => {
    setStoredData((prevState) => ({
      ...prevState,
      history: {},
    }));
  };
  const resetData = () => {
    let statusArray = storedData.serviceStatus;
    let history = storedData.history;
    const services = storedData.services;
    let today = getFormattedData();

    history = {
      ...history,
      [today]: {
        ...services,
        total: storedData.total,
      },
    };

    setStoredData({
      ...initialState,
      serviceStatus: statusArray,
      history: history,
    });

    localStorage.removeItem("saleStats");
  };
  useEffect(() => {
    localStorage.setItem("saleStats", JSON.stringify(storedData));
  }, [storedData]);

  return (
    <dataContext.Provider
      value={{ storedData, setStoredData, resetData, resetHistory }}
    >
      {children}
    </dataContext.Provider>
  );
};
export { dataContext };

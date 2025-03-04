import { createContext, useState, useEffect } from "react";
import getFormattedData from "../utils/getFormattedDate";
import { getIndex, resetIndex } from "../utils/index";

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
    resetIndex();
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
    let indexOfHistory = getIndex();

    history = {
      ...history,
      sum: {
        tableTimeSum: (history.sum?.tableTimeSum || 0) + +services.Tables.time,
        tableExtrasSum:
          (history.sum?.tableExtrasSum || 0) + +services.Tables.extras,
        tableTotalSum:
          (history.sum?.tableTotalSum || 0) + +services.Tables.total,
        playStationsTimeSum:
          (history.sum?.playStationsTimeSum || 0) +
          +services["Play Stations"].time,

        playStationsExtrasSum:
          (history.sum?.playStationsExtrasSum || 0) +
          +services["Play Stations"].extras,

        playStationsTotalSum:
          (history.sum?.playStationsTotalSum || 0) +
          +services["Play Stations"].total,

        extrasSum: (history.sum?.extrasSum || 0) + +services.extras.total,
        grandTotal: (history.sum?.grandTotal || 0) + +storedData.total,
      },

      [indexOfHistory]: {
        ...services,
        date: today,
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

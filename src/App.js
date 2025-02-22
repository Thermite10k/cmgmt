import { useState, useCallback, useContext, useEffect } from "react";
import "./App.css";
import classes from "./App.module.css";
import { DataProvider, dataContext } from "./contexts/appContext";
import ServiceTable from "./components/ServiceTable/ServiceTable";
import Button from "./components/UI/Button/Button";
import Stats from "./components/Stats/Stats";
import QuickView from "./components/QuickView/QuickView";

function App() {
  const hourlyRate = 1100;
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const { storedData, setStoredData } = useContext(dataContext);

  // const { storedData, setStoredData } = useContext(dataContext);
  // console.log(storedData);
  const fetchDataHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      //const response = await fetch("http://localhost:8080/services");
      const response = await fetch("config.json");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const loadedData = [];
      for (const key in data) {
        loadedData.push({
          id: data[key].id,
          key: key,
          name: data[key].name,
          hourlyRate: data[key].hourlyRate,
          count: data[key].count,
        });
        setStoredData((prevState) => ({
          ...prevState,
          serviceStatus: {
            ...prevState.serviceStatus,
            [key]: new Array(data[key].count).fill(0),
          },
        }));
      }
      setData(loadedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  useEffect(() => {
    const reloadHandler = (event) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", reloadHandler);
    return () => {
      window.removeEventListener("beforeunload", reloadHandler);
    };
  }, []);

  return (
    <div className={classes.app}>
      <center>
        <h1>9 Billiards Club</h1>
      </center>
      <Stats />
      <QuickView />
      {data.length && data.map((obj, index) => <ServiceTable service={obj} />)}
    </div>
  );
}

export default App;

import { useState, useCallback, useActionState, useEffect } from "react";
import "./App.css";
import classes from "./App.module.css";

import ServiceTable from "./components/ServiceTable/ServiceTable";
import Button from "./components/UI/Button/Button";

function App() {
  const hourlyRate = 1100;
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(null);

  const fetchDataHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/config.json");
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

  return (
    <div className={classes.app}>
      <center>
        <h1>9 Billiards Club</h1>
      </center>
      {data.length && data.map((obj, index) => <ServiceTable service={obj} />)}
    </div>
  );
}

export default App;

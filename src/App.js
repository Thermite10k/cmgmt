import { useState, useCallback, useActionState, useEffect } from "react";
import "./App.css";
import Timer from "./components/Timer/Timer";
import ServiceTable from "./components/ServiceTable/ServiceTable";

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
          id: key,
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
    <div className="App">
      <center>
        <h1>cmgmt v0.1</h1>
      </center>
      {data.length && data.map((obj, index) => <ServiceTable service={obj} />)}
    </div>
  );
}

export default App;

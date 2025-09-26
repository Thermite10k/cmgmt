import React, { useState, useRef, useContext } from "react";
import Stats from "../Stats/Stats";
import HistoryTable from "../HistoryTable/HistoryTable";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import EditTimeTotal from "../Stats/EditTimeTotal";
import SingleExtra from "../SingleExtra/SingleExtra";
import classes from "./Logs.module.css";
import { dataContext } from "../../contexts/appContext";

const Logs = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(0);
  const { resetData } = useContext(dataContext);
  const inputRef = useRef(null);

  const authenticateUser = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const pass = data.get("enteredPass");

    if (isAuthenticated === 0 && pass === "Admin9") {
      setIsAuthenticated(1);
    } else if (isAuthenticated) {
      inputRef.current.value = "";
      setIsAuthenticated(0);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure that you want to reset the data?")) {
      resetData();
    }
  };

  return (
    <div>
      <div className={classes.logsFormsContainer}>
        <form onSubmit={authenticateUser}>
          <Input ref={inputRef} type="password" name="enteredPass" />
          <Button type="submit">Authenticate</Button>
          {!isAuthenticated ? (
            <Button className={classes.totalButton} onClick={handleReset}>
              Reset
            </Button>
          ) : (
            <div></div>
          )}
        </form>
        <div>
          <EditTimeTotal />

          <SingleExtra />
        </div>
      </div>
      <Stats />
      {isAuthenticated ? (
        <div>
          <HistoryTable />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Logs;

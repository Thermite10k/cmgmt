import React, { useState, useRef } from "react";
import Stats from "../Stats/Stats";
import HistoryTable from "../HistoryTable/HistoryTable";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import EditTimeTotal from "../Stats/EditTimeTotal";
import SingleExtra from "../SingleExtra/SingleExtra";
import classes from "./Logs.module.css";

const Logs = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(0);

  const inputRef = useRef(null);

  const authenticateUser = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const pass = data.get("enteredPass");
    console.log(pass);
    if (isAuthenticated === 0 && pass === "Admin9") {
      setIsAuthenticated(1);
    } else if (isAuthenticated) {
      inputRef.current.value = "";
      setIsAuthenticated(0);
    }
  };

  return (
    <div>
      <div className={classes.logsFormsContainer}>
        <form onSubmit={authenticateUser}>
          <Input ref={inputRef} type="password" name="enteredPass" />
          <Button type="submit">Authenticate</Button>
        </form>
        <div>
          <EditTimeTotal />

          <SingleExtra />
        </div>
      </div>
      {isAuthenticated ? (
        <div>
          <Stats />
          <HistoryTable />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Logs;

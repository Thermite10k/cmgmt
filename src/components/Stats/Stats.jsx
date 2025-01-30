import React, { useContext } from "react";
import { dataContext } from "../../contexts/appContext";
import { addCommaSeparator } from "../utils/addCommaSeparator";
import classes from "./Stats.module.css";
import Button from "../UI/Button/Button";
const Stats = () => {
  const { storedData, setStoredData, resetData } = useContext(dataContext);

  const handleReset = () => {
    if (window.confirm("Are you sure that you want to reset the data?")) {
      resetData();
    }
  };

  return (
    <div className={classes.statsContainer}>
      <ul className={classes.statList}>
        {Object.keys(storedData).map(
          (key) =>
            !isNaN(key) && (
              <li key={key} className={classes.listItem}>
                <div className={classes.name}>{storedData[key].name}</div>:{" "}
                {addCommaSeparator(storedData[key].amount)} Rials
              </li>
            )
        )}
      </ul>
      <div className={` ${classes.total}`}>
        Total: {addCommaSeparator(storedData.total)} Rials
      </div>
      <Button className={classes.totalButton} onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
};

export default Stats;

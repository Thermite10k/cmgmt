import React, { useContext, useRef } from "react";
import { dataContext } from "../../contexts/appContext";
import { addCommaSeparator } from "../utils/addCommaSeparator";
import classes from "./Stats.module.css";
import Button from "../UI/Button/Button";
import SingleExtra from "../SingleExtra/SingleExtra";
import capitalizeWords from "../utils/capitalize";
import EditTimeTotal from "./EditTimeTotal";

const Stats = () => {
  const { storedData, setStoredData, resetData } = useContext(dataContext);
  const optionRef = useRef(null);
  const handleReset = () => {
    if (window.confirm("Are you sure that you want to reset the data?")) {
      resetData();
    }
  };

  return (
    <div className={classes.statsContainer}>
      <div className={classes.stats}>
        <div className={classes.statList}>
          {Object.keys(storedData).map(
            (key) =>
              key != "total" && (
                <div className={classes.statsCard}>
                  <div className={classes.statCardTitle}>
                    {storedData[key].name}
                  </div>
                  <ul className={classes.statsUl}>
                    {Object.keys(storedData[key]).map(
                      (k) =>
                        k !== "name" && (
                          <li className={classes.listItem}>
                            {capitalizeWords(k)} :{" "}
                            {addCommaSeparator(storedData[key][k])}
                          </li>
                        )
                    )}
                  </ul>
                </div>
              )
          )}
        </div>
        <div className={` ${classes.total}`}>
          Total: {addCommaSeparator(storedData.total)} Rials
        </div>
        <Button className={classes.totalButton} onClick={handleReset}>
          Reset
        </Button>
      </div>
      <div className={classes.resetAndExtraContainer}>
        <EditTimeTotal />
        <SingleExtra />
      </div>
    </div>
  );
};

export default Stats;

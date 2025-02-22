import React, { useContext } from "react";
import Indicator from "../UI/Indicator/Indicator";
import { dataContext } from "../../contexts/appContext";
import classes from "./QuickView.module.css";
const QuickView = ({}) => {
  const { storedData } = useContext(dataContext);
  console.log(storedData.serviceStatus);

  return (
    <div className={classes.quickViewContainer}>
      {Object.keys(storedData.serviceStatus).map((k) => (
        <div className={classes.indicatorList}>
          {k}:{" "}
          {storedData.serviceStatus[k].map((state, index) => (
            <div>
              #{index + 1} <Indicator isActive={state} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuickView;

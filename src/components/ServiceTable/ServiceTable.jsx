import React, { useContext, useState } from "react";
import Timer from "../Timer/Timer";
import classes from "./ServiceTable.module.css";
import { dataContext } from "../../contexts/appContext";
import { backgrounds } from "./backgroundMap";

const ServiceTable = ({ service, shouldRender }) => {
  const { storedData, setStoredData } = useContext(dataContext);
  const render = service.render || shouldRender;
  console.log(shouldRender);
  const updateStatusArray = (index, state) => {
    let statusArray = storedData.serviceStatus[service.key];
    statusArray[index] = state;
    setStoredData((prevState) => ({
      ...prevState,
      serviceStatus: {
        ...prevState.serviceStatus,
        [service.key]: statusArray,
      },
    }));
  };

  return (
    render == 1 && (
      <div
        className={`${classes.relativeContainer} ${
          service.name === "Snooker" ? classes.snookerWidth : ""
        }`}
      >
        <div
          // style={{ backgroundImage: `url(${console})` }}
          className={`${classes[[backgrounds[service.id]]] || "table"} ${
            classes.backgroundEffect
          } `}
        />

        <div className={classes.serviceContainer}>
          <h1 className={classes.serviceTitle}>{service.key}</h1>
          <div className={classes.timerContainer}>
            {Array.from({ length: service.count }).map((_, index) => (
              <Timer
                statusHandle={updateStatusArray}
                title={service.name}
                index={index + 1}
                id={service.id}
                rate={service.hourlyRate}
                serviceKey={service.key}
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default ServiceTable;

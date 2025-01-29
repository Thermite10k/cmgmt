import React, { useEffect, useState } from "react";
import Timer from "../Timer/Timer";
import classes from "./ServiceTable.module.css";

const ServiceTable = ({ service }) => {
  return (
    <div className={classes.relativeContainer}>
      <div
        style={{ backgroundImage: `url(${console})` }}
        className={`${
          service.key === "Tables" ? classes.table : classes.console
        } ${classes.backgroundEffect} `}
      />

      <div className={classes.serviceContainer}>
        <h1 className={classes.serviceTitle}>{service.key}</h1>
        <div className={classes.timerContainer}>
          {Array.from({ length: service.count }).map((_, index) => (
            <Timer
              title={service.name + " #" + (index + 1)}
              rate={service.hourlyRate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceTable;

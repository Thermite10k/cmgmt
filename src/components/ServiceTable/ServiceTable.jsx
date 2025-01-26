import React, { useEffect, useState } from "react";
import Timer from "../Timer/Timer";
import classes from "./ServiceTable.module.css";

const ServiceTable = ({ service }) => {
  return (
    <div className={classes.serviceContainer}>
      <h1>{service.id}</h1>
      <div className={classes.timerContainer}>
        {Array.from({ length: service.count }).map((_, index) => (
          <div key={index}>
            <h3>
              {service.id} #{index + 1}
            </h3>

            <Timer rate={service.hourlyRate} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceTable;

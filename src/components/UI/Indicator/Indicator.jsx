import React from "react";
import classes from "./Indicator.module.css";
const Indicator = ({ isActive }) => {
  return (
    <div
      className={`${classes.indicator} ${
        isActive === "active" || isActive == 1 ? classes.active : ""
      }`}
    ></div>
  );
};

export default Indicator;

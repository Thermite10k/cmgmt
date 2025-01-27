import React, { useState, useEffect, useRef } from "react";
import classes from "./Timer.module.css";
import Button from "../UI/Button/Button";
const Timer = ({ rate, title }) => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const [total, setTotal] = useState(0);
  const [customRate, setCustomRate] = useState(rate);

  const intervalRef = useRef(null);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newSeconds = prevTime.seconds + 1;
          const newMinutes =
            newSeconds === 60 ? prevTime.minutes + 1 : prevTime.minutes;
          const newHours =
            newMinutes === 60 ? prevTime.hours + 1 : prevTime.hours;
          return {
            hours: newHours,
            minutes: newMinutes % 60,
            seconds: newSeconds % 60,
          };
        });
      }, 10);
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };
  const handleStop = () => {
    setIsActive(false);

    const totalMinutes = time.hours * 60 + time.minutes + time.seconds / 60;
    const totalPrice =
      (totalMinutes / 60) * (customRate > 0 ? customRate : rate);
    setTotal(totalPrice.toFixed(2));
  };
  const handleReset = () => {
    setIsActive(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setTotal(0);
  };

  const customRateHandler = (event) => {
    event.preventDefault();
    setCustomRate(event.target.value);
  };

  const setNewRateHandler = (event) => {
    event.preventDefault();
    handleStop();
  };

  return (
    <div className={classes.timerContainer}>
      <div className={`${classes.titleContainer}`}>{title}</div>
      <div className={classes.timerAndButtons}>
        <h2>
          {String(time.hours).padStart(2, "0")}:
          {String(time.minutes).padStart(2, "0")}:
          {String(time.seconds).padStart(2, "0")}
        </h2>
        <div className={classes.buttonContainer}>
          <Button className={classes.buttonStart} onClick={handleStart}>
            Start
          </Button>
          <Button className={classes.buttonStop} onClick={handleStop}>
            Stop
          </Button>
          <Button className={classes.buttonReset} onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
      <div className={classes.total}>Total: {total}</div>
      <div>^</div>
      <form onSubmit={(e) => setNewRateHandler(e)}>
        <label>Custom rate</label>
        <input
          className={classes.inputBox}
          onChange={(e) => customRateHandler(e)}
          value={customRate}
          type="text"
        />
      </form>
    </div>
  );
};

export default Timer;

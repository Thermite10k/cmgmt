import React, { useState, useEffect, useRef } from "react";
import classes from "./Timer.module.css";
import Button from "../UI/Button/Button";
import buttonClasses from "./TimerButton.module.css";
const Timer = ({ rate, title }) => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const [total, setTotal] = useState(0);
  const [customRate, setCustomRate] = useState(rate);
  const [extra, setExtra] = useState(0);
  const [totalExtra, setTotalExtra] = useState(0);
  const [timeTotal, setTimeTotal] = useState(0);

  const intervalRef = useRef(null);
  const extraRef = useRef(null);

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
      }, 1);
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
  const addCommaSeparator = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const handleStart = () => {
    setIsActive(true);
  };
  const handleStop = () => {
    setIsActive(false);

    const totalMinutes = time.hours * 60 + time.minutes + time.seconds / 60;
    const totalTimePrice =
      (totalMinutes / 60) * (customRate > 0 ? customRate : rate);
    setTimeTotal(+totalTimePrice.toFixed());
  };
  const handleReset = () => {
    setIsActive(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setTotal(0);
    setTotalExtra(0);
    setExtra(0);
    setTimeTotal(0);
    extraRef.current.value = 0;
  };

  const customRateHandler = (event) => {
    event.preventDefault();
    setCustomRate(+event.target.value);
  };

  const setNewRateHandler = (event) => {
    event.preventDefault();
    handleStop();
  };

  const setExtraChangeHandle = (event) => {
    event.preventDefault();
    setExtra(+event.target.value);
  };

  const addExtraHandler = (event) => {
    event.preventDefault();
    setTotalExtra((prevVal) => +prevVal + +extra);
  };
  const getTotal = () => {
    setTotal(+timeTotal + +totalExtra);
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
          <Button className={buttonClasses.buttonStart} onClick={handleStart}>
            Start
          </Button>
          <Button className={buttonClasses.buttonStop} onClick={handleStop}>
            Stop
          </Button>
          <Button className={buttonClasses.buttonReset} onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
      <div className={classes.formContainer}>
        <form onSubmit={(e) => setNewRateHandler(e)}>
          <label>Custom rate:</label>
          <input
            className={classes.inputBox}
            onChange={(e) => customRateHandler(e)}
            value={customRate}
            type="text"
          />
        </form>
        <form onSubmit={(e) => addExtraHandler(e)}>
          <label>Extras: {totalExtra}</label>
          <input
            className={classes.inputBox}
            ref={extraRef}
            onChange={(e) => setExtraChangeHandle(e)}
          />
        </form>
      </div>
      <Button className={classes.totalButton} onClick={getTotal}>
        Calculate Total
      </Button>
      <div className={classes.subTotals}>
        <div>Time: {addCommaSeparator(timeTotal)}</div>
        <div>Extra fees: {addCommaSeparator(totalExtra)}</div>
      </div>
      <div className={classes.total}>Total: {addCommaSeparator(total)}</div>
    </div>
  );
};

export default Timer;

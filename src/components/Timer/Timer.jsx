import React, { useState, useEffect, useRef } from "react";

const Timer = ({ rate, onPriceChange }) => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isActive, setIsActive] = useState(false);

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
      }, 1000);
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
    const totalPrice = (totalMinutes / 60) * rate;
    onPriceChange(totalPrice.toFixed(2));
  };
  const handleReset = () => {
    setIsActive(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    onPriceChange(0);
  };

  return (
    <div>
      <div>
        {String(time.hours).padStart(2, "0")}:
        {String(time.minutes).padStart(2, "0")}:
        {String(time.seconds).padStart(2, "0")}
      </div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
      <div>Hourly Rate: {rate}</div>
    </div>
  );
};

export default Timer;

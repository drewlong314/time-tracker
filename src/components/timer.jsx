import "./Timer.css";
import { useRef, useState } from "react";

function Timer() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [storedTime, setStoredTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  let timePassed = 0;
  if (startTime != null && now != null && storedTime === 0) {
    timePassed = ((now - startTime) / 1000).toFixed(2);
  } else if (startTime != null && now != null) {
    timePassed = ((now - startTime) / 1000 + storedTime).toFixed(2);
  } else timePassed = storedTime.toFixed(2);

  const formatNumber = (number) => {
    return number.toString().padStart(2, "0");
  };

  const formatTime = (timePassed) => {
    const convertedTime = new Date(timePassed * 1000);
    const hours = convertedTime.getUTCHours();
    const minutes = convertedTime.getUTCMinutes();
    const seconds = convertedTime.getUTCSeconds();
    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
      seconds
    )}`;
  };

  const startTimer = () => {
    setStartTime(Date.now());
    setNow(Date.now());

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
    setIsRunning(true);
  };

  const clearTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setStartTime(null);
    setNow(null);
    setIsRunning(false);
  };

  const stopTimer = () => {
    if (!storedTime) setStoredTime((now - startTime) / 1000);
    else setStoredTime((now - startTime) / 1000 + storedTime);
    clearTimer();
  };

  const resetTimer = () => {
    clearTimer();
    setStoredTime(0);
  };

  return (
    <div className="timer-outer-div">
      <div className="timer-time">{formatTime(timePassed)}</div>
      <div className="timer-button-div">
        {!isRunning ? (
          <button onClick={startTimer}>start</button>
        ) : (
          <button onClick={stopTimer}>stop</button>
        )}
        <button onClick={resetTimer} className="timer-button">reset</button>
      </div>
    </div>
  );
}

export default Timer;

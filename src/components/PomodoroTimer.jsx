import React, { useState, useEffect, useRef } from "react";
import "./PomodoroTimer.css"; // For styling

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60); // Default 25 min
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTime, setSelectedTime] = useState(25 * 60);
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio("/music.mp3"));

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            alert("🎉 Yeaay! It's time to take a break! ☕");
            return selectedTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, selectedTime]);

  const startTimer = () => {
    setIsRunning(true);
    audioRef.current.play();
    audioRef.current.loop = true; 
  };

  const pauseTimer = () => {
    setIsRunning(false);
    audioRef.current.pause();
  };

  const resetTimer = () => {
    setTime(selectedTime);
    setIsRunning(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="pomodoro-container">
      <h1>🍵 Cozy Pomodoro Timer</h1>
      <div className="timer">{formatTime(time)}</div>

      <div className="controls">
        <button className="btn start" onClick={startTimer} disabled={isRunning}>
          ▶ Start
        </button>
        <button className="btn pause" onClick={pauseTimer}>
          ⏸ Pause
        </button>
        <button className="btn reset" onClick={resetTimer}>
          🔄 Reset
        </button>
      </div>

      <div className="time-options">
        {[5, 10, 15, 25].map((min) => (
          <button
            key={min}
            className={`time-btn ${selectedTime === min * 60 ? "active" : ""}`}
            onClick={() => {
              setSelectedTime(min * 60);
              setTime(min * 60);
              resetTimer();
            }}
          >
            {min} min
          </button>
        ))}
      </div>
    </div>
  );
};

export default PomodoroTimer;

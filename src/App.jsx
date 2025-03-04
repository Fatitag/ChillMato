import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Timer from "./components/Timer";
import Controls from "./components/Controls";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";
import calmMusic from "./assets/music.mp3"; // Ensure you have this file
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isRunning, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [selectedTime, setSelectedTime] = useState(25);
  const [showMessage, setShowMessage] = useState(false);
  const audioRef = useRef(new Audio(calmMusic));

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      audioRef.current.play();
    } else {
      clearInterval(timer);
      audioRef.current.pause();
    }

    if (timeLeft === 0) {
      setShowMessage(true);
      setRunning(false);
      audioRef.current.pause();
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
  }, []);

  const resetTimer = () => {
    setRunning(false);
    setTimeLeft(selectedTime * 60);
    setShowMessage(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Restart music from beginning
  };

  const handleTimeChange = (minutes) => {
    setSelectedTime(minutes);
    setTimeLeft(minutes * 60);
    setRunning(false);
    setShowMessage(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div className="app-container">
      <div className="timer-box">
        <em><h2 className="mb-4">⏳ ChillMato</h2></em>
        <div className="time-buttons">
          {[5, 10, 15, 25].map((min) => (
            <button
              key={min}
              className="btn btn-outline-light mx-2"
              onClick={() => handleTimeChange(min)}
            >
              {min} min
            </button>
          ))}
        </div>
        {showMessage ? (
          <h3 className="mt-4">🎉 Yay! It’s time to take a break! ☕</h3>
        ) : (
          <Timer timeLeft={timeLeft} isRunning={isRunning} />
        )}
        <Controls isRunning={isRunning} setRunning={setRunning} resetTimer={resetTimer} />
        <ThemeToggle />
      </div>
    </div>
  );
}

export default App;


const Timer = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <h1 className="timer-display">
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </h1>
  );
};

export default Timer;


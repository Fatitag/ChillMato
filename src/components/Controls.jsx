
const Controls = ({ isRunning, setRunning, resetTimer }) => {
  return (
    <div className="mt-3">
      <button className="btn btn-primary mx-2" onClick={() => setRunning(!isRunning)}>
        {isRunning ? "Pause ⏸️" : "Start ▶️"}
      </button>
      <button className="btn btn-danger mx-2" onClick={resetTimer}>
        Reset 🔄
      </button>
    </div>
  );
};

export default Controls;

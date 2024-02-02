import { useEffect, useState } from "react";

function App() {
  const [secs, setSecs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setSecs((prevTime) => {
          return ++prevTime;
        });
      }, 1000);
    }

    // component will unmount....this syntax will tc of component removal from DOM
    // & clean up of interval whenever the var in dependency arr changes

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecs(0);
  };

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let secs = time % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>{`Time: ${formatTime(secs)}`}</p>
      <button onClick={handleToggle}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;

import ProgressBar from "./Progress.jsx";
import { useState, useRef } from 'react'

export default function ProgressContainer() {
  const [progress, setProgress] = useState(10);
  const intervalRef = useRef(null);

  const clearExistingInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  const startProgress = (percent = 10, num = 1) => {
    clearExistingInterval();

    let newProgress = percent;
    intervalRef.current = setInterval(() => {
      newProgress += num;
      setProgress(Math.max(0, Math.min(100, newProgress)));

      if (newProgress >= 100 || newProgress <= 0) {
        clearExistingInterval();
        setTimeout(() => startProgress(newProgress, -num), 1000);
      }
    }, 100);
  };

  return (
    <div className="progress-container" onMouseEnter={() => startProgress()}>
      <ProgressBar progress={progress} />
    </div>
  );
}

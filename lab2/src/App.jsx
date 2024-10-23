
import './App.css'
import Button from './components/button/component.jsx';
import useCountdown from './hooks/useCountdown.js';

function App() {
  const [timeLeft, { start, stop }] = useCountdown("2024-10-24T12:30:00", "event");

  return (
    <div>
      <div>
        <p>Time Left: {timeLeft}</p>
      </div>
      <div>
        <Button text="Start" onClick={start} color="green" ></Button>
        <Button text="Stop" onClick={stop} color="red" ></Button>
      </div>
    </div>
  );
}


export default App

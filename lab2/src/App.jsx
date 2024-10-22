
import './App.css'
import useCountdown from './useCountdown.js';

function App() {
  const timeLeft = useCountdown(10)
  return (
    <div>
      <div>
        <p>Hours: {timeLeft}</p>
      </div>

    </div>
  )
}

export default App

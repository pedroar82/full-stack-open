import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    setBad(bad + 1);
  }

  const calcAverage = () => {
    let all = good + neutral + bad;
    return (all > 0) ? ((good - bad) / all) : 0;
  }

  const calcPositive = () => {
    let all = good + neutral + bad;
    return (all > 0) ? (good / all) * 100 : 0;
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h1>statistics</h1>
      <p>good {good} <br />
        neutral {neutral} <br />
        bad {bad}<br />
        all {good + neutral + bad} <br />
        average {calcAverage()} <br />
        positive {calcPositive()}% </p>
    </div>
  )
}

export default App

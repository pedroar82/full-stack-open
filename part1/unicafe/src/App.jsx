import { useState } from 'react'


const Statistics = (props) => {
  let good = props.good;
  let neutral = props.neutral;
  let bad = props.bad;
  let all = good + neutral + bad;

  const calcAverage = () => {
    return (all > 0) ? ((good - bad) / all) : 0;
  }

  const calcPositive = () => {
    return (all > 0) ? (good / all) * 100 : 0;
  }

  return (
    <div>
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

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

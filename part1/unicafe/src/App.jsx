import { useState } from 'react'

const StatisticLine = (props) => {
  return (

    <tr><td>{props.text} </td><td>{props.value}</td> </tr>

  )
}

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

  if (all > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine text="average" value={calcAverage()} />
          <StatisticLine text="positive" value={calcPositive() + "%"} />
        </table>
      </div>
    )
  }
  return (
    <table>
      <tr><td><h1>No feedback given</h1></td></tr>
    </table>
  )

}

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

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
      <table >
        <tr><td><Button onClick={handleGoodClick} text="good" /></td>
          <td><Button onClick={handleNeutralClick} text="neutral" /></td>
          <td><Button onClick={handleBadClick} text="bad" /></td>
        </tr>
      </table>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

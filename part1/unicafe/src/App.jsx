import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  const totalFeedback = good + neutral + bad;

  const increaseGood = () => {
    setGood(good + 1)
    calculateAverage()
    calculatePosPercentage()
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    calculateAverage()
    calculatePosPercentage()
  }
  const increaseBad = () => {
    setBad(bad + 1)
    calculateAverage()
    calculatePosPercentage()
  }
  const calculateAverage = () => {
    const averageScore = (good * 1 + neutral * 0 + bad * (-1)) / totalFeedback;
    setAverage(averageScore);
  }
  const calculatePosPercentage = () => setPositive((good / totalFeedback) * 100)
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} text="good" />
      <Button onClick={increaseNeutral} text="neutral" />
      <Button onClick={increaseBad} text="bad" />
      <h1>statistics</h1>
      {totalFeedback > 0 ? (<Statistics good={good} neutral={neutral} bad={bad} total={totalFeedback} average={average} positive={positive} />) : (<p>No feedback given</p>)}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <div>
      <div>good {good} </div>
      <div>neutral {neutral} </div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {average} </div>
      <div>positive {positive} </div>
    </div>
  )
}


export default App
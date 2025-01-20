import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const totalFeedback = good + neutral + bad

  const increaseGood = () => {
    const newGood = good + 1
    setGood(newGood)
    calculateAverage(newGood, neutral, bad)
    calculatePosPercentage(newGood, neutral, bad)
  }
  const increaseNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    calculateAverage(good, newNeutral, bad)
    calculatePosPercentage(good, newNeutral, bad)
  }
  const increaseBad = () => {
    const newBad = bad + 1
    setBad(newBad)
    calculateAverage(good, neutral, newBad)
    calculatePosPercentage(good, neutral, newBad)
  }
  const calculateAverage = (good, neutral, bad) => {
    const totalFeedback = good + neutral + bad
    const averageScore = good - bad
    setAverage(totalFeedback === 0 ? 0 : averageScore / totalFeedback)
  }
  const calculatePosPercentage = (good, neutral, bad) => {
    const totalFeedback = good + neutral + bad
    setPositive(totalFeedback === 0 ? 0 : (good / totalFeedback) * 100)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} text="good" />
      <Button onClick={increaseNeutral} text="neutral" />
      <Button onClick={increaseBad} text="bad" />
      <h1>statistics</h1>
      {totalFeedback > 0 ?
        (<Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={totalFeedback}
          average={average}
          positive={positive}
        />) : (<p>No feedback given</p>)}
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Good</td>
            <td>{props.good}</td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td>{props.neutral}</td>
          </tr>
          <tr>
            <td>Bad</td>
            <td>{props.bad}</td>
          </tr>
          <tr>
            <td>All</td>
            <td>{props.total}</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>{props.average}</td>
          </tr>
          <tr>
            <td>Positive</td>
            <td>{props.positive} %</td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <div>{props.text} {props.value} </div>
  )
}


export default App;
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React', exercises: 10
    },
    {
      name: 'Using props to pass data', exercises: 7
    },
    {
      name: 'State of a component', exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content part1={parts[0]} part2={parts[1]} part3={parts[2]} />
      <Total parts={parts} />
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Content = ({ part1, part2, part3 }) => {
  return (
    <div>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} has {part.exercises} exercises</p>
  )
}

const Total = ({ parts }) => {
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return (
    <p>There is a total number of {total} exercises</p>
  )
}

export default App

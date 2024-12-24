const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
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

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <p key={index}> 
        {part.name} {part.exercises} 
        </p>
      ))}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return (
    <p>There is a total number of {total} exercises</p>
  )
}

export default App
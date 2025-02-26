const Courses = ({ courses }) => {
    return (
      <div>
        <h1>Web development curriculum</h1>
        {courses.map(course => (
          <Course key={course.id} course={course} />
        ))}
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  };
  
  const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    );
  };
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    );
  };
  
  const Part = ({ part }) => {
    return (
      <p>{part.name} has {part.exercises}</p>
    );
  };
  
  const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
      <p><strong> total of {total} exercises</strong></p>
    );
  };

  export default Courses
const Header = ({ course }) => {
    return <h2>{course.name}</h2>
  }
  
const Total = ({ parts }) => 
    <h3>Number of exercises {parts.map((e) => e.exercises).reduce((a, b) => a + b, 0)}</h3>

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
return (
    <div>
        {parts.map((e) => <Part name={e.name} exercises={e.exercises}/>)}
    </div>
)
}

const Course = ({ course }) => {

    return (
    <div>
        <Header course={course}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
  </div>
  )
}

export default Course;
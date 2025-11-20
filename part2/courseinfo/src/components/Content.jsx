import Part from './Part'

const Content = (props) => {
  return (
    <div>
      {props.parts.map(note =>
        <Part name={note.name} exercise={note.exercises} key={note.id} />
      )}
      <p><b>total of {props.parts.reduce((ac, course) =>
        ac + course.exercises, 0)} exercises</b></p>
    </div>
  )
}

export default Content
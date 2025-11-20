import Part from './Part'

const Content = (props) => {
  return (
    <div>
      {props.parts.map(note =>
        <Part name={note.name} exercise={note.exercises} key={note.id} />
      )}
    </div>
  )
}

export default Content
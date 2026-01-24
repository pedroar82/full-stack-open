import { CoursePart } from '../types'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  coursePart : CoursePart;
}

const Part = (props: PartProps) => {
  const part = props.coursePart
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <div>
            <h2> {part.name} </h2>
          </div>
          <p>{part.description}</p>
          <p>{part.kind}</p>
          <p>{part.exerciseCount}</p>
        </div>
      );
    case 'group':
      return (
        <div>
          <div>
            <h2> {part.name} </h2>
          </div>
          <p>{part.groupProjectCount}</p>
          <p>{part.kind}</p>
          <p>{part.exerciseCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <div>
            <h2> {part.name} </h2>
         </div>
          <p>{part.description}</p>
          <p>{part.backgroundMaterial}</p>
          <p>{part.kind}</p>
          <p>{part.exerciseCount}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <div>
            <h2> {part.name} </h2>
          </div>
          <p>required skills: {part.requirements.join(", ")}</p>
          <p>{part.description}</p>
          <p>{part.kind}</p>
          <p>{part.exerciseCount}</p>
        </div>
      ); 
    default:
      return assertNever(part)
  }  
};

export default Part;
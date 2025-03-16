import { CoursePart } from "../types";

interface CoursePartProps {
  coursePart: CoursePart;
}

const Part = (props: CoursePartProps) => {
  const part = props.coursePart
  switch (part.kind) {
  case 'basic':
    return (
      <p>
        <b>{part.name} {part.exerciseCount}</b><br/>
        <i>{part.description}</i>
      </p>
    );
  case 'background':
    return (
      <p>
        <b>{part.name} {part.exerciseCount}</b><br/>
        <i>{part.description}</i><br/>
        bg material: {part.backgroundMaterial}
      </p>
    );
  case 'group':
    return (
      <p>
        <b>{part.name} {part.exerciseCount}</b><br/>
        projects exercises{part.groupProjectCount}
      </p>
    );
  case 'special':
    return (
      <p>
        <b>{part.name} {part.exerciseCount}</b><br/>
        <i>{part.description}</i><br/>
        required skills:{part.requirements.map(req => ' ' + req)}
      </p>
    );
  default: assertNever(part);
  }
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

export default Part;
import { DiaryEntry } from "../types";


interface EntryProps {
  entry: DiaryEntry; 
}
const Entry = (props: EntryProps) => {
  const entry = props.entry;
  return (
    <div>
      <h3>{entry.date}</h3>
      <div>visibility: {entry.visibility}</div>
      <div>weather: {entry.weather}</div>
      { entry.comment && <div>comment: {entry.comment}</div> }
    </div>
  );
};

export default Entry;
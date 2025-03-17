import { DiaryEntry } from "../types"
import Entry from "./Entry";

interface EntriesProps {
  entries: DiaryEntry[];
}
const Entries = (props: EntriesProps) => {
  const entries = props.entries;
  return (
    <div>
      <h2>Diary entries</h2>
      {entries.map(entry => <Entry key={entry.id} entry={entry} />)}
    </div>
  );
};

export default Entries;
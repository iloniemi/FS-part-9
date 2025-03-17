import { useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry} from "./types";
import axios from "axios";
import Entries from "./components/Entries";
import EntryForm from "./components/EntryForm";



const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<string|null>(null);

  const notify = (text: string) => {
    setNotification(text);
    setTimeout(() => setNotification(null), 5000);
  };


  useEffect(() => {
    axios.get<DiaryEntry[]>('/api/diaries').then(response => {
      setEntries(response.data);
    });
  },[]);

  const handleSubmit = async (newEntry: NewDiaryEntry) => {
    try {
      const response = await axios.post<DiaryEntry>('/api/diaries', newEntry)
      setEntries(entries.concat(response.data));
    } catch (error: unknown) {
      console.log('POST failed');
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          notify(error.response.data);
        }
        console.log('error:', error);
      } else {
        console.log('Non-axios error', error); 
      }
    }
    
  };


  return (
    <div>
      {notification && <div style={{ color: 'red' }}>{notification}</div>}
      <EntryForm handleSubmit={handleSubmit}/>
      <Entries entries={entries} />
    </div>
  )
}

export default App

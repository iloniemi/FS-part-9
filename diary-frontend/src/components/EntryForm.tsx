import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

interface EntryFormProps {
  handleSubmit: (newEntry: NewDiaryEntry) => void;
}

const EntryForm = (props: EntryFormProps) => {
  const [date, setDate] = useState(new Date().toISOString().substring(0,10));
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [weather, setWeather] = useState<Weather>(Weather.Cloudy);
  const [comment, setComment] = useState('');
  
  
  const onSubmit= ( event:React.SyntheticEvent ) => {
    event.preventDefault();
    const entryToAdd = {
      date,
      visibility,
      weather,
      comment
    };
    props.handleSubmit(entryToAdd);
    setComment('');
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Add new entry</h2>
      <div>
        date<input type='date' value={date} onChange={(event) => setDate(event.target.value)} />
      </div>
      <div><span>weather </span>
        { Object.values(Weather).map(weatherValue => (
          <span key={weatherValue}>
            <span> {weatherValue}</span><input type="radio" name="weather" checked={weatherValue === weather} onChange={() => setWeather(weatherValue)} />
          </span>
        ))}
      </div>
      <div><span>visibility </span>
        { Object.values(Visibility).map(visibilityValue => (
          <span key={visibilityValue}>
            <span> {visibilityValue}</span><input type="radio" name="visibility" checked={visibilityValue === visibility} onChange={() => setVisibility(visibilityValue)} />
          </span>
        ))}
      </div>
      <div>
        comment<input value={comment} onChange={event => setComment(event.target.value)}/>
      </div>
      <button>add</button>
    </form>
  );
};

export default EntryForm;


/*

      */
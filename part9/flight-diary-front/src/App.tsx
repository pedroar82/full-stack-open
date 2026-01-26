import {DiaryEntry} from './types'
import { useState, useEffect } from "react";
import axios from 'axios';

const App = () => {
  const url = 'http://localhost:3000/api/diaries';
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: '1',
      date: '2026/01/26',
      visibility: 'best ever',
      weather: 'sunny',
      comment: 'nice',
    },
  ]);

  useEffect(() => {
    axios.get<DiaryEntry[]>(url).then((response) => {
      setEntries(response.data);
    })
  }, []);

  const [newDate, setDate] = useState('');
  const [newVisibility, setVisibility] = useState('');
  const [newWeather, setWeather] = useState('');
  const [newComment, setComment] = useState('');

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newEntry = {
      date: newDate,
      visibility: newVisibility,
      weather: newWeather,
      comment: newComment,
    }

    axios.post<DiaryEntry>(url, newEntry)
      .then(response => {
        setEntries(entries.concat(response.data))
      })

    setVisibility('');
    setWeather('');
    setComment('');
    setDate('');
  }

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={addEntry}>
        <div>
          date
          <input
            value={newDate}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          <input
            value={newVisibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          weather
          <input
            value={newWeather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          comment
          <input
            value={newComment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h1>Diary entries</h1>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h2>{entry.date}</h2>
          <p>visibility: {entry.visibility}</p>
          <p>weather: {entry.weather}</p>
          <p>comment: {entry.comment}</p>
        </div>
      ))}
    </div>
  )
}

export default App

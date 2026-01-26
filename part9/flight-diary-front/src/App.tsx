import {DiaryEntry} from './types'
import { useState, useEffect } from "react";
import axios from 'axios';

const App = () => {
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
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then((response) => {
      setEntries(response.data);
    })
  }, [])

  return (
    <div>

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

import {DiaryEntry, Visibility, Weather} from './types'
import { useState, useEffect } from "react";
import axios, { AxiosError } from 'axios';

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
  const [newVisibility, setVisibility] = useState<Visibility | null>(null);
  const [newWeather, setWeather] = useState<Weather | null>(null);
  const [newComment, setComment] = useState('');
  const [error, setError] = useState<AxiosError | null>(null);

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newEntry = {
      date: newDate,
      visibility: newVisibility,
      weather: newWeather,
      comment: newComment,
    }

    try {
      const response = await axios.post<DiaryEntry>(url, newEntry);
      setEntries(entries.concat(response.data));
    } catch (error) {
       if (axios.isAxiosError(error)) {
        setError(error)
      } else {
        console.error(error)
      }
    } finally {
      setVisibility(null);
      setWeather(null);
      setComment('');
      setDate('');
      setError(null);
    }
  }

  return (
    <div>
      <h1>Add new entry</h1>
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
      <form onSubmit={addEntry}>
        <div>
          date
          <input
            type="date"
            value={newDate}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility great
          <input
            type="radio"
            name="great"
            onChange={() => setVisibility(Visibility.Great)}
          />
          good
            <input
            type="radio"
            name="good"
            onChange={() => setVisibility(Visibility.Good)}
          />
          ok
            <input
            type="radio"
            name="ok"
            onChange={() => setVisibility(Visibility.Ok)}
          />
          poor
            <input
            type="radio"
            name="poor"
            onChange={() => setVisibility(Visibility.Poor)}
          />
        </div>
        <div>
          weather sunny
          <input
            type="radio"
            name="sunny"
            onChange={() => setWeather(Weather.Sunny)}
          />
          rainy
            <input
            type="radio"
            name="rainy"
            onChange={() => setWeather(Weather.Rainy)}
          />
          cloudy
            <input
            type="radio"
            name="cloudy"
            onChange={() => setWeather(Weather.Cloudy)}
          />
          stormy
            <input
            type="radio"
            name="stormy"
            onChange={() => setWeather(Weather.Stormy)}
          />
          windy
            <input
            type="radio"
            name="windy"
            onChange={() => setWeather(Weather.Windy)}
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

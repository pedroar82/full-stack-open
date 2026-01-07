import { useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client/react'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'

const Books = () => {
  const [genre, setGenre] = useState('')

  //to get all genres, get all books
  const result = useQuery(ALL_BOOKS) 
  
  if (result.loading) return <div>loading...</div>
  
  const allBooksData = result.data?.allBooks || []

  const books = genre 
    ? allBooksData.filter(b => b.genres.includes(genre))
    : allBooksData
  
  const genres = [...new Set(
    allBooksData.reduce((genres, b) => genres.concat(b.genres), [])
  )]

  const handleSetGenre = (selectedGenre) => {
    setGenre(selectedGenre)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g, index) => (
        <button key={index} onClick={() => handleSetGenre(g)}>
          {g}
        </button>
      ))}
      <button key={genres.length + 1} onClick={() => handleSetGenre('')}>
        all
      </button>
    </div>
  )
}

export default Books

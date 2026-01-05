import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('all')

  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = [
    ...new Set(
      result.data.allBooks.reduce((genres, b) => genres.concat(b.genres), [])
    ),
  ]

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
          {books
            .filter((b) => (genre === 'all' ? true : b.genres.includes(genre)))
            .map((a) => (
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
      <button key={genres.length + 1} onClick={() => handleSetGenre('all')}>
        all
      </button>
    </div>
  )
}

export default Books

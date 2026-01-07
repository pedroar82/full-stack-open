import { useState, useEffect } from 'react'
import { useApolloClient, useQuery, useMutation, useSubscription } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Notify from './components/Notify'
import { BOOK_ADDED, ALL_BOOKS } from './queries'
import Recommendations from './components/Recommendations'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, (data) => {
    //sometimes is null
    if (!data?.allBooks) {
      return data 
    }
    return {
      allBooks: uniqByName(data.allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [userFavGenre, setUserFavGenre] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  //avoid the need of insert credentials after every refresh
  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })

  const padding = {
    paddingRight: 5,
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const onLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">
            authors
          </Link>
          <Link style={padding} to="/books">
            books
          </Link>
          <Link style={padding} to="/recommendations">
            recommendations
          </Link>
          {token && (
            <Link style={padding} to="/add">
              add
            </Link>
          )}
          {!token && (
            <Link style={padding} to="/login">
              login
            </Link>
          )}
          {token && (
            <Link style={padding} to="/logout">
              logout
            </Link>
          )}
        </div>
        <Notify errorMessage={errorMessage} />
        <Routes>
          <Route path="/add" element={<NewBook show={'add'} />} />
          <Route path="/books" element={<Books show={'books'} />} />
          <Route path="/" element={<Authors show={'authors'} />} />
          <Route
            path="/recommendations"
            element={<Recommendations userFavGenre={userFavGenre} />}
          />
          {!token && (
            <Route
              path="/login"
              element={
                <Login
                  setToken={setToken}
                  setError={notify}
                  setFavGenre={setUserFavGenre}
                />
              }
            />
          )}
          {token && (
            <Route
              path="/logout"
              element={<button onClick={onLogout}>logout</button>}
            />
          )}
        </Routes>
      </Router>
    </div>
  )
}

export default App

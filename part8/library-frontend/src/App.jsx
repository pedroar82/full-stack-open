import { useState } from 'react'
import { useApolloClient } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Notify from './components/Notify'
import Recommendations from './components/Recommendations'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'

const App = () => {
  const [token, setToken] = useState(null)
  const [userFavGenre, setUserFavGenre] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

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

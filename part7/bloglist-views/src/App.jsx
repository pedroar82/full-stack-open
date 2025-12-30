import { useEffect, useContext } from 'react'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import './index.css'
import { useQuery } from '@tanstack/react-query'
import { useNotification } from './contexts/NotificationContext'
import LoginContext from './contexts/LoginContext'
import blogService from './services/blogs'
import userService from './services/users'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
     <em>{user} logged in</em>

    </div>
  )
}

const App = () => {
  const notify = useNotification()
  const { user, loginDispatch } = useContext(LoginContext)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      loginDispatch({ type: 'SETUSER', payload: user })
    }
  }, [])

  const resultUsers = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 1,
  })

  const users = resultUsers.data

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })

  const blogs = result.data

  useEffect(() => {
    if (result.error) {
      notify(
        `blogs service not available due to problems in server: ${result.error.message}`,
        'error'
      )
    }
  }, [result.error, notify])

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.error) {
    return <div>blogs service not available</div>
  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    loginDispatch({ type: 'LOGOUT' })
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <Login />
      </div>
    )
  }
  return (
    <Router>
      <div className="divNavbar">
        <Link className="linkPadd" to="/">
          blogs
        </Link>
        <Link className="linkPadd" to="/users">
          users
        </Link>
        <em>
          {user.name} logged in <button onClick={logout}>logout</button>
        </em>
      </div>
      <Notification />
      <h2>blogs</h2>
      <Routes>
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User users={users} />} />
        <Route path="/" element={<Blogs blogs={blogs} user={user} />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Router>
  )
}

export default App
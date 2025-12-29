import { useEffect, useContext } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './index.css'
import { useQuery } from '@tanstack/react-query'
import { useNotification } from './contexts/NotificationContext'
import LoginContext from './contexts/LoginContext'
import blogService from './services/blogs'

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

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1
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
    return(
      <div>
        <h2>Log in to application</h2>
        <Notification/>
        <Login/>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>
      <Togglable buttonLabel="new blog">
        <BlogForm user={user} />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          userId={user.id} />
      )}
    </div>
  )
}

export default App
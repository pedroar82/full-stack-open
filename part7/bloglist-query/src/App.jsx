import { useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './index.css'
import { loginUser, initUser, logoutUser } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from './contexts/NotificationContext'

import { getAll } from './services/blogs'

const App = () => {

  const notify = useNotification()
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    retry: 1
  })

  const blogs = result.data
  const user = useSelector(state => state.login)

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

  const handleLogin = async  (username, password) => {
    try {
      await dispatch(loginUser(username, password))
    } catch (error) {
      notify(`wrong username or password: ${error.message}`, 'error')
    }
  }

  const logout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  if (user === null) {
    return(
      <div>
        <h2>Log in to application</h2>
        <Notification/>
        <Login
          handleLogin={handleLogin}/>
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
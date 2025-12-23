import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './index.css'
import { setNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  appendBlog,
  sortedBlogs,
  likeBlog,
  deleteBlog
} from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(sortedBlogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      dispatch(setNotification('wrong username or password','error'))
    }
  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog = (newBlog) => {
    const addedBlog = { ...newBlog, user: user.id }
    dispatch(appendBlog(addedBlog))
  }

  const updateBlog = (updatedBlogId, likes) => {
    const blog = blogs.find((b) => b.id === updatedBlogId)
    //it only updates the blog likes, the user remains the same that has created~the blog
    const updatedBlog = { ...blog, likes: likes }
    dispatch(likeBlog(updatedBlog))
  }

  const deleteBlogHandler = async (deletedBlogId) => {
    dispatch(deleteBlog(deletedBlogId))
  }

  if (user === null) {
    return(
      <div>
        <h2>Log in to application</h2>
        <Notification/>
        <Login
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUserChange={e => setUsername(e.target.value)}
          handlePassChange={e => setPassword(e.target.value)} />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>
      <Togglable buttonLabel="new blog">
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlogHandler}
          userId={user.id} />
      )}
    </div>
  )
}

export default App
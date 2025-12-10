import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState({ message: null, class: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setMessage = (message, mclass) => {
    console.log('aqui', message, mclass)
    setErrorMessage({ message: message, class: mclass })
    setTimeout(() => {
      setErrorMessage({ message: null, class: null })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('try')
    } catch {
      console.log('catch')
      setMessage('wrong username or password','error')
    }
  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try{
      const newBlog = { title, author, url }
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${response.title} by ${response.author} added`, 'success' )
    } catch (error) {
      setMessage(`error adding new blog: ${error.message}`, 'error')
    }
  }

  if (user === null) {
    return(
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage.message} className={errorMessage.class} />
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
      <Notification message={errorMessage.message} className={errorMessage.class} />
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>
      <BlogForm
        addBlog={addBlog}
        title={title} author={author}
        url={url}
        handleTitleChange={e => setTitle(e.target.value)}
        handleAuthorChange={e => setAuthor(e.target.value)}
        handleUrlChange={e => setUrl(e.target.value)} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
import { useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './index.css'
import {
  initializeBlogs,
  appendBlog,
  sortedBlogs,
  likeBlog,
  deleteBlog
} from './reducers/blogReducer'
import { loginUser, initUser, logoutUser } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(sortedBlogs)
  const user = useSelector(state => state.login)

  const handleLogin = (username, password) => {
    dispatch(loginUser(username, password))
  }

  const logout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
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
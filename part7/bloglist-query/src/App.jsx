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


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { useNotification } from './contexts/NotificationContext'

const App = () => {

  const notify = useNotification()

  const queryClient = useQueryClient()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(sortedBlogs)
  const user = useSelector(state => state.login)

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

  const createBlog = async (newBlog) => {
    try {
      const addedBlog = { ...newBlog, user: user.id }
      dispatch(appendBlog(addedBlog))
      notify(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        'success'
      )
    } catch (error) {
      notify(`error adding new blog: ${error.message}`, 'error')
    }
  }

  const updateBlog = async (updatedBlogId, likes) => {
    try {
      const blog = blogs.find((b) => b.id === updatedBlogId)
      //it only updates the blog likes, the user remains the same that has created~the blog
      const updatedBlog = { ...blog, likes: likes }
      dispatch(likeBlog(updatedBlog))
      notify(
        `Liked blog ${updatedBlog.title} by ${updatedBlog.author}`,
        'success'
      )
    } catch (error) {
      notify(`error liking blog: ${error.message}`, 'error')
    }
  }

  const deleteBlogHandler = async (deletedBlogId) => {
    try {
      dispatch(deleteBlog(deletedBlogId))
      notify('Deleted blog', 'success')
    } catch (error) {
      notify(`error deleting blog: ${error.message}`, 'error')
    }
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
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    updateBlog (state, action) {
      const updatedBlog = action.payload
      return state.map(blog => (blog.id !== updatedBlog.id ? blog : updatedBlog))
    },
    createBlog (state, action) {
      state.push(action.payload)
    },
    deleteBlogSlice (state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
    setBlogs (state, action) {
      return action.payload
    }
  }
})

const { createBlog, setBlogs, updateBlog, deleteBlogSlice } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }}

export const appendBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(createBlog(newBlog))
  }
}

export const likeBlog = (updBlog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(updBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = (deletedBlogId) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.deleteBlogFromBD(deletedBlogId)
    dispatch(deleteBlogSlice(deletedBlogId))
  }
}

export const sortedBlogs = (state) =>
  [...state.blogs].sort((a, b) => b.likes - a.likes)


export default blogSlice.reducer
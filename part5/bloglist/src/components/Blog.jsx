import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [showDetail, setShowDetail] = useState(false)

  const showWhenVisible = { display: showDetail ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleView = event => {
    setShowDetail(!showDetail)
  }

  const likeBlog = event => {
    updateBlog(blog.id, blog.likes+1)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleView} >{ showDetail ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={likeBlog}>like</button></p>
        <p>{blog.user ? blog.user.name : ''}</p>
      </div>
    </div>
  )
}

export default Blog
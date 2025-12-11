import { useState } from 'react'

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleView} >{ showDetail ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blog.likes} <button>like</button></p>
      </div>
    </div>
  )
}

export default Blog
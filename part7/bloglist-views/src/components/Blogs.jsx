import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = ({ blogs, user }) => {
  const blogStyle = {
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!blogs) {
    return null
  }
  return (
    <div>
      <Togglable buttonLabel="create new">
        <BlogForm user={user} />
      </Togglable>
      {blogs.map((blog) => (
        <div
          className="blogStyle"
          data-testid="blog"
          style={blogStyle}
          key={blog.id}
        >
          <p>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </p>
        </div>
      ))}
    </div>
  )
}

export default Blogs

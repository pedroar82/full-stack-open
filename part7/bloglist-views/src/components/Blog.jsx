
import { useNotification } from '../contexts/NotificationContext'
import { useMutation, useQueryClient  } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useQuery } from '@tanstack/react-query'

const Blog = () => {
  const queryClient = useQueryClient()
  const notify = useNotification()

  const id = useParams().id

  const response = useQuery({
    queryKey: ['blog'],
    queryFn: () => blogService.getBlog(id),
    retry: 1,
  })
  const blog = response.data

  const { data: comments } = useQuery({
    queryKey: ['comments'],
    queryFn: () => blogService.getComments(id),
    retry: 1,
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blog'] })
      notify(
        `Liked blog ${updatedBlog.title} by ${updatedBlog.author}`,
        'success'
      )
    },
    onError: (error) => {
      notify(`error liking blog: ${error.message}`, 'error')
    },
  })

  const addCommentMutation = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      notify(
        `Added comment to blog ${updatedBlog.title} by ${updatedBlog.author}`,
        'success'
      )
    },
    onError: (error) => {
      notify(`error adding comment: ${error.message}`, 'error')
    },
  })

  const likeBlog = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlogMutation.mutate(updatedBlog)
  }

  const addCommentHandler = (event) => {
    event.preventDefault()
    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(event.target.comment.value),
    }
    addCommentMutation.mutate(updatedBlog)
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={likeBlog}>like</button>
      </p>
      <p>added by {blog.author}</p>
      <h3>comments</h3>
      <form onSubmit={addCommentHandler}>
        <div>
          <input name="comment" />
          <button type="submit">add comment</button>
        </div>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
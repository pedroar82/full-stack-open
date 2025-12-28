import { useNotification } from '../contexts/NotificationContext'
import { useMutation, useQueryClient  } from '@tanstack/react-query'
import { create } from '../services/blogs'

const BlogForm = ({ user }) => {

  const queryClient = useQueryClient()
  const notify = useNotification()

  const newBlogMutation = useMutation({
    mutationFn: create,
    onSuccess: (createdBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`, 'success')
    },
    onError: (error) => {
      notify(`error adding new blog: ${error.message}`, 'error')
    },
  })

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0,
      user: user.id,
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    newBlogMutation.mutate(newBlog)
  }


  return (
    <form onSubmit={addBlog}>
      <div>
        title: <input name='title'/>
      </div>
      <div>author: <input name='author'/></div>
      <div>
        <div>url: <input name='url' /></div>
        <div></div>
        <button type="submit" >create</button>
      </div>
    </form>
  )
}

export default BlogForm
import { useNotification } from '../contexts/NotificationContext'
import { useMutation, useQueryClient  } from '@tanstack/react-query'
import { create } from '../services/blogs'
import {
  Button,
  TextField
} from '@mui/material'

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
        <TextField size="small" label="title" name="title" />
      </div>
      <div>
        <TextField size="small" label="author" name="author" />
      </div>
      <div>
        <TextField size="small" label="url" name="url" />
      </div>
      <div>
        <Button size="small" variant="outlined" type="submit">
          create
        </Button>
      </div>
    </form>
  )
}

export default BlogForm
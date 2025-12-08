const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const { title, author, url, likes } = request.body

  if (!title || !url) {
    return response.status(400).json({ error: 'title or url are missing' })
  }

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(400).json({ error: 'Blog Id missing or not valid' })
  }

  const blogUpdated = {
    title: title,
    author: author,
    url: url,
    likes: likes
  }

  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blogUpdated)
  response.status(200).json(savedBlog)
})

module.exports = blogsRouter
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  const { title, author, url, likes } = body

  if (!title || !url) {
    return response.status(400).json({ error: 'title or url are missing' })
  }

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  if ( blog.user.toString() !== user._id.toString() ){
    return response.status(403).json({ error: 'permission denied' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const { title, author, url, likes } = request.body
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(400).json({ error: 'Blog Id missing or not valid' })
  }

  if ( blog.user.toString() !== user.id.toString() ){
    return response.status(403).json({ error: 'permission denied' })
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
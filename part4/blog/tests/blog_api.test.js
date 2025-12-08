const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  },
  {
    title: 'A Guide to Express Middleware',
    author: 'Mary Johnson',
    url: 'https://example.com/express-middleware',
    likes: 15
  },
  {
    title: 'Async/Await Tips',
    author: 'John Doe',
    url: 'https://example.com/async-await',
    likes: 99
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(e => e.title)
  assert.strictEqual(contents.includes('A Guide to Express Middleware'), true)
})

test('the unique property is id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    assert.strictEqual(blog.id !== undefined, true)
    assert.strictEqual(blog._id, undefined)
  })
})

test('creates a new blog post', async () => {
  const newBlog =  {
    title: 'A new post',
    author: 'Acácio Joaquim',
    url: 'https://example.com/batatas',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesInBD =  await api.get('/api/blogs')

  assert.strictEqual(notesInBD.body.length, initialBlogs.length+1)

  const titles = notesInBD.body.map((n) => n.title)
  assert(titles.includes('A new post'))

})

test ('if likes property is missing', async () => {
  const newBlog =  {
    title: 'A new post2',
    author: 'Acácio Joaquim',
    url: 'https://example.com/batatas',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})
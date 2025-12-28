import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch blogs')
  }
  const data = await response.json()
  return data.sort((a, b) => b.likes - a.likes)
}

export const create = async (newBlog) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify(newBlog),
  }
  const response = await fetch(baseUrl, options)
  const data = await response.json()

  if (!response.ok) {
    const message = data?.error || 'Failed to create blog'
    throw new Error(message)
  }
  return data
}

const update = async updatedObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject, config)
  return response.data
}

const deleteBlogFromBD = async deletedObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${deletedObject}`, config)
  return response.data
}

export default {
  getAll,
  create,
  update,
  setToken,
  deleteBlogFromBD }
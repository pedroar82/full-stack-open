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

export const getBlog = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch blogs')
  }
  const data = await response.json()
  return data
}

export const getComments = async (id) => {
  const response = await fetch(`${baseUrl}/comments/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch comments')
  }
  const data = await response.json()
  return data
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

export const update = async updatedObject => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify(updatedObject),
  }
  const response = await fetch(`${baseUrl}/${updatedObject.id}`, options)
  const data = await response.json()

  if (!response.ok) {
    const message = data?.error || 'Failed to update blog'
    throw new Error(message)
  }
  return data
}

export const addComment = async updatedObject => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify(updatedObject),
  }
  const response = await fetch(`${baseUrl}/comments/${updatedObject.id}`, options)
  const data = await response.json()

  if (!response.ok) {
    const message = data?.error || 'Failed to update blog'
    throw new Error(message)
  }
  return data
}

export const deleteBlogFromBD = async deletedObject => {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
  }
  const response = await fetch(`${baseUrl}/${deletedObject}`, options)

  if (!response.ok) {
    const message = 'Failed to delete blog'
    throw new Error(message)
  }
  return response.data
}

export default {
  getAll,
  create,
  update,
  setToken,
  getBlog,
  getComments,
  addComment,
  deleteBlogFromBD }
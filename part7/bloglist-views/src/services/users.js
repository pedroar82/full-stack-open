const baseUrl = '/api/users'

export const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  const data = await response.json()
  return data
}

export default {getAll} 
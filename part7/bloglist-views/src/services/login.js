const baseUrl = '/api/login'

export const login = async (credentials) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  }
  const response = await fetch(baseUrl, options)
  const data = await response.json()

  if (!response.ok) {
    const message = data?.error || 'Failed to update blog'
    throw new Error(message)
  }
  return data
}

export default { login }
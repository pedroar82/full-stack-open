import { useState, useContext } from 'react'
import { useNotification } from '../contexts/NotificationContext'
import loginService from '../services/login'
import blogService from '../services/blogs'
import LoginContext from '../contexts/LoginContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const notify = useNotification()

  const { loginDispatch } = useContext(LoginContext)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      loginDispatch({ type: 'SETUSER', payload: user })
    } catch (error) {
      notify('wrong credentials', 'error')
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
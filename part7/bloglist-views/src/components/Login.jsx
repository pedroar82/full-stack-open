import { useState, useContext } from 'react'
import { useNotification } from '../contexts/NotificationContext'
import loginService from '../services/login'
import blogService from '../services/blogs'
import LoginContext from '../contexts/LoginContext'
import {
  TextField,
  Button,
} from '@mui/material'

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
          <TextField
            size="small"
            label="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <TextField
            size="small"
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
    </div>
  )
}

export default Login
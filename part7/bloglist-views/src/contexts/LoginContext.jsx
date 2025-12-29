import { createContext, useReducer } from 'react'

const loginReducer = (state, action) => {
  switch (action.type) {
  case 'SETUSER':
    return action.payload
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

const LoginContext = createContext()

export const LoginContextProvider = (props) => {
  const [user, loginDispatch] = useReducer(loginReducer, '')
  return (
    <LoginContext.Provider value={{ user, loginDispatch }}>
      {props.children}
    </LoginContext.Provider>
  )
}

export default LoginContext
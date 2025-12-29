import { createContext, useReducer, useContext  } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload
  case 'RESET':
    return null
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

//the notification logic goes here, avoiding this code in the components
export const useNotification = () => {
  const { notificationDispatch } = useContext(NotificationContext)
  return (message, className) => {
    notificationDispatch({
      type: 'SET',
      payload: { message, className }
    })
    setTimeout(() => {
      notificationDispatch({ type: 'RESET' })
    }, 5000)
  }
}


export default NotificationContext
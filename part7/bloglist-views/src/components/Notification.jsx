import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'
import Alert from '@mui/material/Alert'

const Notification = () => {

  const { notification } = useContext(NotificationContext)

  if (notification === null || !notification) {
    return null
  }
  return (
    <Alert severity={notification.className}>{notification.message}</Alert>
  )
}

export default Notification
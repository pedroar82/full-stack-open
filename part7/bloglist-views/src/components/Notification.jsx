import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const Notification = () => {

  const { notification } = useContext(NotificationContext)

  if (notification === null) {
    return null
  }
  return (
    <div className={notification.className}>
      {notification.message}
    </div>
  )
}

export default Notification
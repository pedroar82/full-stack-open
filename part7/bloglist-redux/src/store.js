import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    notifs: notifReducer
  }
})

export default store
import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const store = configureStore({
  reducer: {
    notifs: notifReducer,
    blogs: blogReducer
  }
})

export default store
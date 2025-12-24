import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'

const store = configureStore({
  reducer: {
    notifs: notifReducer,
    blogs: blogReducer,
    login: loginReducer
  }
})

export default store
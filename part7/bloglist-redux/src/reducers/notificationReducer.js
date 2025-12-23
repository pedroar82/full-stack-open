import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notification',
  initialState: { message: null, class: null },
  reducers: {
    notification (state, action){
      return action.payload
    },
    clearNotification (){
      return ''
    }
  }
})

const { notification, clearNotification } = notifSlice.actions

export const setNotification = (message, className) => {
  return dispatch => {
    dispatch(notification({ message, className }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notifSlice.reducer
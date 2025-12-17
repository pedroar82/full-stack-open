import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notification',
  initialState: 'render here notification...',
  reducers: {
    notification (state, action){
      return action.payload
    },
    clearNotification (state, action){
      return ''
    }
  }
})

const { notification, clearNotification } = notifSlice.actions

export const setNotification = (message, seconds) => {
  return dispatch => {
    dispatch(notification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}


export default notifSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = 'render here notification...'

const notifSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notification (state, action){
      return action.payload
    }
  }
})

export const { notification } = notifSlice.actions
export default notifSlice.reducer
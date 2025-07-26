import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

const { setNotification: setNotificationAction, clearNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(setNotificationAction(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer

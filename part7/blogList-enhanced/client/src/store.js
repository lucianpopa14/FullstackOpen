import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './features/notification/notificationReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
    }
})

export default store;
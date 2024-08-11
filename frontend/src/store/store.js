import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import otherUsersReducer from './slices/otherUsersSlice'
import messageContainerReducer from './slices//messageContainerSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        otherUsers: otherUsersReducer,
        messageContainer: messageContainerReducer,
    }
})


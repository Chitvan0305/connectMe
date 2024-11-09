import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import postReducer from "./slices/PostSlice"

const store = configureStore({
    reducer:{
        user: userReducer,
        post: postReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./contexts/userSlice"

export default configureStore({
  reducer: {
    user:userReducer
  },
})
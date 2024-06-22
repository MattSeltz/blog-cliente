import {createSlice} from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name:"globalUser",
  initialState:{
    value:null
  },
  reducers:{
      setGlobalUser: (state,action) => {
        state.value = action.payload
      }
  }
})

export const {setGlobalUser} = userSlice.actions
export default userSlice.reducer
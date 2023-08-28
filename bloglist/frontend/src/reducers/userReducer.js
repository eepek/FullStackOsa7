import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    addAllUsers: (state, action) => action.payload,
  },
})

export const { setUser, addAllUsers } = userSlice.actions

export default userSlice.reducer

import { createSlice } from "@reduxjs/toolkit"
const initialState = { message: null, type: null }

const notificationSlice = createSlice({
  name: "notificiation",
  initialState,
  reducers: {
    createNotification: (state, action) => action.payload,
    removeNotification: () => initialState,
  },
})

export const { createNotification, removeNotification } =
  notificationSlice.actions

export const setInfoMessage = (type, message) => {
  console.log("reducerissa", message)
  return async (dispatch) => {
    dispatch(createNotification({ message: message, type: type }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer

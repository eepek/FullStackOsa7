import { createSlice } from "@reduxjs/toolkit"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog(state, action) {
      state.push(action.payload)
      return state
    },
    likeBlog(state, action) {
      const blogToChange = state.find((blog) => blog.id === action.payload.id)
      const likedBlog = { ...blogToChange, likes: action.payload.likes }
      return state.map((blog) => (blog.id === likedBlog.id ? likedBlog : blog))
    },
    removeBlog(state, action) {
      const blogId = action.payload
      return state.filter((blog) => blog.id !== blogId)
    },
    commentBlog(state, action) {
      const blogId = action.payload.id
      state.map((blog) =>
        blog.id === blogId
          ? { ...blog, comments: blog.comments.push(action.payload.comment) }
          : blog,
      )
    },
  },
})

export const { setBlogs, addBlog, likeBlog, removeBlog, commentBlog } =
  blogSlice.actions

export default blogSlice.reducer

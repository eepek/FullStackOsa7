import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  const blogs = request.data
  // console.log(blogs)
  return blogs
}

const addBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  // console.log(config)
  // console.log(blog)
  console.log(blog)
  try {
    const response = await axios.post(baseUrl, blog, config)
    console.log("response in service", response)
    return response.data
  } catch (error) {
    console.log("Error", error.data)
  }
}

const updateBlog = async (blog, blogId) => {
  try {
    // console.log(blogId)
    const response = await axios.put(`${baseUrl}/${blogId}`, blog)
    return response
  } catch (error) {
    console.log("Error happened", error.response)
  }
}

const removeBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.delete(`${baseUrl}/${blogId}`, config)
    return response
  } catch (error) {
    console.log(error)
  }
}

const commentBlog = async (blogId, comment) => {
  try {
    const response = await axios.post(`${baseUrl}/${blogId}/comments`, {
      comment,
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export default {
  getAll,
  addBlog,
  updateBlog,
  removeBlog,
  setToken,
  commentBlog,
}

import { useState } from "react"
import blogService from "../services/blogs"
import { addBlog } from "../reducers/blogReducer"
import { setInfoMessage } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { Button, TextField, Typography } from "@mui/material"

const AddNew = ({ blogPostRef }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const dispatch = useDispatch()

  const createBlogEntry = async (blog) => {
    try {
      const response = await blogService.addBlog(blog)
      console.log(response)
      if (response.status !== 400) {
        blogPostRef.current.toggleVisibility()
        dispatch(addBlog(response))
        dispatch(
          setInfoMessage(
            "info",
            `Blog "${blog.title}" by ${blog.author} added`,
          ),
        )
        return true
      }
    } catch (error) {
      console.log(error)
      dispatch(setInfoMessage("error", "Could not add blog to database"))
      return false
    }
  }

  const updateFields = () => {
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  const handleBlogPost = (event) => {
    event.preventDefault()
    const blog = { title, author, url }
    // console.log('App puolelta', blog)
    const responseStatus = createBlogEntry(blog)
    if (responseStatus) {
      updateFields()
    }
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Create new blog link
      </Typography>
      <form onSubmit={handleBlogPost}>
        <TextField
          type="text"
          name="title"
          id="title-input"
          label="Title"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value)
          }}
          placeholder="title"
          variant="outlined"
        />
        <br />

        <TextField
          type="text"
          name="author"
          id="author-input"
          value={author}
          onChange={({ target }) => {
            setAuthor(target.value)
          }}
          placeholder="author"
          label="Author"
          variant="outlined"
        />
        <br />

        <TextField
          type="text"
          name="url"
          id="url-input"
          value={url}
          onChange={({ target }) => {
            setUrl(target.value)
          }}
          placeholder="url"
          variant="outlined"
          label="URL"
        />
        <br />
        <br />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  )
}

// AddNew.propTypes = {
//   createBlogEntry: PropTypes.func.isRequired,
// }

export default AddNew

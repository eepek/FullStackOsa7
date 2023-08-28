import { useDispatch, useSelector } from "react-redux"
import { likeBlog, removeBlog, commentBlog } from "../reducers/blogReducer"
import blogService from "../services/blogs"
import { setInfoMessage } from "../reducers/notificationReducer"
import { useState } from "react"
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  TextField,
  Divider,
} from "@mui/material"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import DeleteIcon from "@mui/icons-material/Delete"

const Blog = ({ blog }) => {
  if (!blog) {
    return null
  }
  const [comment, setComment] = useState("")
  const dispatch = useDispatch()
  const userName = useSelector((state) => state.user.username)

  const likeHandler = async (blog) => {
    // console.log(blog)
    const { user, id, ...likedBlog } = blog
    likedBlog.user = user.id
    likedBlog.likes = blog.likes + 1
    // console.log(likedBlog)
    const response = await blogService.updateBlog(likedBlog, id.toString())
    // console.log(response)
    if (response.status === 200) {
      dispatch(likeBlog(response.data))
      // console.log(blogs)
    }
  }

  const removeHandler = async (blog) => {
    const blogId = blog.id
    const response = await blogService.removeBlog(blogId)
    if (response.status === 204) {
      // console.log(response)
      dispatch(removeBlog(blogId))
      dispatch(
        setInfoMessage(
          "info",
          `${blog.title} by ${blog.author} has been removed`,
        ),
      )
    } else {
      dispatch(setInfoMessage("error", "Could not remove blog from database"))
    }
  }

  const removeButton = () => {
    return (
      <IconButton
        onClick={handleRemove}
        color="primary"
        aria-label="Remove blog"
      >
        <DeleteIcon />
      </IconButton>
    )
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeHandler(blog)
    }
  }

  const commentHandler = async (event) => {
    event.preventDefault()
    await blogService.commentBlog(blog.id, comment)
    dispatch(commentBlog({ id: blog.id, comment: comment }))
    setComment("")
  }

  return (
    <div>
      <div>
        <Typography variant="h6">{blog.title}</Typography>
        <Typography variant="body1">-{blog.author}</Typography>
        <br />
        <Divider />
        <Typography variant="button">
          URL: <a href={blog.url}>{blog.url}</a>
        </Typography>
        <Divider />
        <Typography variant="button">
          Likes: {blog.likes}
          <IconButton
            onClick={() => likeHandler(blog)}
            variant="outlined"
            fontSize="small"
            color="primary"
            aria-label="Like"
          >
            <ThumbUpIcon />
          </IconButton>
        </Typography>
        <Divider />
        <Typography variant="button">Added by: {blog.user.name}</Typography>
        {blog.user.username === userName && removeButton()} <br />
        <Divider />
        <br />
        <Typography variant="button">Comments</Typography>
        <List>
          {blog.comments.map((c) => (
            <>
              <ListItem>
                <ListItemText>{c}</ListItemText>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
        <br />
      </div>
      <form onSubmit={commentHandler}>
        <TextField
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          variant="outlined"
          label="Comment"
          size="small"
        />{" "}
        <Button type="submit" variant="contained" size="small">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default Blog

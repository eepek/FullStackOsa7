import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, Link, useMatch } from "react-router-dom"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import { setBlogs } from "./reducers/blogReducer"
import { setUser } from "./reducers/userReducer"
import Login from "./components/Login"
import loginService from "./services/login"
import AddNew from "./components/AddNew"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import { setInfoMessage } from "./reducers/notificationReducer"
import Navbar from "./components/Navbar"
import Users from "./components/Users"
import SingleUser from "./components/SingleUser"
import userService from "./services/users"
import {
  List,
  ListItem,
  ListItemText,
  Container,
  ListItemIcon,
  ListItemButton,
  Typography,
} from "@mui/material"
import DescriptionIcon from "@mui/icons-material/Description"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [users, setUsers] = useState([])
  const blogPostRef = useRef()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  // const match = useMatch("/users/:id")
  // console.log(match)

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem("loggedBlogUser"))
    if (loggedUser) {
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [])

  async function fetchBlogs() {
    const fetched = await blogService.getAll()
    const sorted = fetched.sort((blog1, blog2) =>
      blog1.likes > blog2.likes ? -1 : blog2.likes > blog1.likes ? 1 : 0,
    )
    dispatch(setBlogs(sorted))
    const response = await userService.getAll()
    const sortedUsers = response.sort((user1, user2) =>
      user1.blogs.length > user2.blogs.length
        ? -1
        : user2.blogs.length > user1.blogs.length
        ? 1
        : 0,
    )
    setUsers(sortedUsers)
  }

  const singeUserMatch = useMatch("/users/:id")
  const singleUserShown = singeUserMatch
    ? users.find((u) => u.id === singeUserMatch.params.id)
    : null

  const singleBlogMatch = useMatch("/blogs/:id")
  const blog = singleBlogMatch
    ? blogs.find((b) => b.id === singleBlogMatch.params.id)
    : null

  // const blogstyle = {
  //   border: "solid",
  //   borderWidth: 1,
  //   padding: 5,
  // }

  const infoHandler = (type, message) => {
    dispatch(setInfoMessage(type, message))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLogin = await loginService.login({
        username,
        password,
      })
      fetchBlogs()
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(userLogin))
      dispatch(setUser(userLogin))
      blogService.setToken(userLogin.token)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log(exception)
      infoHandler("error", "Incorrect username or password")
    }
  }

  if (user) {
    return (
      <Container maxWidth="md">
        <Navbar />
        <br />
        <Notification />
        <br />
        <Container maxWidth="sm">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Typography variant="h6" gutterBottom>
                    Blog list
                  </Typography>

                  <br />
                  <List id="blog-div-for-testing">
                    {blogs.map((blog) => (
                      <ListItem key={blog.id} disablePadding>
                        <Link to={`/blogs/${blog.id}`}>
                          <ListItemButton>
                            <ListItemIcon>
                              <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={`${blog.title} ${blog.author}`}
                            />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                  <br />
                  <Togglable buttonLabel="Add blog" ref={blogPostRef}>
                    <AddNew blogPostRef={blogPostRef} />
                  </Togglable>
                </div>
              }
            />
            <Route path="/users" element={<Users users={users} />} />
            <Route
              path="/users/:id"
              element={<SingleUser user={singleUserShown} />}
            />
            <Route path="blogs/:id" element={<Blog blog={blog} />} />
          </Routes>
        </Container>
      </Container>
    )
  } else {
    return (
      <Container maxWidth="sm">
        <h2>Log in to application</h2>
        <Notification />
        <Login
          setUsername={setUsername}
          handleLogin={handleLogin}
          userName={username}
          setPassword={setPassword}
          password={password}
        />
      </Container>
    )
  }
}

export default App

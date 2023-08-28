import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"

const Navbar = () => {
  const user = useSelector((state) => state.user)

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogUser")
    window.location.reload(false)
  }

  return (
    <Box sx={{ flexgrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/">
              Blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              Users
            </Button>
          </Box>

          <Typography variant="button" align="justify" display="block">
            {user.name.toUpperCase()} LOGGED IN
          </Typography>
          <IconButton onClick={logOut}>
            <LogoutIcon />
          </IconButton>
          {/* <Button onClickCapture={logOut}>Logout</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default Navbar

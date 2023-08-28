import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  ListItemIcon,
} from "@mui/material"
import DescriptionIcon from "@mui/icons-material/Description"
import { Link } from "react-router-dom"

const SingleUser = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <Typography variant="h6">Blogs added by {user.name}</Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <ListItemButton>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>

                <ListItemText>{blog.title}</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default SingleUser

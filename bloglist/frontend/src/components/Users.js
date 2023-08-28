import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { Link } from "react-router-dom"

const Users = ({ users }) => {
  return (
    <div>
      <Typography variant="h6">Submitted blogs by user</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Blog count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell align="right">{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
              {user.blogs.length}
            </ListItemText>
          </ListItem>
        ))}
      </List> */}
      </Table>
    </div>
  )
}

export default Users

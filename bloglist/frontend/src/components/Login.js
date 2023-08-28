import { TextField, Button } from "@mui/material"

const login = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <br></br>
      <TextField
        id="standard-helperText"
        label="Username"
        defaultValue=""
        variant="standard"
        value={props.username}
        onChange={({ target }) => props.setUsername(target.value)}
      />
      <TextField
        id="standard-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="standard"
        value={props.password}
        onChange={({ target }) => props.setPassword(target.value)}
      />
      <br />
      <br />
      <Button type="submit" id="login-button">
        Login
      </Button>
    </form>
  )
}

export default login

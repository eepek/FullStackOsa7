import axios from "axios"

const getAll = async () => {
  const response = await axios.get("http://localhost:3001/api/users")
  const users = response.data
  return users
}

export default { getAll }

import axios from "axios"
const baseUrl = "/api/login"

const login = async (loginInfo) => {
  let response = await axios.post(baseUrl, loginInfo)
  console.log(response.data)
  return response.data
}

export default { login }

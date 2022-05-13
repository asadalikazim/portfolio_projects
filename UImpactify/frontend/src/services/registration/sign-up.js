import axios from "axios"
import { API_URL } from "../../utils/constants"
axios.defaults.withCredentials = true;

const register = (email, name, password, role) => {
  return axios
    .post(API_URL + "/api/register", {
      name: name,
      email: email,
      password: password,
      role: role,
    })
}

export default register

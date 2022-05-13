import axios from "axios"
import url from "./config"
import { useDispatch } from "react-redux"
import auth from "../repoLocal/authorization"

const register = (name, email, password, date, role) => {
  /*
    DESCRIPTION
    By passing the user fields, you can register the given user.

    PARAMETERS
    "name": "Joshua White",
    "email": "joshua.rhino@gmail.com",
    "password": "DSFGdg1$134sdfa4tq35",
    "date": {},
    "role": "STUDENT"

    RESPONSE
    200	OK
    400 BAD REQUEST
    409 USER ALREADY EXISTS
    500 INTERNAL SERVER ERROR
  */

  var response = null

  axios
    .post(url + "register", {
      name: name,
      email: email,
      password: password,
      date: date,
      role: role,
    })
    .then(res => {
      response = res
      if (res.status === "200") {
        //redux call to store user
        useDispatch(auth.actions.storeUser(name, email, date, role))
      }
    })
    .catch(err => console.error(err))

  return response
}

const login = (username, password) => {
  /*
    DESCRIPTION
    By passing the user fields, you can login the given user.

    PARAMETERS
    "username": "joshua.rhino@gmail.com",
    "password": "DSFGdg1$134sdfa4tq35",

    RESPONSE
    200	OK
        {
         "name": "Joshua White",
         "email": "joshua.rhino@gmail.com",
         "password": "DSFGdg1$134sdfa4tq35",
         "date": {},
         "role": "STUDENT"
        }
    400 BAD REQUEST
    404 DOES NOT EXIST
    500 INTERNAL SERVER ERROR
  */

  var response = null

  axios
    .post(url + "login", {
      username: username,
      password: password,
    })
    .then(res => {
      response = res
      if (res.status === "200") {
        //redux call to store user
        useDispatch(
          auth.actions.storeUser(
            res.data.name,
            res.data.email,
            res.data.date,
            res.data.role
          )
        )
      }
    })
    .catch(err => console.error(err))

  return response
}

const logout = () => {
  //might delete this function
  //just use useDispatch(auth.actions.deleteUser) wherever you want to use logout
  return axios.delete(url + "logout", { withCredentials: true })
}

const user = () => {
  //might delete this function
  //just use useSelector(store => store.user) wherever you need user info
  return axios.get(url + "user")
}

export default {
  register,
  login,
  logout,
  user,
}

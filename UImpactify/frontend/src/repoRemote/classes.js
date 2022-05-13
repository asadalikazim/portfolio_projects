import axios from "axios"
import url from "./config"
import { useDispatch } from "react-redux"
import Class from "../repoLocal/classes"

const addClass = (name, description, instructorId, givingGarden, rating) => {
  /*
    DESCRIPTION
    Puts a class into the database

    PARAMETERS
    "name": "Advanced ML",
    "description": "This is a course about ML",
    "instructorId": "ObjectId(alfdign23483)",
    "givingGarden": true,
    "rating": 4

    RESPONSE
    200	OK
    400 BAD REQUEST
    500 INTERNAL SERVER ERROR
  */

  var response = null

  axios
    .post(url + "addClass", {
      name: name,
      description: description,
      instructorId: instructorId,
      givingGarden: givingGarden,
      rating: rating,
    })
    .then(res => (response = res))
    .catch(err => console.error(err))

  return response
}

const getClass = () => {
  /*
    DESCRIPTION
    Gets any 10 classes from db (and puts them in the local repo)

    PARAMETERS
    None

    RESPONSE
    200	OK
        [
         {
          "name": "Advanced ML",
          "description": "This is a course about ML",
          "instructorId": "ObjectId(alfdign23483)",
          "givingGarden": true,
          "rating": 4
         }
        ]
    400 BAD REQUEST
    500 INTERNAL SERVER ERROR
  */

  var response = null

  axios
    .get(url + "getClass")
    .then(res => {
      response = res
      if (res.status === "200") {
        //store in local repo
        useDispatch(Class.actions.storeClasses(res.data))
      }
    })
    .catch(err => console.error(err))

  return response
}

export default {
  addClass,
  getClass,
}

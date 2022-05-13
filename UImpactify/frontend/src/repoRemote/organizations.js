import axios from "axios"
import url from "./config"
import { useDispatch } from "react-redux"
import Org from "../repoLocal/organization"

const addOrg = (name, about, website, address, phoneNum, ownerId, rating) => {
  /*
    DESCRIPTION
    Puts an org into the database

    PARAMETERS
    "name": "Microsoft",
    "about": "We are a software company",
    "website": "www.microsoft.com",
    "address": "1077 Stevenson Ave.",
    "phoneNum": 4858385093,
    "ownerId": "ObjectId(sdfsdfwkrfw45)",
    "rating": 4

    RESPONSE
    200	OK
    400 BAD REQUEST
    500 INTERNAL SERVER ERROR
  */

  var response = null

  axios
    .post(url + "addOrg", {
      name: name,
      about: about,
      website: website,
      address: address,
      phoneNum: phoneNum,
      ownerId: ownerId,
      rating: rating,
    })
    .then(res => (response = res))
    .catch(err => console.error(err))

  return response
}

const getOrg = () => {
  /*
      DESCRIPTION
      Gets max 10 Organizations
  
      PARAMETERS
      None
  
      RESPONSE
      200 OK
          [
           {
            "name": "Microsoft",
            "about": "We are a software company",
            "website": "www.microsoft.com",
            "address": "1077 Stevenson Ave.",
            "phoneNum": 4858385093,
            "ownerId": "ObjectId(sdfsdfwkrfw45)",
            "rating": 4
           }
          ]
      400 BAD REQUEST
      404 DOES NOT EXIST
      500 INTERNAL SERVER ERROR
    */

  var response = null

  axios
    .get(url + "getOrg")
    .then(res => {
      response = res
      if (res.status === "200") {
        //store in local repo
        useDispatch(Org.actions.storeOrganizations(res.data))
      }
    })
    .catch(err => console.error(err))

  return response
}

export default {
  addOrg,
  getOrg,
}

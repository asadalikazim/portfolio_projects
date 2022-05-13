import axios from "axios"
import url from "./config"
import { useDispatch } from "react-redux"
import Job from "../repoLocal/jobs"

const addJob = (name, description, orgId, volunteerOp) => {
  /*
    DESCRIPTION
    Puts a job into the database

    PARAMETERS
    "name": "Software Developer",
    "description": "We need good Javascript developers!",
    "orgId": "ObjectId(asdfj734hf37)",
    "volunteerOp": true

    RESPONSE
    200	OK
    400 BAD REQUEST
    500 INTERNAL SERVER ERROR
  */

  var response = null

  axios
    .post(url + "addJob", {
      name: name,
      description: description,
      orgId: orgId,
      volunteerOp: volunteerOp,
      opportunityLink: opportunityLink
    })
    .then(res => (response = res))
    .catch(err => console.error(err))

  return response
}

const getJob = () => {
  /*
    DESCRIPTION
    Get all jobs from the db of the org of orgId

    PARAMETERS
    "orgId": "ObjectId(asdfj734hf37)",

    RESPONSE
    200	OK
        [
         {
          "name": "Advanced ML",
          "description": "This is a course about ML",
          "orgId": "ObjectId(alfdign23483)",
          "volunteerOp": true
         }
        ]
    400 BAD REQUEST
    404 DOES NOT EXIST
    500 INTERNAL SERVER ERROR
  */

  var response = null

  axios
    .get(url + "getJob")
    .then(res => {
      response = res
      if (res.status === "200") {
        //store in local repo
        useDispatch(Job.actions.storeJobs(res.data))
      }
    })
    .catch(err => console.error(err))

  return response
}

export default {
  addJob,
  getJob,
}

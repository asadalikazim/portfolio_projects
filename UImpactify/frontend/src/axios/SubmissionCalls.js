import axios from "axios"

const API_URL = "http://localhost:4000/api/"
axios.defaults.withCredentials = true

const addSubmission = (sId, aId, link) => {
  return axios.post(API_URL + "addSubmission", {
    sId: sId,
    aId: aId,
    link: link,
  })
}

//used by instructors to retrieve all submissions for an assignment for a class
const getSubmission = (instructorId, classId, assignmentId) => {
  return axios.get(API_URL + "getSubmission", {
    params: {
      instructorId: instructorId,
      classId: classId,
      assignmentId: assignmentId,
    },
  })
}

//used by instructors to update a submission for an assigment for a class with given grade
//grade has to be String!!
const updSubmission = (
  submissionId,
  grade
) => {
  return axios.post(API_URL + "updSubmission", {
    submissionId: submissionId,
    grade: grade,
  })
}

export default {
  addSubmission,
  getSubmission,
  updSubmission,
}

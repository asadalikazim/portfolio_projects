import axios from "axios"

const API_URL = "http://localhost:4000/api/"
axios.defaults.withCredentials = true

const setEnrolment = (classId, studentId) => {
  return axios.post(API_URL + "setEnrolled", {
    classId: classId,
    studentId: studentId,
  })
}

const getEnrolment = (classId, studentId) => {
  return axios.get(API_URL + "getEnrolled", {
    params: {
      classId: classId,
      studentId: studentId,
    },
  })
}

export default {
  setEnrolment,
  getEnrolment,
}

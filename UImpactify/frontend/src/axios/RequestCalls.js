import axios from 'axios';


const API_URL = "http://localhost:4000/api/";
axios.defaults.withCredentials = true;


/**
 * 
 * Get functions return a promise. Do getStudentRequest(<id>).then(response => response.data) to get the requests
 */
const getStudentRequest = (courseId) => {
    return axios.get(API_URL + "getStudentRequest", { params: { 
        courseId} 
    });
}

const getOrganizationRequest = (courseId) => {

    return axios.get(API_URL + "getOrgRequest", {
        params:
        {
            courseId
        }
    });

}
/*
{ 
  "description": "I want to apply to gutiar lessons because i want to find my dad, Michael Jackson",
  "courseId": "5f9b985034352205b0846687",
  "studentId": "5f9b985034352205b0846687" or "organizationId": "5f9b985034352205b0846687",
}
*/

const addRequest = (addRequestObject) => {

    return axios.post(API_URL + "addRequest", { ...addRequestObject });

}


const updateRequest = (requestId, accept) => {
    return axios.post(API_URL + "updateRequest", { requestId: requestId, accept: accept });
}


export default {
    getStudentRequest,
    getOrganizationRequest,
    addRequest,
    updateRequest
};
import axios from "axios";

const API_URL = "http://localhost:4000/api/";
axios.defaults.withCredentials = true;


const getJobs = (orgId) => {
    return axios.get(API_URL + "getJob",{
        params: {
            orgId: orgId
        }
    });
}

const addJob = ({name, description, orgId, volunteerOp, opportunityLink}) => {
    return axios.post(API_URL + "addJob",{
        "name": name,
        "description": description,
        "orgId": orgId,
        "volunteerOp": volunteerOp,
        "opportunityLink": opportunityLink
    });
}

export default {
    getJobs,
    addJob
};

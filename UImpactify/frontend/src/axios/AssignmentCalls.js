import axios from "axios";

const API_URL = "http://localhost:4000/api/";
axios.defaults.withCredentials = true;

const addAssignments = (assignments) => {
	let i;
	let promises = [];
	for (i=0;i<assignments.length;i++) {
		console.log(assignments[i]);
		promises.push(axios.post(API_URL + 'addAssignment', assignments[i]));
	}
	return Promise.all(promises);
};

const getAssignment = (classId) => {
    return axios.get(API_URL + "getAssignment",{
        params: {
            classId: classId
        }
    })
};

const getAssignmentById = (classId) => {
    return axios.get(API_URL + "getAssignmentById",{
        params: {
            classId: classId
        }
    });
}

export default {
    addAssignments,
    getAssignment,
    getAssignmentById
};

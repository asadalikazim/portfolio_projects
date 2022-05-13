import axios from "axios";

const API_URL = "http://localhost:4000/api/";
axios.defaults.withCredentials = true;

const addClass = ({name, description, instructorId, givingGarden, rating}) => {
    return axios.post(API_URL + "addClass", {
        "name": name,
        "description": description,
        "instructorId": instructorId,
        "givingGarden": givingGarden,
        "rating": rating
    })

};

const getClass = () => {
    return axios.get(API_URL + "getClass")
};

const getClassById = (classId) => {
    return axios.get(API_URL + "getClassById",{
        params: {
            classId: classId
        }
    });
}

const getClassByInstructor = (instructorId) => {
    return axios.get(API_URL + "getClassByInstructor",{
        params: {
            instructorId: instructorId
        }
    });
}

const getClassByStudent = (studentId) => {
    return axios.get(API_URL + "getClassByStudent",{
        params: {
            studentId: studentId
        }
    });
}

export default {
    addClass,
    getClass,
    getClassById,
    getClassByInstructor,
    getClassByStudent
};

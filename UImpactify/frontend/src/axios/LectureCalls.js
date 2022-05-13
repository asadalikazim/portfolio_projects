import axios from "axios";

const API_URL = "http://localhost:4000/api/";
axios.defaults.withCredentials = true;

const addLectures = (lectures) => {
	let i;
	let promises = [];
	for (i=0;i<lectures.length;i++) {
		promises.push(axios.post(API_URL + 'addLecture', lectures[i]));
	}
	return Promise.all(promises);
	
};

const getLecture = (classId) => {
    return axios.get(API_URL + "getLecture",{
        params: {
            classId: classId
        }
    });
};

const getLectureById = (LectureId) => {
    return axios.get(API_URL + "getLectureById",{
        params: {
            lectureId: lectureId
        }
    });
}


export default {
    addLectures,
    getLecture,
    getLectureById
};

import axios from "axios";

const API_URL = "http://localhost:4000/api/";
axios.defaults.withCredentials = true;

const getUserById = (userId) => {
    return axios.get(API_URL + "getUserById",{
        params: {
            userId: userId
        }
    });
}

export default {
    getUserById
};

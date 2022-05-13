import axios from "axios";

const API_URL = "http://localhost:4000/api/";
axios.defaults.withCredentials = true;

const login = (email, password) => {
    return axios.post(API_URL + "login", {
        "username": email,
        "password": password
    })

};

const getAuthUser = () => {
    return axios.get(API_URL + "user")
};

const logout = () => {
    return axios.delete(API_URL + "logout", {withCredentials: true})
}

export default {
    login,
    getAuthUser,
    logout
};

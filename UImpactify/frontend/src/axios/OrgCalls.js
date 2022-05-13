import axios from "axios";

const API_URL = "http://localhost:4000/api/";
axios.defaults.withCredentials = true;

const addOrg = ({name, about, website, address, phoneNum, ownerId, rating}) => {
    return axios.post(API_URL + "addOrg", {
        "name": name,
        "about": about,
        "website": website,
        "address": address,
        "phoneNum": phoneNum,
        "ownerId": ownerId,
        "rating": rating
    })

};

const getOrg = () => {
    return axios.get(API_URL + "getOrg")
};

const getOrgById = (orgId) => {
    return axios.get(API_URL + "getOrgById",{
        params: {
            orgId: orgId
        }
    });
}

const getOrgByUid = (userId) => {
    return axios.get(API_URL + "getOrgByUid",{
        params: {
            userId: userId
        }
    });
}


export default {
    addOrg,
    getOrg,
    getOrgById,
    getOrgByUid
};

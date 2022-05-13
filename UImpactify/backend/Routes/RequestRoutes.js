const express = require('express');

const router = express.Router();
const requestObj = require('../Model/GivingGardenRequestActions');


router.post('/api/addRequest', (request, response) => {
    requestObj.create(request, response);
});

router.post('/api/updateRequest', (request, response) => {
    requestObj.updateRequest(request, response);
});

router.get('/api/getStudentRequest', (request, response) => {
    requestObj.getStudentRequestById(request, response);
});

router.get('/api/getOrgRequest', (request, response) => {
    requestObj.getOrgRequestById(request, response);
});
module.exports = router;


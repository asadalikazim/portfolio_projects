const express = require('express');

const router = express.Router();
const jobObj = require('../Model/JobActions');


router.post('/api/addJob', (request, response) => {
    jobObj.create(request, response);
});
router.get('/api/getJob', (request, response) => {
    jobObj.retrieve(request, response);
});
router.get('/api/getJobById', (request, response) => {
    jobObj.getJobById(request, response);
});

module.exports = router

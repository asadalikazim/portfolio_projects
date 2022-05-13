const express = require('express');

const router = express.Router();
const assignmentObj = require('../Model/AssignmentActions');


router.post('/api/addAssignment', (request, response) => {
    assignmentObj.create(request, response);
});
router.get('/api/getAssignment', (request, response) => {
    assignmentObj.getAssignment(request, response);
});
router.get('/api/getAssignmentById', (request, response) => {
    assignmentObj.getAssignmentById(request, response);
});

module.exports = router;

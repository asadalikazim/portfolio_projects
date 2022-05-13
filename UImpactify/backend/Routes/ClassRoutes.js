const express = require('express');

const router = express.Router();
const classObj = require('../Model/ClassActions');


router.post('/api/addClass', (request, response) => {
  classObj.create(request, response);
});
router.get('/api/getClass', (request, response) => {
  classObj.getClass(request, response);
});
router.get('/api/getClassById', (request, response) => {
  classObj.getClassById(request, response);
});
router.get('/api/getClassByInstructor', (request, response) => {
  classObj.getClassByInstructor(request, response);
});
router.get('/api/getClassByStudent', (request, response) => {
  classObj.getClassByStudent(request, response);
});

module.exports = router;

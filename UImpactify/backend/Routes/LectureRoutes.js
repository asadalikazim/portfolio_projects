const express = require('express');

const router = express.Router();
const lecObj = require('../Model/LectureActions');


router.post('/api/addLecture', (request, response) => {
    lecObj.create(request, response);
});
router.get('/api/getLecture', (request, response) => {
    lecObj.getLecture(request, response);
});
router.get('/api/getLectureById', (request, response) => {
    lecObj.getLectureById(request, response);
});

module.exports = router
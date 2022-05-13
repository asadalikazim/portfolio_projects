const express = require('express');

const router = express.Router();
const enrolledObj = require('../Model/EnrolledActions');


router.post('/api/setEnrolled', (request, response) => {
  enrolledObj.create(request, response);
});
router.get('/api/getEnrolled', (request, response) => {
  enrolledObj.getEnrolled(request, response);
});

module.exports = router;
const express = require('express');

const router = express.Router();
const SubmissionActions = require('../Model/SubmissionActions');


router.post('/api/addSubmission', (request, response) => {
    SubmissionActions.create(request, response);
});
router.get('/api/getSubmission', (request, response) => {
    SubmissionActions.retrieve(request, response);
});
router.post('/api/updSubmission', (request, response) => {
    SubmissionActions.update(request, response);
});


module.exports = router;

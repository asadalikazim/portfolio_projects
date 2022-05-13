const express = require('express');

const router = express.Router();
const jobRoutes = require('./JobRoutes');
const authRoutes = require('./AuthRoutes');
const classRoutes = require('./ClassRoutes');
const requestRoutes = require('./RequestRoutes');
const lectureRoutes = require('./LectureRoutes');
const orgRoutes = require('./OrganizationRoutes');
const enrolledRoutes = require('./EnrolledRoutes')
const submissionRoutes = require('./SubmissionRoutes');
const assignmentRoutes = require('./AssignmentRoutes');



module.exports = function (app, passport) {
  router.use(authRoutes(app, passport));
  router.use(orgRoutes);
  router.use(jobRoutes);
  router.use(classRoutes);
  router.use(requestRoutes);
  router.use(lectureRoutes);
  router.use(enrolledRoutes);
  router.use(submissionRoutes);
  router.use(assignmentRoutes);
  
  return router;
};

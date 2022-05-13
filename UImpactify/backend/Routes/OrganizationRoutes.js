const express = require('express');

const router = express.Router();
const OrganizationObj = require('../Model/OrganizationActions');


router.post('/api/addOrg', (request, response) => {
  OrganizationObj.create(request, response);
});
router.get('/api/getOrg', (request, response) => {
  OrganizationObj.getOrg(response);
});
router.get('/api/getOrgById', (request, response) => {
  OrganizationObj.getOrgById(request, response);
});
router.get('/api/getOrgByUid', (request, response) => {
  OrganizationObj.getOrgByUid(request, response);
});

module.exports = router;


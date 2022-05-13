const express = require('express');

const router = express.Router();
const Auth = require('../Controllers/Authenticate');
const user = require('../Model/UserActions');

module.exports = function (app, passport) {
  router.post('/api/register', (request, response) => {
    Auth.register(request, response);
  });
  router.post('/api/login', (request, response, next) => {
    Auth.login(request, response, next, passport);
  });
  router.get('/api/user', (request, response) => {
    Auth.user(request, response);
  });
  router.get('/api/getUserById', (request, response) => {
    user.getUserById(request, response);
  });
  router.delete('/api/logout', (request, response) => {
    Auth.logout(request, response);
  });

  return router;
};

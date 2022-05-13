const UserAction = require('../Model/UserActions')

/**
 * Implement signUp and login checks and use Dbfuncs to insert into database.
 */

module.exports = {
  login: (request, response, next, passport) => {
    passport.authenticate('local', (error, user) => {
      if (error) response.send('INTERNAL SERVER ERROR', 500); //server broke
      if (!user) response.send('DOES NOT EXIST', 404); //if user and/or password do not match
      else {
        request.logIn(user, (err) => {
          if (err) response.send('BAD REQUEST', 400); //login failed
          response.send('OKAY'); //successful
        });
      }
    })(request, response, next);
  },
  register: (request, response) => {
    UserAction.create(request, response);
  },
  user: (request, response) => {
    if (!request.user) {
      response.status(404).send('No authenticated user');
    }
    response.send(request.user); // The request.user stores the entire user that has been authenticated inside of it.
  },
  logout: (request, response) => {
    request.logout();
    response.send('Successfully logged out');
  },
};

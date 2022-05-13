const UserModel = require('./Schemas/User');
const bcrypt = require('bcryptjs');
const { response } = require('express');

module.exports = {
  create: (request, response) => {
    UserModel.findOne({ email: request.body.email }, async (error, doc) => {
      if (error) response.send('INTERNAL SERVER ERROR', 500); //server broke
      if (doc) response.send('User Already Exists', 409); //user exists
      if (!doc) {
        if(request.body.password == null
          || request.body.email == null
          || request.body.name == null
          || request.body.role == null){
          response.send('BAD REQUEST', 400);
        }else{
          if(request.body.role != "STUDENT"
            && request.body.role != "CONSULTANT"
            && request.body.role != "INITIATIVE"){
            response.send('BAD REQUEST', 400);
          }else{
            const hashedPassword = await bcrypt.hash(request.body.password, 10);
            const newUser = new UserModel({
              name: request.body.name,
              password: hashedPassword,
              email: request.body.email,
              role: request.body.role,
            });
            await newUser.save();
            response.send('User Created');
          }
          
        }
      }
    });
  },
  retrieve: (request) => {
    UserModel.findOne({ email: request.body.email }).then((user) => {
      if (!user) {
        return { success: false, result: 'User not found' }; /* Have to replace this with somethong not string */
      }

      return { success: true, result: user };
    })
        .catch((error) => ({ success: false, result: error }));
  },
  getUserById: (request, response) => {

    if(request.query.userId == null){
      response.status(400).send('BAD REQUEST');
      return;
    }

    UserModel.findById(request.query.userId).then((user, error) => {
      if(error) {response.status(500).send('INTERNAL SERVER ERROR');}
      if (!user) {
        response.status(409).send("User not found");          /* Have to replace this with somethong not string */
      }
      response.send(user);
    })
    .catch((error) => {
      response.status(500).send('INTERNAL SERVER ERROR');
    });
  }
};
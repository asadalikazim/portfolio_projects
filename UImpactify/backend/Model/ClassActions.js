const Class = require('./Schemas/Class');
const ClassModel = require('./Schemas/Class');
const EnrolledModel = require('./Schemas/Enrolled');
const UserModel = require('./Schemas/User');
const Utils = require('./utils');

/*
{
  "_id": "ObjectId(\"234hhb4353k2\")",
  "name": "Advanced ML",
  "description": "This is a course about ML",
  "instructorId": "alfdign23483",
  "givingGarden": true,
  "rating": 4
}
*/

module.exports = {
  create: (request, response) => {
    
    //leaving for now as in the future we might want to prevent duplicates
    ClassModel.findOne({ _id: request.body._id }, async (error, doc) => { 
      
      if (error) response.send('INTERNAL SERVER ERROR', 500); //server broke
      if (doc) response.send('Class Already Exists', 409); //Should never return for now at least
      if (!doc) {
  
        if ( request.body.name == null
          || request.body.description == null
          || request.body.instructorId == null
          || request.body.givingGarden == null){
          response.status(400).send('BAD REQUEST');

        }else{
          const user = await UserModel.findById(request.body.instructorId);
          if (user == null || user.role != "CONSULTANT") {
            response.status(404).send('DOES NOT EXIST');
            return;
          }

          const newClass = new ClassModel({
            name: request.body.name,
            description: request.body.description,
            instructorId: request.body.instructorId,
            givingGarden: request.body.givingGarden,
            rating: request.body.rating
          });
          await newClass.save(); 
          response.send('OK');
        }
      }

    });
  },
  getClass: (request,response) => {
    ClassModel.find({}).then((classes, error) => {
      if(error) { response.send("INTERNAL SERVER ERROR", 500);}
      if (!classes) {
        return { success: false, result: 'Class not found' }; /* Have to replace this with somethong not string */
      }
      response.send(classes);
      
    })
        .catch((error) => {
          console.log(error);
          response.status(500).send('INTERNAL SERVER ERROR')
        });
  },
    getClassById: (request,response) => {

      if(request.query.classId == null){
        response.status(400).send('BAD REQUEST');
        return;
    }

    let check = false;
    ClassModel.findById(request.query.classId).then((clas, error) => {
      if(error) { response.status(500).send("INTERNAL SERVER ERROR");}
      if (!clas) {
        check = true;
        response.status(409).send("Class not found");  //after sending this it gives me an error?       
      }
      response.send(clas);
    
    })
      .catch((error) => {
        console.log("ERROR HAS OCCURED");

        if(!check) {
        response.status(500).send('INTERNAL SERVER ERROR'); 
        }
      });
  },
  getClassByInstructor: (request,response) => {

    if(request.query.instructorId == null){
      response.status(400).send('BAD REQUEST');
      return;
    }

    let check = false;
    ClassModel.find({instructorId: request.query.instructorId}).then((clas, error) => {
      if(error) { response.status(500).send("INTERNAL SERVER ERROR");}
      if (!clas) {
        check = true;
        response.status(409).send("Class not found");  //after sending this it gives me an error?
      }
      response.send(clas);

    })
        .catch((error) => {
          console.log("ERROR HAS OCCURED");

          if(!check) {
            response.status(500).send('INTERNAL SERVER ERROR');
          }
        });
  },
  getClassByStudent: (request, response) => {

    if(request.query.studentId == null){
      response.status(400).send('BAD REQUEST');
      return;
    }

    EnrolledModel.find({studentId: request.query.studentId}, function(error, enrolled){
      if(error) { response.status(500).send("INTERNAL SERVER ERROR");}
      if (!enrolled) {
        const check = true;
        response.status(404).send("Class not found");  //after sending this it gives me an error?
        return;
      }

      const classIds = Utils.extractIds(enrolled);

      ClassModel.find({
        '_id': { $in: classIds}
      }, function(error, classes) {
            if(error) { response.status(500).send("INTERNAL SERVER ERROR");}
            if(!classes){
              response.status(409).send("Class not found");  //after sending this it gives me an error?
              return;
            }
            response.send(classes);
          })

    })
  }


};
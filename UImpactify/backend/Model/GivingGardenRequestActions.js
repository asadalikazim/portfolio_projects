const OrgModel = require('./Schemas/Organization');
const UserModel = require('./Schemas/User');
const ClassModel = require('./Schemas/Class');
const RequestModel = require('./Schemas/GivingGardenRequest');
var mongoose = require('mongoose');

/*
{
  "name": "Bill jean", //might not be needed
  "description": "I want to apply to gutiar lessons because i want to find my dad, Michael Jackson",
  "courseId": "ObjectId(adashdadw)",
  "studentId": "ObjectId(actualid)",
  "organizationId": "",
  "status": "UNKNOWN", make them unknown by default //not needed
}
*/

module.exports = {
  create: (request, response) => {

    //check if student is null
    //check if org is null

    RequestModel.findOne({$or: [ //check for dups
      {courseId: request.body.courseId, studentId: request.body.studentId, organizationId: null},
      {courseId: request.body.courseId, studentId: null, organizationId: request.body.organizationId}]}, async (error, doc) => { 
      
      if (error) response.status(500).send('INTERNAL SERVER ERROR'); //server broke
      if (doc) response.status(409).send('REQUEST ALREADY EXISTS'); //Should never return for now at least
      if (!doc) {
        if (request.body.description == null
          || request.body.courseId == null ||
          (request.body.organizationId != null && request.body.studentId != null)){ //cannot put both student and org request at the same time
          response.status(400).send('BAD REQUEST'); //ensure basic information is correct

        } else if (request.body.studentId == null){//create org request

          const course = await ClassModel.findById(request.body.courseId); // not finding?
          if (course == null) {
            response.status(404).send('ClASS DOES NOT EXIST');
            return;
          }

          const org = await OrgModel.findById(request.body.organizationId); // not finding?
          if (org == null) {
            response.status(404).send(' ORGANIZATION DOES NOT EXIST');
            return;
          }

          const newRequest = new RequestModel({
            name: org.name,
            courseName: course.name,
            description: request.body.description,
            courseId: request.body.courseId,
            organizationId: request.body.organizationId,
            status: "UNKNOWN",
          });
          await newRequest.save(); 
          response.send('OK');
        } else if (request.body.organizationId == null){

          const course = await ClassModel.findById(request.body.courseId); // not finding?
          if (course == null) {
            response.status(404).send('ClASS DOES NOT EXIST');
            return;
          }

          const student = await UserModel.findById(request.body.studentId); // not finding?
          if (student == null || student.role != "STUDENT") {
            response.status(404).send(' STUDENT DOES NOT EXIST');
            return;
          }

          const newRequest = new RequestModel({
            name: student.name,
            courseName: course.name,
            description: request.body.description,
            courseId: request.body.courseId,
            studentId: request.body.studentId,
            status: "UNKNOWN",
          });
          await newRequest.save(); 
          response.send('OK');
        }
      }

    });
  },
  //Update request
  /*
  {
    requestId: "objectid(abdsadads)"
    accept: boolean
  }

  */
  updateRequest: (request, response) => {
    var newStatus = "REJECTED";
    if(request.body.accept != null) {
      if (request.body.accept) {
        newStatus = "ACCEPTED"
      }
    } else {
      response.status(400).send('BAD REQUEST');
      //change to false
    }

    RequestModel.findByIdAndUpdate(request.body.requestId, {status: newStatus}).then((request, error) => {
      if(!request) {response.status(404).send("REQUEST NOT FOUND");}
      if(error) {response.status(500).send("INTERNAL SERVER ERROR");
      } else {
        response.send('OK');
      }
    })

    .catch((error) => {
      response.status(500).send('INTERNAL SERVER ERROR');
    });

  },

  getOrgById: (request, response) => {
    if(request.query.orgId == null){
      response.status(400).send('BAD REQUEST');
      return;
    }

    OrgModel.findById(request.query.orgId).then((org, error) => {
      if(error) { 
        console.log(err);
        response.status(500).send("INTERNAL SERVER ERROR");}
      if (!org) {
        response.status(409).send("Org not found"); /* Have to replace this with somethong not string */
      }
      response.send(org);
      
    })
    .catch((error) => {
      response.status(500).send('INTERNAL SERVER ERROR');
    });
  },

  /*
  {
    "courseId": "objectid: adsddasdasdsa"
  }
  */
  getStudentRequestById: (request, response) => {
    if(request.query.courseId == null){
      response.status(400).send('BAD REQUEST');
      return;
    }

    RequestModel.find({courseId: request.query.courseId, organizationId: null}, (err, students) => {
      if(err) {
        console.log(err);
        response.status(500).send("INTERNAL SERVER ERROR");}
      if (!students) {
        response.status(404).send("no student requests for course"); /* Have to replace this with somethong not string */
      }
      response.send(students);

    })
  },

  getOrgRequestById: (request, response) => {
    if(request.query.courseId == null){
      response.status(400).send('BAD REQUEST');
      return;
    }

    RequestModel.find({courseId: request.query.courseId, studentId: null}, (err, orgs) => {
      if(err) {
        console.log(err);
        response.status(500).send("INTERNAL SERVER ERROR");}
      if (!orgs) {
        response.status(404).send("no student requests for course"); /* Have to replace this with somethong not string */
      }
      response.send(orgs);

    })
  }

};
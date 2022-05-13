const EnrolledModel = require('./Schemas/Enrolled');
const ClassModel = require('./Schemas/Class');
const UserModel = require('./Schemas/User');

/*
{
  "_id": "ObjectId(\"234hhb4353k2\")",
  "classId": "ObjectId(\"234hhb4353k2\",
  "studentId": "ObjectId(\"234hhb4353k2\",
}
*/

module.exports = {
    create: (request, response) => {

        //check request body structure
        if (request.body.classId == null || request.body.studentId == null) {
            response.status(400).send('BAD REQUEST'); return;
        }

        //check for duplication
        EnrolledModel.findOne({ classId: request.body.classId, studentId: request.body.studentId }, async (error, doc) => { 
            if (error) {response.status(500).send('INTERNAL SERVER ERROR'); return;}
            if (doc) {response.status(409).send('Enrollment Already Exists'); return;}
        });

        //check classId exists
        ClassModel.findById({ _id: request.body.classId }, async (error, doc) => {
            if (error) {response.status(500).send('INTERNAL SERVER ERROR'); return;}
            if (!doc) {response.status(404).send('DOES NOT EXIST'); return;}
        });

        //check studentId exists
        UserModel.findById({ _id: request.body.studentId }, async (error, doc) => {
            if (error) {response.status(500).send('INTERNAL SERVER ERROR'); return;}
            if (!doc) {response.status(404).send('DOES NOT EXIST'); return;}
        });

        //all checks complete, insert new enrollment
        new EnrolledModel({ classId: request.body.classId, studentId: request.body.studentId }).save( async (error, product) => {
            if (error) {response.status(500).send('INTERNAL SERVER ERROR'); return;}
            response.status(200).send('OK');
        });     
    },

    getEnrolled: (request, response) => {

        //check request query structure
        if (request.query.classId == null || request.query.studentId == null) {
            response.status(400).send('BAD REQUEST'); return;
        }

        //check for enrollment
        EnrolledModel.findOne({ classId: request.query.classId, studentId: request.query.studentId }, async (error, doc) => { 
            if (error) {response.status(500).send('INTERNAL SERVER ERROR'); return;}
            if (!doc) {response.status(404).send('DOES NOT EXIST'); return;}
            response.status(200).send('OK')
        });

    }
}

const Submission = require('./Schemas/Submission');
const UserModel = require('./Schemas/User');
const ClassModel = require('./Schemas/Class')
const AssgnModel = require('./Schemas/Assignment')
const mongoose = require('mongoose');

/*
{
  "_id": "ObjectId(\"234hhb4353k2\")",
  "sId": "ObjectId(\"234hhb4353k2\")",
  "aId": "ObjectId(\"234hhb4353k2\")",
  "link": "docs.google.com/?view=sdkfjgr274"
 }
*/

module.exports = {
    create: (request, response) => {

        //leaving for now as in the future we might want to prevent duplicates
        Submission.findOne({ sId: request.body.sId, aId: request.body.aId }, async (error, doc) => {

            if (error) response.send('INTERNAL SERVER ERROR', 500); //server broke
            if (doc) {
                if (request.body.link == null) response.status(400).send('BAD REQUEST');
                try {
                    await doc.updateOne({link: request.body.link});
                } catch (err) {
                    response.status(500).send('INTERNAL SERVER ERROR');
                    return
                }
                response.send('Updated', 201);
                return

            } //Should never return for now at least
            if (!doc) {

                if ( request.body.sId == null
                    || request.body.aId == null
                    || request.body.link == null){
                    response.status(400).send('BAD REQUEST');

                }else{
                    const user = await UserModel.findById(request.body.sId);
                    if (user == null || user.role != "STUDENT") {
                        response.status(404).send('DOES NOT EXIST');
                        return;
                    }

                    const newSubmission = new Submission({
                        sId: request.body.sId,
                        aId: request.body.aId,
                        link: request.body.link,
                        grade: ''
                    });
                    await newSubmission.save();
                    response.send('OK');
                }
            }

        });
    },
    retrieve: (request,response) => {
        // authorization path...
        // instructor -> class -> assignment -> submissions
        
        //check request query structure
        if (request.query.instructorId == null 
            || request.query.classId == null 
            || request.query.assignmentId == null) {
            response.status(400).send('BAD REQUEST'); return;
        }

        //check if instructorId exists
        UserModel.findById({ _id: request.query.instructorId }, async (error, doc) => {
            if (error) {response.status(500).send('INTERNAL SERVER ERROR'); return;}
            if (!doc) {response.status(404).send('DOES NOT EXIST'); return;}

            //check if classId exists and taught by instructorId
            ClassModel.findOne({ _id: request.query.classId, instructorId: request.query.instructorId }, async (error,doc) => {
                if (error) {response.status(500).send('INTERNAL SERVER ERROR'); return;}
                if (!doc) {response.status(404).send('DOES NOT EXIST'); return;}

                //check if assignmentId exists and used in classId
                AssgnModel.findOne({ _id: request.query.assignmentId, classId: request.query.classId}, async (error,doc) => {
                    if (error) {response.status(500).send('INTERNAL SERVER ERROR'); return;}
                    if (!doc) {response.status(404).send('DOES NOT EXIST'); return;}

                    //authentication complete
                    //get and return any submissions for assignmentId
                    Submission.find({ aId: request.query.assignmentId }, async (error, doc) => {
                        if (error) {response.status(500).send('INTERNAL SERVER ERROR'); return;}
                        if (!doc) {response.status(404).send('DOES NOT EXIST'); return;}
                        else {response.status(200).send(doc); return;}
                    })
                })
            })
        })
    },
    update: (request, response) => {
        // authorization path...
        // instructor -> class -> assignment -> submission -> update grade
        
        //check request body structure
        if (!request.body.submissionId
            || !request.body.grade) {
            response.status(400).send('BAD REQUEST'); return;
        }

        //check if submissionId exists and for assignmentId, and update it
        Submission.findOneAndUpdate(
            { _id: request.body.submissionId },
            {grade: request.body.grade},
             (error, doc) => {
                if (error) {response.status(500).send('INTERNAL SERVER ERROR'); return;}
                if (!doc) {response.status(404).send('DOES NOT EXIST'); return;}
                else {response.status(200).send('OK')}
        })
}
};
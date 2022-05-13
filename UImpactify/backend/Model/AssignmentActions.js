const { response } = require('express');
const AssignmentModel = require('./Schemas/Assignment');
const ClassModel = require('./Schemas/Class');

/*
  name: String,
  description: String,
  classId: Schema.Types.ObjectId,
  point: Number,
  duedate: Date,
*/
module.exports = {
    /*
      localhost:4000/api/addAssignment
      {
        "name": "assign",
        "description": "des",
        "classId": "5fb1b09e59d1dc335483d1d7",
        "point": 10,
        "duedate": "2020-05-18 16:21:10Z"
      }
    */

    create: (request, response) => {
    
        //leaving for now as in the future we might want to prevent duplicates

        if(request.body.name == null
            || request.body.description == null
            || request.body.classId == null
            || request.body.point == null
            || request.body.duedate == null
            || request.body.link == null){
            response.status(400).send('BAD REQUEST');
            return;
        }

        ClassModel.findById(request.body.classId, async (err, clas) => {

            if (err) {
                console.log(err)
                response.status(500).send('INTERNAL SERVER ERROR');
                return;
            }
    
            if (clas == null) {
                response.status(404).send('DOES NOT EXIST');
                return;
            }
        
            const newAssignment = new AssignmentModel({
                name: request.body.name,
                description: request.body.description,
                classId: request.body.classId,
                point: request.body.point,
                duedate: request.body.duedate,
                link: request.body.link
            });
    
            await newAssignment.save()
            response.send('OK')
        });

        
    },

    /*
        localhost:4000/api/getAssignment?classId=5fb1b09e59d1dc335483d1d7
    */
    getAssignment: (request,response) => {
        if(request.query.classId == null){
            response.status(400).send('BAD REQUEST');
            return;
        }
    
        ClassModel.findById(request.query.classId, (err, clas) => {
            if (err) {
                console.log(err)
                response.status(500).send('INTERNAL SERVER ERROR');
                return;
            }
            if (clas == null) {
                response.status(404).send('DOES NOT EXIST');
                return;
              }
    
              AssignmentModel.find({classId: request.query.classId}).then((assignments, error) => {
                if(error) response.send("INTERNAL SERVER ERROR", 500);
                response.send(assignments);
                
              })
                  .catch((error) => {response.status(500).send('INTERNAL SERVER ERROR')});
    
        });
    },

    /* 
        localhost:4000/api/getAssignmentById
        {
            "assignmentId": "5fb31c2c86c9bb0b941c540d"
        }
    */
  getAssignmentById: (request,response) => {

    if(request.body.assignmentId == null){
      response.status(400).send('BAD REQUEST');
      return;
    }

    AssignmentModel.findById(request.body.assignmentId).then((assignment, error) => {
      if(error) { response.status(500).send("INTERNAL SERVER ERROR");}
      if (!assignment) {
        response.status(409).send("Assignment not found");         
        //return { success: false, result: 'Class not found' }; /* Have to replace this with somethong not string */
      }
    response.send(assignment);
    
    })
      .catch((error) => {
        console.log(error);
        response.status(500).send('INTERNAL SERVER ERROR');
      });
  }
  

};
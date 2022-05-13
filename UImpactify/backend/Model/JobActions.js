const { response } = require('express');
const JobModel = require('./Schemas/Job');
const OrgModel = require('./Schemas/Organization');


module.exports = {
  create: (request, response) => {

    //leaving for now as in the future we might want to prevent duplicates
    if(request.body.name == null
        || request.body.description == null
        || request.body.orgId == null
        || request.body.volunteerOp == null
        || request.body.opportunityLink == null){
        response.status(400).send('BAD REQUEST');
        return;
    }
    
    OrgModel.findById(request.body.orgId, async (err, org) => {

        if (err) {
            console.log(err)
            response.status(500).send('INTERNAL SERVER ERROR');
            return;
        }

        if (org == null) {
            response.status(404).send('DOES NOT EXIST');
            return;
        }
    
        const newJob = new JobModel({
            name: request.body.name,
            description: request.body.description,
            orgId: request.body.orgId,
            volunteerOp: request.body.volunteerOp,
            opportunityLink: request.body.opportunityLink
        });

        await newJob.save()
        response.send('OK')
    });
    

},
  retrieve: (request,response) => {

    if(request.query.orgId == null){
        response.status(400).send('BAD REQUEST');
        return;
    }

    OrgModel.findById(request.query.orgId, (err, org) => {
        if (err) {
            console.log(err)
            response.status(500).send('INTERNAL SERVER ERROR');
            return;
        }
        if (org == null) {
            response.status(404).send('DOES NOT EXIST');
            return;
          }

          JobModel.find({orgId: request.query.orgId}).then((jobs, error) => {
            if(error) response.send("INTERNAL SERVER ERROR", 500);
            response.send(jobs);
            
          })
              .catch((error) => {response.status(500).send('INTERNAL SERVER ERROR')});

    });
    
    
  },

  getJobById: (request,response) => {

    if(request.body.jobId == null){
        response.status(400).send('BAD REQUEST');
        return;
    }

    JobModel.findById(request.body.jobId).then((job, error) => {
      if(error) { response.status(500).send("INTERNAL SERVER ERROR");}
      if (!job) {
        response.status(409).send("Job not found");         
        //return { success: false, result: 'Class not found' }; /* Have to replace this with somethong not string */
      }
    response.send(job);
    
    })
      .catch((error) => {
        console.log(error);
        response.status(500).send('INTERNAL SERVER ERROR');
      });
  }
  

};
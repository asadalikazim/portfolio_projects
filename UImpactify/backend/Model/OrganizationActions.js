const OrgModel = require('./Schemas/Organization');
const UserModel = require('./Schemas/User');
var mongoose = require('mongoose');

/*
{
  "name": "Microsoft",
  "about": "We are a software company",
  "website": "www.microsoft.com",
  "address": "1077 Stevenson Ave.",
  "phoneNum": 4858385093,
  "ownerId": "ObjectId(sdfsdfwkrfw45)",
  "rating": 4
}
*/

module.exports = {
  create: (request, response) => {
    
    //leaving for now as in the future we might want to prevent duplicates
    OrgModel.findOne({ ownerId: request.body.ownerId }, async (error, doc) => { 
      
      if (error) response.status(500).send('INTERNAL SERVER ERROR'); //server broke
      if (doc) response.status(409).send('ORGANIZATION ALREADY EXISTS'); //Should never return for now at least
      if (!doc) {
  
        if ( request.body.name == null
          || request.body.about == null
          || request.body.website == null
          || request.body.address == null
          || request.body.phoneNum == null
          || request.body.ownerId == null){
          response.status(400).send('BAD REQUEST');

        }else{
          const user = await UserModel.findById(request.body.ownerId); // not finding?
          if (user == null || user.role != "INITIATIVE") {
            response.status(404).send('DOES NOT EXIST');
            return;
          }

          const newOrg = new OrgModel({
            name: request.body.name,
            about: request.body.about,
            website: request.body.website,
            address: request.body.address,
            phoneNum: request.body.phoneNum,
            ownerId: request.body.ownerId,
            rating: request.body.rating,
          });
          await newOrg.save(); 
          response.send('OK');
        }
      }

    });
  },
  getOrg: (response) => {
    OrgModel.find({}).then((orgs, error) => {
      if(error) { response.send("INTERNAL SERVER ERROR", 500);}
      if (!orgs) {
        return { success: false, result: 'User not found' }; /* Have to replace this with somethong not string */
      }
      response.send(orgs);
      
    })
        .catch((error) => ({ success: false, result: error }));
  },

  getOrgById: (request, response) => {
    console.log(request)
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

  getOrgByUid: (request, response) => {

    if(request.query.userId == null){
      response.status(400).send('BAD REQUEST');
      return;
    }

    OrgModel.findOne({ownerId: mongoose.Types.ObjectId(request.query.userId)}, (err, org) => {
      if(err) {
        console.log(err);
        response.status(500).send("INTERNAL SERVER ERROR");}
      if (!org) {
        response.status(404).send("Org not found"); /* Have to replace this with somethong not string */
      }
      response.send(org);

    })
  }

};
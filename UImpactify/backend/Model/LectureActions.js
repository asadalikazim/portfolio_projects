const ClassModel = require('./Schemas/Class');
const LecModel = require('./Schemas/Lecture');

/*
{
  name: String,
  description: String,
  classId: Schema.Types.ObjectId,
  url: String,
}
*/

module.exports = {

  /*
      localhost:4000/api/getLecture
      {
        "name": "tname2",
        "description": "tdescription2",
        "classId": "5fb1b09e59d1dc335483d1d7",
        "url": "www.test2.com"
      }
    */
  create: (request, response) => {
    
    //leaving for now as in the future we might want to prevent duplicates

    if( request.body.name == null
      || request.body.description == null
      || request.body.classId == null
      || request.body.url == null){
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
  
      const newLecture = new LecModel({
          name: request.body.name,
          description: request.body.description,
          classId: request.body.classId,
          url: request.body.url,
      });

      await newLecture.save()
      response.send('OK')
    });

  },

  /*
    localhost:4000/api/getLecture?classId=5fb1b09e59d1dc335483d1d7
  */
  getLecture: (request,response) => {
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

          LecModel.find({classId: request.query.classId}).then((lectures, error) => {
            if(error) response.send("INTERNAL SERVER ERROR", 500);
            response.send(lectures);
            
          })
              .catch((error) => {response.status(500).send('INTERNAL SERVER ERROR')});

    });
  },

  getLectureById: (request,response) => {

    if(request.body.lectureId == null){
      response.status(400).send('BAD REQUEST');
      return;
    }

    LecModel.findById(request.body.lectureId).then((lecture, error) => {
      if(error) { response.status(500).send("INTERNAL SERVER ERROR");}
      if (!lecture) {
        response.status(409).send("Lecture not found");         
        //return { success: false, result: 'Class not found' }; /* Have to replace this with somethong not string */
      }
    response.send(lecture);
    
    })
      .catch((error) => {
        console.log(error);
        response.status(500).send('INTERNAL SERVER ERROR');
      });
  }

};
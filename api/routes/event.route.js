const express = require('express');
const app = express();
const eventRoutes = express.Router();

// Require Event model in our routes module
let EventModel = require('../models/event');

// Defined store route
eventRoutes.route('/add').post(function (req, res) {
  console.log(req.body);

  let theEvent = new EventModel(req.body);
  theEvent.save()
    .then(theEvent => {
      res.status(200).json({'theevent': 'event in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
eventRoutes.route('/').get(function (req, res) {
  EventModel.find(function (err, events){
    if(err){
      console.log(err);
    }
    else {
      res.json(events);
    }
  });
});


// // Defined edit route
// eventRoutes.route('/edit/:id').get(function (req, res) {
//   let id = req.params.id;
//   Business.findById(id, function (err, business){
//       res.json(business);
//   });
// });

// //  Defined update route
// eventRoutes.route('/update/:id').post(function (req, res) {
//     Business.findById(req.params.id, function(err, next, business) {
//     if (!business)
//       return next(new Error('Could not load Document'));
//     else {
//         business.person_name = req.body.person_name;
//         business.business_name = req.body.business_name;
//         business.business_gst_number = req.body.business_gst_number;

//         business.save().then(business => {
//           res.json('Update complete');
//       })
//       .catch(err => {
//             res.status(400).send("unable to update the database");
//       });
//     }
//   });
// });

// // Defined delete | remove | destroy route
// eventRoutes.route('/delete/:id').get(function (req, res) {
//     Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
//         if(err) res.json(err);
//         else res.json('Successfully removed');
//     });
// });
module.exports = eventRoutes;

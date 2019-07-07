const express = require('express');
const app = express();
const eventRoutes = express.Router();

// Require Event model in our routes module
let TheEvent = require('../models/event');

// Defined store route
eventRoutes.route('/add').post(function (req, res) {
  console.log(req.body);

  let theEvent = new TheEvent(req.body);
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
  TheEvent.find(function (err, events){
    if(err){
      console.log(err);
    }
    else {
      res.json(events);
    }
  });
});


module.exports = eventRoutes;

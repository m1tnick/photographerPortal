import express from 'express';
const app = express();
const eventRoutes = express.Router();

// Require Event model in our routes module
import EventModel from '../models/event';

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


// Defined edit route
eventRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  EventModel.findById(id, function (err, photoEvent){
      res.json(photoEvent);
  });
});

// //  Defined update route
eventRoutes.route('/update/:id').post(function (req, res, next) {
  EventModel.findById(req.params.id)
    .then(eventRes => {
      eventRes.name = req.body.name;
      eventRes.type = req.body.type;
      eventRes.date = req.body.date;

      eventRes.save().then(business => {
        res.json('Update complete');
      })

    }).catch(err => res.status(404).send("Event not found"))
});

// Defined delete | remove | destroy route
eventRoutes.route('/delete/:id').get(function (req, res) {
  EventModel.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

export default eventRoutes;
// module.exports = eventRoutes;

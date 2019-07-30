import express from 'express';
import EventModel from '../models/event';

const eventRoutes = express.Router();

eventRoutes.get('/', (req, res, next) => {
    EventModel.find().then(events => {
        res.status(200).json(events);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

eventRoutes.post('/add', (req, res) => {
    const theEvent = new EventModel(req.body);

    theEvent.save()
        .then(theEvent => {
            res.status(201).json({ 'theevent': 'event in added successfully' });
        })
        .catch(err => {
            res.status(400).send('unable to save to database');
        });
});

eventRoutes.get('/:id', (req, res) => {
    const id = req.params.id;
    EventModel.findById(id).then((photoEvent) => {
        if (photoEvent) {
            res.status(200).json(photoEvent);
        } else {
            res.status(404).json({
                message: 'No valid entry found for provided ID'
            });
        }
    });
});

eventRoutes.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    EventModel.update({ _id: id }, { $set: updateOps })
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

    //   EventModel.findById(req.params.id)
    //     .then(eventRes => {
    //       eventRes.name = req.body.name;
    //       eventRes.type = req.body.type;
    //       eventRes.date = req.body.date;

    //       eventRes.save().then(business => {
    //         res.json('Update complete');
    //       })

    //     }).catch(err => res.status(404).send("Event not found"))
});

// Defined delete | remove | destroy route
eventRoutes.delete('/:id', (req, res) => {
    const id = req.params.id;

    EventModel.findByIdAndRemove({ _id: id })
        .then(result => {
            res.status(200).json('Successfully removed');
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

export default eventRoutes;

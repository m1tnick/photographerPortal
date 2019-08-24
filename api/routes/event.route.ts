import express from 'express';
import { EventModel } from '../models/photoEvent';
import mongoose from 'mongoose';

const eventRoutes = express.Router();

eventRoutes.get('/', (req, res, next) => {
    EventModel.find()
        .select('-__v')
        .then(events => {
            const response = {
                count: events.length,
                data: events.map(ev => {
                    return {
                        id: ev._id,
                        name: ev.name,
                        type: ev.type,
                        date: ev.date,
                        images: ev.images,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3005/events/' + ev._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

eventRoutes.post('/', (req, res) => {
    const photoEvent = new EventModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        type: req.body.type,
        date: req.body.date
    });

    photoEvent
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Created event successfully',
                data: {
                    id: result._id,
                    name: result.name,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/events/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            res.status(400).send({
                message: 'unable to save to database',
                error: err
            });
        });
});

eventRoutes.get('/:id', (req, res) => {
    const id = req.params.id;

    EventModel.findById(id)
        .select('-__v')
        .then((photoEvent) => {
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

    //   PhotoEvent.findById(req.params.id)
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

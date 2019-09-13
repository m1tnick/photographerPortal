import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';

import { IImage, ImageModel } from '../models/image';
import { EventModel } from '../models/event';
import FileSystemUtils from '../utils/fileSystem';
import StorageUtils from '../utils/storage';

const imageRoutes = express.Router();

const upload = multer({
    storage: StorageUtils.uploadFile('./uploads/events/'),
    limits: {
        fileSize: 1024 * 1014 * 5 // 5MB
    },
    fileFilter: StorageUtils.imageFilter
}).single('file');

imageRoutes.post('/:eventId', (req, res, next) => {
    upload(req, res, (err) => {
        /*
            TODO: Revert upload process in case of one of the errors below
        */

        if (!req.file) {
            res.status(400).json({
                error: 'Upload unexpected error or no file found!'
            });
            return;
        }

        EventModel.findById(req.params.eventId)
            .populate('images')
            .then(() => {
                const imageModel = new ImageModel({
                    filename: <string>req.file.filename,
                    mimeType:  <string>req.file.mimetype,
                    path:  <string>req.file.path,
                });

                imageModel
                    .save()
                    .then(imageSaved => {
                        EventModel.findByIdAndUpdate({ _id: req.params.eventId },
                            { $push: { images: imageSaved._id } },
                            { upsert: true, new: true }
                            ).then(() => {
                                res.status(200).json(imageSaved);
                            }).catch(error => {
                                console.error(error);
                                res.status(400).json({error: 'Error saving updating model with image'})
                            });
                    })
                    .catch(error => {
                        console.error(error);
                        res.status(400).json({ error: 'Error saving image.' });
                    });

            })
            .catch(error => {
                console.error(error);
                res.status(404).json({error: 'Event not found'})
            });
    });
});

imageRoutes.delete('/:eventId/:imageId', (req, res) => {
    const eventId = req.params.eventId;
    const imageId = req.params.imageId;

    EventModel.findByIdAndUpdate({ _id: eventId },
        { $pull: { images: imageId } },
        { new: true })
        .then(eventDoc => {
            ImageModel.findByIdAndRemove(imageId).then(
                removedImage =>  {
                    FileSystemUtils.removeFile(removedImage.path);
                },
                error => console.error(error)
            );

            res.status(200).json(eventDoc);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

export default imageRoutes;


// imageRoutes.post('/:eventId', (req, res, next) => {
//     upload(req, res, (err) => {
//         if (!req.files) {
//             res.status(400).json('Upload unexpected error or no file found!');
//             return;
//         }

//         if (req.files.length === 0) {
//             res.status(400).json('No files to be uploaded.');
//             return;
//         }

//         const uploadedImages = Array.isArray(req.files) ? req.files : [req.files];

//         const imagesArray: IImage[] = [];
//         for (const file of uploadedImages) {
//             const file = req.file;
//             imagesArray.push( new ImageModel({
//                     // _id: new mongoose.Types.ObjectId(),
//                     filename: <string>file.filename,
//                     mimeType:  <string>file.mimetype,
//                     path:  <string>file.path,
//                 })
//             );
//         }

//         ImageModel.collection.insertMany(imagesArray).then(resp => {
//             const ids = resp.ops.map(d => d._id);

//             EventModel.findByIdAndUpdate({ _id: req.params.eventId },
//                 { $push: { images: ids } },
//                 { upsert: true, new: true }
//             ).then(response => {
//                 console.log(response);

//                 res.status(200).json(response);
//             }).catch(error => {
//                 res.status(400).json(error);
//             });
//         });
//     });
// });

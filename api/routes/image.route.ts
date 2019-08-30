import express from 'express';
import multer from 'multer';

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
}).array('images', 50);

imageRoutes.post('/:id', (req, res) => {
    upload(req, res, (err) => {
        if (!req.files) {
            res.status(400).json('Upload unexpected error!');
        }
        const uploadedImages = Array.isArray(req.files) ? req.files : [req.files];

        const imagesArray: IImage[] = [];
        for (const file of uploadedImages) {
            imagesArray.push( new ImageModel({
                    // _id: new mongoose.Types.ObjectId(),
                    filename: <string>file.filename,
                    mimeType:  <string>file.mimetype,
                    path:  <string>file.path,
                })
            );
        }

        ImageModel.collection.insertMany(imagesArray).then(resp => {
            const ids = resp.ops.map(d => d._id);

            EventModel.findByIdAndUpdate({ _id: req.params.id },
                { $push: { images: ids } },
                { upsert: true, new: true }
            ).then(response => {
                res.status(200).json(response);
            }).catch(error => {
                res.status(400).json(error);
            });
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

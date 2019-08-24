import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { ImageDocument, ImageModel } from '../models/image';
import { EventModel } from '../models/photoEvent';
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

        const imagesArray: ImageDocument[] = [];
        for (const file of uploadedImages) {
            imagesArray.push( new ImageModel({
                    _id: new mongoose.Types.ObjectId(),
                    filename: <string>file.filename,
                    mimeType:  <string>file.mimetype,
                    path:  <string>file.path,
                })
            );
        }

        EventModel.findOneAndUpdate({ _id: req.params.id },
            { $push: { images: imagesArray } },
            { 'upsert': true, new: true }
        ).then(response => {
            res.status(200).json(response);
        }).catch(error => {
            res.status(400).json(error);
        });
    });
});

export default imageRoutes;

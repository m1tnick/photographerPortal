import mongoose, { Schema } from 'mongoose';

export type ImageDocument = mongoose.Document & {
    _id:  mongoose.Schema.Types.ObjectId,
    filename: String,
    mimeType: String,
    path: String,
    default: Boolean
};

const imageSchema: Schema = new mongoose.Schema({
    _id:  mongoose.Schema.Types.ObjectId,
    filename: String,
    mimeType: String,
    path: String,
    default: Boolean
});


export const ImageModel = mongoose.model<ImageDocument>('ImageModel', imageSchema);

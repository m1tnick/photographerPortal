import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
    _id:  mongoose.Schema.Types.ObjectId;
    filename: string;
    mimeType: string;
    path: string;
    default: boolean;
};

const imageSchema: Schema = new mongoose.Schema({
    _id:  mongoose.Schema.Types.ObjectId,
    filename: String,
    mimeType: String,
    path: String,
    default: Boolean
});


export const ImageModel = mongoose.model<IImage>('ImageModel', imageSchema);

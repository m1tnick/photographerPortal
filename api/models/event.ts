import mongoose, { Schema, Document } from 'mongoose';
import shortid from 'shortid';

export interface IEvent extends Document {
    name: string;
    date: Date;
    type: string;
    slug: string;
    images: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'ImageModel' }
    ]
};

const eventSchema: Schema = new Schema({
    name: String,
    date: Date,
    type: String,
    slug: String,
    images: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ImageModel'
        }
    ]
}, { timestamps: true });

eventSchema.pre<IEvent>('save', function(next) {
    if (!this.date) {
        this.date = new Date();
    }

    this.slug = shortid.generate();

    next();
});

export const EventModel = mongoose.model<IEvent>('EventModel', eventSchema);

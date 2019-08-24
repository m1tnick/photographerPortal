import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';

export type EventDocument = mongoose.Document & {
    name: String,
    date: Date,
    type: String,
    slug: String,
    images: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'ImageModel' }
    ]
};

const eventSchema: Schema = new mongoose.Schema({
    name: String,
    date: Date,
    type: String,
    slug: String,
    images: []
}, { timestamps: true });

eventSchema.pre<EventDocument>('save', function(next) {
    if (!this.date) {
        this.date = new Date();
    }

    this.slug = shortid.generate();

    next();
});

eventSchema.methods.routeFolder = function(): string {
    return `${this.type}/${this.date}/${this.slug}`;
};


export const EventModel = mongoose.model<EventDocument>('EventModel', eventSchema);

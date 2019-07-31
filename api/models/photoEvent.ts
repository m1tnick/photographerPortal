import mongoose, { Schema } from 'mongoose';

export type EventDocument = mongoose.Document & {
    name: String,
    date: Date,
    type: String
};

const eventSchema: Schema = new mongoose.Schema({
  name: String,
  date: Date,
  type: String
}, { timestamps: true });

eventSchema.pre('save', next => {
    if (!this.date) {
        this.date = new Date();
    }

    next();
});

export const PhotoEvent = mongoose.model<EventDocument>('PhotoEvent', eventSchema);

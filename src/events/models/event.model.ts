import mongoose, { Document, Schema } from 'mongoose';

interface IEvent extends Document {
    id: number;
    name: string;
    description: string;
    date: Date;
    location: string;
    duration: string;
    rating: number;
}

const EventSchema: Schema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    rating: { type: Number, required: true },
});

const EventModel = mongoose.model<IEvent>('Event', EventSchema);

export { IEvent, EventModel };

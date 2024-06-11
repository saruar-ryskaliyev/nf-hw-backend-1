import mongoose, { Document, Schema } from 'mongoose';

interface ICounter extends Document {
    _id: string;
    sequenceValue: number;
}

const CounterSchema: Schema = new Schema({
    _id: { type: String, required: true },
    sequenceValue: { type: Number, required: true },
});

const CounterModel = mongoose.model<ICounter>('Counter', CounterSchema);

export { ICounter, CounterModel };

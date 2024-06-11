import { CounterModel } from './counter.model';

const getNextSequenceValue = async (sequenceName: string): Promise<number> => {
    const sequenceDocument = await CounterModel.findByIdAndUpdate(
        { _id: sequenceName },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
    );
    return sequenceDocument.sequenceValue;
};

export { getNextSequenceValue };

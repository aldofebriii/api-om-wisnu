import mongoose, { Schema, Types } from "mongoose";

export interface IAcara {
    _id: string;
    date: string;
    day: string;
    eventManager: string;
    place: string;
    time: string;
    userId: Types.ObjectId;
};

const AcaraSchema = new mongoose.Schema<IAcara>({
    date: { type: String, required: true },
    day: { type: String, required: true },
    eventManager: { type: String, required: true },
    place: { type: String, required: true },
    time: { type: String, required: true },
    userId: {type: Schema.Types.ObjectId, ref: 'user'}
}, {timestamps: true});

export default mongoose.model('acara', AcaraSchema);

import mongoose, { Schema, Types } from "mongoose";

export interface IDomisili {
    _id: string;
    address: string;
    birthplace: string;
    country: string;
    gender: 'Pria' | 'Wanita';
    job: string;
    name: string;
    religion: string;
    status: 'Menikah' | 'Belum Menikah';
    createdAt: string;
    updatedAt: string;
    userId: Types.ObjectId;
};

const DomisiliSchema = new mongoose.Schema<IDomisili>({
    address: {type: String, required: true},
    birthplace: {type: String, required: true},
    country: {type: String, required: true},
    gender: {type: String, required: true},
    job: {type: String, required: true},
    name: {type: String, required: true},
    religion: {type: String, required: true},
    status: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'user'}
}, {timestamps: true});

export default mongoose.model('domisili', DomisiliSchema);

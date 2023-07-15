import mongoose, { Schema, Types } from "mongoose";
export interface IPengantar {
    _id: string;
    name: string;
    address: string;
    birthplace: string;
    job: string;
    country: string;
    religion: string;
    report: string;
    status: 'Menikah' | 'Belum Menikah';
    nik: number;
    createdAt: string;
    updatedAt: string;
    userId: Types.ObjectId;
};

const PengantarSchema = new mongoose.Schema<IPengantar>({
    name: {type: String, required: true},
    address: {type: String, required: true},
    birthplace: {type: String, required: true},
    job: {type: String, required: true},
    country: {type: String, required: true},
    religion: {type: String, required: true},
    report: {type: String, required: true},
    status: {type: String, required: true},
    nik: {type: Number, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'user'}
}, {timestamps: true});

export default mongoose.model('pengantar', PengantarSchema);

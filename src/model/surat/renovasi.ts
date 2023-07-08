import mongoose, { Schema, Types } from "mongoose";

export interface IRenovasi {
    address: string;
    name: string;
    noHp: string;
    renovAddress: string;
    userId: Types.ObjectId;
};

const RenovasiSchema = new mongoose.Schema<IRenovasi>({
    name: {type: String, required: true},
    address: {type: String, required: true},
    noHp: {type: String, required: true},
    renovAddress: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'user'}
}, {timestamps: true});

export default mongoose.model('renovasi', RenovasiSchema);

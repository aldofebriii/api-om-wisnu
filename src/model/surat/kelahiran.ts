import mongoose, { Schema, Types } from "mongoose";

export interface IKelahiran {
    _id: string;
    address: string;
    birthplace: string;
    childOrder: number;
    fatherName: string;
    motherName: string;
    gender: 'male' | 'female';
    job: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    userId: Types.ObjectId;
};

const KelahiranSchema = new mongoose.Schema<IKelahiran>({
    name: {type: String, required: true},
    address: {type: String, required: true},
    birthplace: {type: String, required: true},
    childOrder: {type: Number, required: true},
    fatherName: {type: String, required: true},
    motherName: {type: String, required: true},
    gender: {type: String, required: true},
    job: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'user'}
}, {timestamps: true});

export default mongoose.model('kelahiran', KelahiranSchema);

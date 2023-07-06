import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
    username: string;
    password: string;
}

export const UserDocs = Document && {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    bio: {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        birthplace: {
            type: String,
            required: true
        },
        country: String,
        religion: String,
        nik: Number,
        job: String,
        noHp: String,
        status: Number
    }
};

const UserSchema = new Schema(UserDocs);

export default mongoose.model('user', UserSchema);
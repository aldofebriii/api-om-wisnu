import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
    _id: string;
    username: string;
    password: string;
    role: 'user',
    bio: {
        name: string;
        address: string;
        birthplace: string;
        country: string;
        religion: string;
        nik: string;
        job: string;
        noHp: string;
        status: string;
    }
}

const UserSchema = new Schema<IUser>( {
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
        status: String
    }
});

export default mongoose.model('user', UserSchema);
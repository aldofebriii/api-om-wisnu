import mongoose from "mongoose";

export interface IAdmin {
    username: string;
    password: string;
    role: 'admin'
};

const AdminSchema = new mongoose.Schema<IAdmin>({
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'admin'}
});

export default mongoose.model('admin', AdminSchema);
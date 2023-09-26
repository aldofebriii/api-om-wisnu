import mongoose from "mongoose";

export interface IAdmin {
  username: string;
  password: string;
  role: "admin";
  bio: {
    name: string;
  };
}

const AdminSchema = new mongoose.Schema<IAdmin>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
  bio: {
    name: {
      type: String,
      required: true,
    },
  },
});

export default mongoose.model("admin", AdminSchema);

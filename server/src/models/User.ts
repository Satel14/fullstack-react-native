import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  id: string;
}

const userSchema: Schema = new Schema({
    email: {
     type: String,
     required: true,
     unique: true
    },
    password: {
     type: String,
     required: true
    },
    avatar: {
     type: String,
     default: "avatar"
    },
    date: {
     type: Date,
     default: Date.now
    }
   });

export default mongoose.model<IUser>("User", userSchema);
import mongoose, { Document, Schema } from "mongoose";

const todoSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    public: {
        type: Boolean,
    },
    completed: {
        type: Boolean,
    },
    userId: {
        type: String,
        required: true,
    },
});

export interface ITodo extends Document {
    title: string;
    description: string;
    year: number;
    public: boolean;
    compleated: boolean;
    userId: string;
}
export default mongoose.model<ITodo>("Todo", todoSchema);
// TODO: Put a real interfaces here
import joi from "joi";
export interface ITodo {
    title: string;
    description: string;
    year: number;
    public: boolean;
    completed: boolean;
    userId: string;
}
export interface IdTodo extends Document {
    _id: string;
   }
   export const todoSchema = joi.object({
    title: joi.string().min(5).max(30).trim(true).required(),
    description: joi.string().min(5).max(100).trim(true).required(),
    year: joi.number().integer().min(2022).max(2070).required(),
    public: joi.boolean(),
    completed: joi.boolean(),
    userId: joi.string(),
});

export type todoSchemeTypes = typeof todoSchema;
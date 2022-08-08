import joi from "joi";
import { Request } from "express";
export interface IUser {
    email: string;
    password: string;
}

export const userSchema = joi.object({
    email: joi.string().min(5).max(30).trim(true).required(),
    password: joi.string().min(3).max(20).trim(true).required(),
});
interface IUserAndId extends IUser {
    id: string;
}
export interface IRequest extends Request {
    user: IUserAndId;
}
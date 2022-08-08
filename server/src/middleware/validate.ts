import { todoSchemeTypes } from "todos.type";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import Todo from "../models/Todo";

export const tryCatchMiddleware = (fn: Function) =>
    async (req: Request, res: Response) => {
        try {
            const todo = await fn(req, res);
            return res.json(todo);
        }
        catch (e: any) {
            e.message = "Something went wrong";
            return res.status(500).json({ e: e.message });
        }

    };


export const isExistInBase = () =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const findId = await Todo.findById({ _id: id });
            if (findId === null) throw Error("error");
            return next();
        }
        catch (e: any) {
            e.message = "Error";
            return res.status(500).json({ e: e.message });
        }
    };


export const bodyValidation = (schema: Joi.Schema<todoSchemeTypes>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json(error);
        } else {
            next();
        }
    };
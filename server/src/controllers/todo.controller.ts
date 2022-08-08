import { ITodo } from "./../types/todos.type";
import { IRequest } from "../types/user.type";
import { Request } from "express";
import TodoService from "../services/todo.service";
export class TodoController {
    constructor(private todoService: TodoService) { }
    async getAllTodo(req: IRequest )  {
        return await this.todoService.findAll(req.user.id);
    }

    async createOneTodo(req: IRequest) {
        return await this.todoService.create(req.body, req.user.id);
    }

    async updateTodoById(req: Request<{id: string}, {}, ITodo>) {
        return await this.todoService.update(req.body, req.params.id);

    }
    async deleteTodoById(req: Request<{id: string}, {}, ITodo>) {
        return await this.todoService.delete(req.params.id);
    }
    async getTodoById(req: Request<{id: string}, {}, ITodo>) {
        return await this.todoService.findTodoById(req.params.id);
    }

}

const todoController = new TodoController(new TodoService());
export default todoController;
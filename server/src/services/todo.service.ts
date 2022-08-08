import { ITodo } from "./../types/todos.type";
import Todo from "../models/Todo";
export default class TodoService {
    async findAll(userId: string) {
        const findTodo = await Todo.find({ $or: [{ userId }, { public: true }] });
        return findTodo;
    }
    async create(todo: ITodo, userId: string) {
        const createTodo = await Todo.create({ ...todo, userId });
        return createTodo;
    }
    async update(todo: ITodo, id: string) {
        const updateTodo = await Todo.findByIdAndUpdate({ _id: id }, todo, { new: true });
        return updateTodo;
    }
    async delete(id: string) {
        const updateTodo = await Todo.findByIdAndDelete({ _id: id });
        return updateTodo;
    }
    async findTodoById(id: string) {
        const updateTodo = await Todo.findById({ _id: id });
        return updateTodo;
    }
}
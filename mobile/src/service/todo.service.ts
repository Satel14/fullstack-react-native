import axios from "axios";
import { ITodo } from "../types/type.todo";
import HttpService from "./http";
import { LOGIN_URI, REGISTER_URI } from "../data/utils";
class TodoService extends HttpService {
  constructor(
      baseUrl: string,
      fetchingService: typeof axios = axios,
      apiVersion: string,
  ) {
    super(baseUrl, fetchingService, apiVersion);
  }
  async getTodos() {
    return await this.get("");
  }
  async getTodoById(id: string) {
    return await this.get(id);
  }
  async addTodo(data: ITodo) {
    return await this.post<ITodo>(REGISTER_URI, data);
  }
  async updateTodo(id: string, data: ITodo) {
    return await this.put<ITodo>(LOGIN_URI, id, data);
  }

  async deleteTodo(id: string) {
    return await this.delete(id);
  }
}

export default TodoService;

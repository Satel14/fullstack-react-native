import { URLS } from "../data/utils";
import TodoService from "../service/todo.service";
import axios from "axios";
import UserService from "../service/user.service";
export const todoService = new TodoService(
    URLS.SERVER_URL, axios,
    URLS.URL_TODO_API);
export const userService = new UserService(
    URLS.SERVER_URL, axios,
    URLS.URL_USER_API);

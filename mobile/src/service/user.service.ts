export interface ITodo extends Document {
    title: string;
    description: string;
    year: number;
    completed: boolean;
    public: boolean;
   };
import axios from "axios";
import { IUser } from "../types/type.user";
import HttpService from "./http";
import { REGISTER_URI, LOGIN_URI } from "../data/utils";
class UserService extends HttpService {
  constructor(
      baseUrl:string,
      fetchingService: typeof axios = axios,
      apiVersion:string,
  ) {
    super(baseUrl,
        fetchingService,
        apiVersion);
  }
  async login(user:IUser) {
    return await this.post<IUser>(REGISTER_URI, user);
  }
  async register(data:IUser) {
    return await this.post<IUser>(LOGIN_URI, data);
  }
}
export default UserService;

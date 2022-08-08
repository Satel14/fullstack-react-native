import User from "../models/User";
import jwt from "jsonwebtoken";
import { SECRET } from "../middleware/hash";

export default class UserService {
    static generateAccessToken (id: string) {
        return jwt.sign({ id }, SECRET, { expiresIn: "12h" });
    }
    async register(email: string, password: string, done: any) {
        const user = await User.findOne({ email });
        if (user) {
            if (password === user.password) {
                return done(undefined, user);
            } else {
                return done(undefined, false);
            }
        }
        if (user == undefined) {
            return done(undefined, false);
        }
    }

    async login(email: string, done: any) {
        const user = await User.findOne({ email });
        if (!user) {
            return done(undefined, true);
        }
        if (user) {
            return done(undefined, false);
        }
    }
}
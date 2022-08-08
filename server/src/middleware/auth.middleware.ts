import jwt  from "jsonwebtoken";
import { SECRET } from "./hash";
import { Request, Response, NextFunction } from "express";
import { Strategy, ExtractJwt } from "passport-jwt";
import  UserService  from "../services/user.service";
import passport from "passport";
import User from "../models/User";


export const passportLoginAuthenticate = (req: Request, res: Response, next: Function) => {
    passport.authenticate( "login", async (error, user ) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res.send( { message: "User not found or bad password" });
      }
      if (user) {
        const token = UserService.generateAccessToken(user._id);
        return res.send({token, user});
      }
    })(req, res, next);
  };


export const passportSignupAuthenticate = (req: Request, res: Response, next: Function) => {
    passport.authenticate("signup", async (error, user ) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res.send( { message: "User not found or bad password" });
      }
      if (user) {
        const token = UserService.generateAccessToken(user._id);
        return res.send({ messsage: "Error", token, user });
    }})(req, res, next);
};

export const isValidToken =
    () => async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers?.authorization?.split(" ")[1];
            if (!token) {
                return res.status(403).json({ error: "Token  not  found" });
            }
            const data = jwt.verify(token, SECRET);
            req.user = data;
            return next();
        } catch (e: any) {
            return res.status(500).json({ e: "Token not  found " });
        }
    };

  export const jwtStrategy = new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
}, async (payload, done) => {
    try {
        const userId = await User.findById(payload.id);
        if (userId) {
            done(undefined, userId);
        } else {
            done(undefined, false);
        }
    } catch (error) {
        done(error);
    }
});


import type { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config.js";
import jwt, { type JwtPayload } from "jsonwebtoken"
import { User } from "../db.js";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token)
        return res.status(400).send({ message: "Session expired" })
    try {
        if (!JWT_SECRET)
            throw new Error("Unable to get jwt_secret")

        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload

        const currentUser = await User.findById(decoded._id)
        if (!currentUser)
            return res.status(400).send({ message: "Invalid token" })

        req.userId = currentUser._id
        req.username= currentUser.username
        next();

    } catch (e) {
        console.log(e)
        return res.status(500).send({ message: "Unable to authenticate" })
    }

}
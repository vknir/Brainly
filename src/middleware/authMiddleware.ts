import type { NextFunction, Request, Response } from "express";
import User from "../models/User.ts";
import jwt, { type JwtPayload } from "jsonwebtoken"

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token)
        return res.status(400).send({ message: "Token invalid" })

    const key = process.env.JWT_SECRET
    if (!key)
        return res.status(500).send({ message: "Unable to get jwt_secret" })
    const decodedToken = jwt.verify(token, key) as JwtPayload

    const checkUserId = User.findById(decodedToken._id)
    if (!checkUserId)
        return res.status(400).send({ message: "UserId not valid" })

    req.userId = decodedToken._id
    next()
}
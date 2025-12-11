import type { NextFunction, Request, Response } from "express";
import z from 'zod'

const CredentialValidator = z.object({
    password: z.string()
                .min(8)
                .max(18)
                .regex(/[A-Z]/, "Must contain atleast one capital letter")
                .regex(/^(?=.*[!@#$%^&*()?{}~]).+$/, "Must include atleast one special character"),
    username: z.string()
                .min(3)
                .max(11)
})

export default function inputMiddleware( req : Request, res: Response, next:NextFunction){
    const {username, password}= req.body
    try{
        CredentialValidator.parse({username, password})
        next();
    }catch(e){
        console.log(e)
        return res.status(403).send({message:"Credentials not valid"})
    }
}
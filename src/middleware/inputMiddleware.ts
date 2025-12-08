import { type NextFunction, type Request, type Response } from "express";
import z from "zod"


const CredentialValidator = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(8).max(20)
        .refine((val) => /[A-Z]/.test(val), { message: "needs uppercase" })
        .refine((val) => /[a-z]/.test(val), { message: "neesds lowercase" })
        .refine((val) => /\d/.test(val), { message: "One number required" })
        .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), { message: "One special character required" })
})

export default function inputMiddleware(req: Request, res: Response, next : NextFunction) {
      const account = {username : req.body.username, password: req.body.password}
      try{
        CredentialValidator.parse(account)
        next();
      }catch(err){
        console.log(err)
        res.status(411).send({message:"Error in inputs"})
      }
}
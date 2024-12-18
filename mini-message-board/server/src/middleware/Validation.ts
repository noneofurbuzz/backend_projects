import { NextFunction,Response,Request } from "express";
import { userSchema } from "../schema.ts";
import { ZodError } from "zod";

export function validateData(req:Request,res:Response,next:NextFunction){
    try {
        userSchema.parse(req.body)
        next()
    } catch (error) {
        if (error instanceof ZodError){
            console.log({error: "invalid data", details: error.format()})
            res.status(400).json({error: "invalid data", details: error.format()})
        }
        else{
            res.status(500).json({error: "internal server error"})
        }
    }
}
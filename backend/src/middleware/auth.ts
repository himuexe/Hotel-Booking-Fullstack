import { NextFunction, Request,Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global { // declare a custom type for Request 
    namespace Express {
        interface Request{
            userId: string;
        }
    }
}


const verifyToken = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.cookies["auth_token"];
    if(!token){
        return res.status(401).json({message: "unauthorized"});
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY as string); //verify if the token was created by us
        req.userId = (decoded as JwtPayload).userId; // getting userid from token 
        next();
    } catch (error) {
        return res.status(401).json({message: "unauthorized"});
    }
}
export default verifyToken ;
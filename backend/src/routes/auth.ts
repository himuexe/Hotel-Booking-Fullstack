import express from "express";
import { check, validationResult } from "express-validator";
import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import verifyToken from "../middleware/auth";

// /api/auth/login
const router = express.Router();
router.post("/login",[ check("email", "Email is required").isEmail(), //express-validator
    check("password", "Password with 6 or more characters is required").isLength({ min:6})
], async (req: Request, res: Response)=>{
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json({message: erros.array()})
    }

    const {email, password}= req.body; //destructuring password and email body

    try {
        const user = await User.findOne({email});
        if(!user){ //user is null
            return res.status(400).json({message: "Inavild Credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password); //true/false
        if(!isMatch){
            return res.status(400).json({message: "Inavild Credentials"});
        }
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string,{
            expiresIn: "1d",
        });

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",  
            maxAge: 86400000,
        })
        
        res.status(200).json({userId: user.id});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
});

router.get("/validate-token",verifyToken ,(req:Request, res:Response)=>{
res.status(200).send({userId: req.userId})
});
router.post("/logout",(req:Request, res:Response)=>{
    res.cookie("auth_token", "",{
        expires: new Date(0),
    })
    res.send();
})
export default router;
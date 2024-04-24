import express from 'express';
import { Request, Response } from 'express';
import User from "../models/user"
import jwt from 'jsonwebtoken'
import {check, validationResult} from 'express-validator'

const router = express.Router();

// /api/users/register
router.post("/register",[ //middleware for express-validator
    check("firstName", "First name is required ").isString(),
    check("lastName", "Last name is required ").isString(),
    check("email", "Email is required ").isEmail(),
    check("password", "Password with 6 or more characters is required").isLength({min:6})
], async(req:Request, res:Response)=>{
    const erros =validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json({message: erros.array()})
    }

    try {
        let user = await User.findOne({ // checking if user already exits [email]
            email: req.body.email,
        });

        if(user){
            return res.status(400).json({message: "User already exists"}) ;//  bad request
        }
        user = new User(req.body);
        await user.save(); //saves the new created user

        //creating token as user id
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string,{ 
            expiresIn: "1d",
        });
        // http cookie
        res.cookie("auth_token", token , { //"auth token"=>name of the token , token value , properties{}
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", //[in development] =>false , [in production] => true
            maxAge: 86400000, //1 day
        })
        return res.status(200).send({message: "User Registered OK"});
        
    } catch (error) {
        console.log(error); //log error to backend
        res.status(500).send({message: "Something went wrong"}); // to frontend
    }
})


export default router;
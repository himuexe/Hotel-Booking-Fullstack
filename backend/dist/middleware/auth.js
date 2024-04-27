"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies["auth_token"]; //get "auth_token" cookie
    if (!token) { // if there is no cookie send unauthorized
        return res.status(401).json({ message: "unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY); //verify if the token was created by us [jwt.verify]
        req.userId = decoded.userId; // getting userid from token  
        next(); //continue to the next function
    }
    catch (error) {
        return res.status(401).json({ message: "unauthorized" });
    }
};
exports.default = verifyToken;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import statements
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
//starting the express router
const router = express_1.default.Router();
// /api/users/register
router.post("/register", [
    (0, express_validator_1.check)("firstName", "First name is required ").isString(),
    (0, express_validator_1.check)("lastName", "Last name is required ").isString(),
    (0, express_validator_1.check)("email", "Email is required ").isEmail(),
    (0, express_validator_1.check)("password", "Password with 6 or more characters is required").isLength({ min: 6 })
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const erros = (0, express_validator_1.validationResult)(req); //check for erros [validationResult]
    if (!erros.isEmpty()) { //if errors are not empty
        return res.status(400).json({ message: erros.array() });
    }
    try {
        let user = yield user_1.default.findOne({
            email: req.body.email,
        });
        if (user) {
            return res.status(400).json({ message: "User already exists" }); //  bad request
        }
        user = new user_1.default(req.body);
        yield user.save(); //saves the new created user
        //creating token as user id
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });
        // http cookie
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", //[in development] =>false , [in production] => true
            maxAge: 86400000, //1 day
        });
        return res.status(200).send({ message: "User Registered OK" });
    }
    catch (error) {
        console.log(error); //log error to backend
        res.status(500).send({ message: "Something went wrong" }); // to frontend
    }
}));
exports.default = router;

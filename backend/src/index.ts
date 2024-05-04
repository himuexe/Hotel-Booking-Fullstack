//import statements
import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import mongoose from 'mongoose';
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'
import path from 'path'
import {v2 as cloudinary} from 'cloudinary';
import myHotelRoutes from './routes/my-hotels'

//cloudinary
//env keys
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})



mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);  //coonect to mongodb database [mongoose.connect]

const app = express();  //start the express server
//[app.use]
app.use(cookieParser());     // use cookieparser
app.use(express.json());    // convert to json file for post or put requests
app.use(express.urlencoded({ extended: true }));    //method inbuilt in express to recognize the incoming Request Object as strings or arrays. 
app.use(cors({                          // used cors for checking if the req is coming from frontend url only 
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
// directing routes
app.use(express.static(path.join(__dirname, "../../frontend/dist")))
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels",myHotelRoutes)

// starting the server at 7000 port
//[app.listen]
app.listen(7000, () => {
    console.log("Server is started at localhost:7000")
})
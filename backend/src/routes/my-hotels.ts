// import statements
import express from 'express';
import e, { Request, Response } from 'express';
import multer from 'multer'
import cloudinary from 'cloudinary'
import Hotel, { HotelType } from '../models/hotel';
import verifyToken from '../middleware/auth';
import { body } from 'express-validator';

//stating a new router [express.Router()]
const router = express.Router();

// multer configuration
const storage = multer.memoryStorage(); // want to save request in memory 
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5mb
    }
})


// api/my-hotels
router.post("/", verifyToken, [body("name").notEmpty().withMessage("Name is required"),      //post req for /api/my-hotels from index.ts, //validation || check function
body("city").notEmpty().withMessage("City is required"),
body("country").notEmpty().withMessage("Country is required"),
body("description").notEmpty().withMessage("Description is required"),
body("type").notEmpty().withMessage("Hotel Type is required"),
body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
], upload.array("imageFiles", 6), async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[]; // storing images in a variable
        const newHotel: HotelType = req.body;       // creating new hotel in the schema created [HotelType is the type used definedd in models]


        //upload the images to cloudinary
        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64") // converting image to a base64 string so that cloudinary can access 
            let dataURI = "data:" + image.mimetype + ";base64," + b64;  // creating a string that describes the image
            const res = await cloudinary.v2.uploader.upload(dataURI);  // using cloudinary sdk to upload our image to account
            return res.url
        })

        const imageUrls = await Promise.all(uploadPromises); // waits for all the images to get uploaded

        // if upload was successfull add the urls to the new hotels 
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId; // userid from the auth token 


        // save the new hotels in our database 
        const hotel = new Hotel(newHotel);
        await hotel.save();


        //return a 201 status
        res.status(201).send(hotel);

    } catch (error) {
        console.log("Error creating hotel: ", e);
        res.status(500).json({ message: "Something went wrong" });
    }
}) 

export default router;
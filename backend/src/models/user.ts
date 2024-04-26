//import statements
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
 // defining types for the user type [typescript]
export type UserType ={ 
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};
// making userSchema in mongodb collection
const userSchema = new mongoose.Schema({    //user Schema that will be created in mongodb [mongoose.Schema]
    email:{type:String, required:true , unique: true},
    password:{type:String, required:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
});
//middleware for mongodb
userSchema.pre("save", async function(next) { // any updates to the document gets saved
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8) //if password changed then use bcrypt to hash it [bcrypt.hash]
    }
    next(); // do the next thing 
});

const User = mongoose.model<UserType>("User", userSchema); // "User"=> mongodb dataname [mongoose.model]
export default User;


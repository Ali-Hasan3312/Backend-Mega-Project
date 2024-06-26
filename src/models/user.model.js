import {Schema, model} from "mongoose";
import bcrypt from "bcrypt"
import Jwt  from "jsonwebtoken";
const userSchema = new Schema({
    userName: {
        type: String,
       
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        
    },
    fullName: {
        type: String,
        required: true,
        trim: true, 
    },
    Avatar: {
        type: String, // Cloudnary url
        required: true,
    },
    coverImage: {
        type: String, // Cloudnary url
        
    },
    password: {
        type: String,
        required: [true, "password is required"],
        
    },
    refreshToken: {
        type: String,
       
        trim: true, 
    },
    watchHistory: [
        {
        type: Schema.Types.ObjectId,
        ref: "Video"
         
    },
],

}, {timestamps: true})

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()

});
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return Jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
        )
}

userSchema.methods.generateRefreshToken = function () {
    return Jwt.sign(
        {
            _id: this._id,
           

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
        )
}
export const User = model("User", userSchema)
import mongoose, { Schema } from "mongoose";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Please enter your full name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: 6
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Non-Binary', 'Other'],
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },  
    isVerified: {
        type: Boolean,
        default: false
    },
    passwordForgotToken: String,
    passwordForgotTokenExpiry: Date,
    verificationToken: String,
    verificationTokenExpiry: Date,
    refreshToken: String,
},{timestamps: true});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcryptjs.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    console.log('passwordCorrect?',password, typeof(password))
    console.log('pass?',this.password, typeof(this.password))
    return await bcryptjs.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function() {
    // payload, secertKey, options
    const payload = {
        _id: this._id,
        email: this._id,
        fullName: this.fullName
    }
    const secretKey = process.env.ACCESS_SECRET_KEY;
    const options = { expiresIn: process.env.ACCESS_EXPIRES };

    return jwt.sign(payload, secretKey, options)
}   
userSchema.methods.generateRefreshToken = function() {
    // payload, secertKey, options
    const payload = {
        _id: this._id,
    }
    const secretKey = process.env.REFRESH_SECRET_KEY;
    const options = { expiresIn: process.env.REFRESH_EXPIRES };

    return jwt.sign(payload, secretKey, options)
}   



export const User = mongoose.model('User', userSchema);

import mongoose from 'mongoose';
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'Fullname is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'User already exists'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    password: {
        type: String,
    },
    profile_picture: {
        type: String, // URL to the image
    },
    field:{
        type: String,
    },
    role: {
        type: String,
        enum: ['customer', 'trainer', 'admin'], // only these values are allowed
        default: 'customer' // default role if not provided
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

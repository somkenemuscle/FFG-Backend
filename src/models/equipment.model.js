import mongoose from 'mongoose';
const { Schema } = mongoose;

// Equipment Schema
const equipmentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Equipment name is required'],
        unique: true, // no duplicate equipment names
    },
    image: {
        type: String, // URL to the image
        required: [true, 'Equipment image is required'],
    }
}, { timestamps: true });

export const Equipment = mongoose.model('Equipment', equipmentSchema);

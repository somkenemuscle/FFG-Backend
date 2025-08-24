import mongoose from "mongoose";
const { Schema } = mongoose;

// Membership Plan Schema
const membershipPlanSchema = new Schema({
    name: {
        type: String,
        required: [true, "Plan name is required"],
        unique: true, // no duplicate plan names
    },
    type: {
        type: String,
        enum: ["monthly", "half-year", "yearly"],
        required: [true, "Plan type is required"],
    },
    durationInMonths: {
        type: Number,
        required: [true, "Duration in months is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    description: {
        type: String,
    },
}, { timestamps: true });

export const MembershipPlan = mongoose.model("MembershipPlan", membershipPlanSchema);

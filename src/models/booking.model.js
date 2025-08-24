// models/Booking.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  membershipPlan: {
    type: Schema.Types.ObjectId,
    ref: 'MembershipPlan',
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now, // default start now
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active',
  },
}, { timestamps: true });

export const Booking = mongoose.model('Booking', bookingSchema);

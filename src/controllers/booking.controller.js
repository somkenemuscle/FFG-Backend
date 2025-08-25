import { Booking } from "../models/booking.model.js";
import { MembershipPlan } from "../models/membership.model.js";

export const createBooking = async (req, res) => {
    const userId = req.user.id;
    try {
        const { membershipPlanId, startDate } = req.body;

        // Find the plan
        const plan = await MembershipPlan.findById(membershipPlanId);
        if (!plan) {
            return res.status(404).json({ success: false, message: "Plan not found" });
        }

        // Calculate endDate from duration
        const start = startDate ? new Date(startDate) : new Date();
        const end = new Date(start);
        end.setMonth(end.getMonth() + plan.durationInMonths);

        // Create booking
        const booking = await Booking.create({
            user: userId,
            membershipPlan: membershipPlanId,
            startDate: start,
            endDate: end,
        });

        const NewBooking = await Booking.findById(booking._id).populate('user membershipPlan');


        res.status(201).json({ success: true, data: NewBooking });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating booking", error: error.message });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;

        // find bookings for user and populate plan info
        const bookings = await Booking.find({ user: userId })
            .populate("membershipPlan") // include plan details
            .sort({ createdAt: -1 });   // newest first

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ success: false, message: "No bookings found for this user" });
        }

        res.status(200).json({ success: true, data: bookings });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching bookings", error: error.message });
    }
};
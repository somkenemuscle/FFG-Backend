import { User } from '../models/user.model.js';
import { Equipment } from '../models/equipment.model.js';
import { MembershipPlan } from '../models/membership.model.js';
import { Booking } from '../models/booking.model.js';



// Add a new Trainer
export const addTrainer = async (req, res) => {
  try {
    const { fullname, email, phoneNumber } = req.body;

    // Ensure all fields are provided
    if (!fullname || !email || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Create new trainer
    const trainer = new User({
      fullname,
      email,
      phoneNumber,
      role: "trainer"
    });

    await trainer.save();

    res.status(201).json({ message: "Trainer created successfully", trainer });
  } catch (error) {
    res.status(500).json({ message: "Error creating trainer", error: error.message });
  }
};

// Delete a Trainer
export const deleteTrainer = async (req, res) => {
  try {
    const { trainerId } = req.params;

    const trainer = await User.findOne({ _id: trainerId, role: "trainer" });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    await User.findByIdAndDelete(trainerId);

    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting trainer", error: error.message });
  }
};


// ✅ Get all trainers
export const getAllTrainers = async (req, res) => {
  try {
    const trainers = await User.find({ role: "trainer" }).select("-password");
    // .select("-password") hides passwords from response

    res.status(200).json({
      success: true,
      data: trainers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching trainers",
      error: error.message,
    });
  }
};

// ✅ Get all customers
export const getAllCustomers = async (req, res) => {
  try {
    const trainers = await User.find({ role: "customer" }).select("-password");
    // .select("-password") hides passwords from response

    res.status(200).json({
      success: true,
      data: trainers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching customers",
      error: error.message,
    });
  }
};


// ✅ Add new equipment
export const addEquipment = async (req, res) => {
  try {
    const { name, image } = req.body;

    // Check if equipment already exists
    const existing = await Equipment.findOne({ name });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Equipment with this name already exists",
      });
    }

    const equipment = await Equipment.create({ name, image });

    res.status(201).json({
      success: true,
      message: "Equipment added successfully",
      data: equipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding equipment",
      error: error.message,
    });
  }
};

// ✅ Delete equipment
export const deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;

    const equipment = await Equipment.findByIdAndDelete(id);

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Equipment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting equipment",
      error: error.message,
    });
  }
};

// ✅ Get all equipments
export const getAllEquipments = async (req, res) => {
  try {
    const equipments = await Equipment.find().sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      count: equipments.length,
      data: equipments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching equipments",
      error: error.message,
    });
  }
};

// ✅ Get all membership plans
export const getAllPlans = async (req, res) => {
  try {
    const plans = await MembershipPlan.find().sort({ durationInMonths: 1 }); // sort shortest to longest
    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching plans", error: error.message });
  }
};

// ✅ Add a membership plan
export const addMembershipPlan = async (req, res) => {
  try {
    const { name, type, durationInMonths, price, description } = req.body;

    const existing = await MembershipPlan.findOne({ name });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Plan with this name already exists",
      });
    }

    const newPlan = await MembershipPlan.create({
      name,
      type,
      durationInMonths,
      price,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Membership plan added successfully",
      data: newPlan,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete a membership plan
export const deleteMembershipPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlan = await MembershipPlan.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res.status(404).json({
        success: false,
        message: "Membership plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Membership plan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all bookings with user and plan details
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")         // show user basic info
      .populate("membershipPlan", "name price durationInMonths") // show plan info
      .sort({ createdAt: -1 });               // newest first

    res.status(200).json({ success: true, data: bookings });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching bookings", error: error.message });
  }
};
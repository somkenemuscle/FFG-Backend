import express from 'express';
import handleAsyncErr from '../utils/catchAsync.js'
const router = express.Router();
import { addTrainer, deleteTrainer, getAllTrainers, getAllCustomers, addEquipment, deleteEquipment, getAllEquipments, addMembershipPlan, deleteMembershipPlan, getAllPlans, getAllBookings } from '../controllers/admin.controller.js';

//Get all trainers
router.get("/trainers", handleAsyncErr(getAllTrainers));

//Get all trainers
router.get("/equipments", handleAsyncErr(getAllEquipments));

//Get all customers
router.get("/customers", handleAsyncErr(getAllCustomers));

//Get all membership plans
router.get("/membership-plans", handleAsyncErr(getAllPlans));

//Get all bookings
router.get("/bookings", handleAsyncErr(getAllBookings));

//Post membership plans
router.post("/membership-plans", handleAsyncErr(addMembershipPlan));

// add trainer
router.post("/add-trainer", handleAsyncErr(addTrainer));

// add equipment
router.post("/add-equipment", handleAsyncErr(addEquipment));

// delete trainer
router.delete("/delete-trainer/:id", handleAsyncErr(deleteTrainer));

// delete equipment
router.delete("/delete-equipment/:id", handleAsyncErr(deleteEquipment));

// delete membership plan
router.delete("/delete-membership-plan/:id", handleAsyncErr(deleteMembershipPlan));


export default router;
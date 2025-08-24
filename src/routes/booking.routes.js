import { createBooking, getUserBookings } from "../controllers/booking.controller.js";
import express from 'express';
import handleAsyncErr from '../utils/catchAsync.js'
const router = express.Router();

router.get('/', handleAsyncErr(getUserBookings));

router.post('/', handleAsyncErr(createBooking));




export default router;
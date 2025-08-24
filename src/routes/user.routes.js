import express from 'express';
import handleAsyncErr from '../utils/catchAsync.js'
const router = express.Router();
import { signInUser, signUpUser, signInAdmin } from '../controllers/user.controller.js';

// Signup post route
router.post("/signup", handleAsyncErr(signUpUser));

// POST login route
router.post("/login", handleAsyncErr(signInUser));

//Admin login route
router.post("/admin/login", handleAsyncErr(signInAdmin));


export default router;
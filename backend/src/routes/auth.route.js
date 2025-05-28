import express from "express";
import { login, logout, signup, updateProfile, checkAuth, sendOtp, verifyOtp} from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

router.put("/update-profile",protectRoute,updateProfile);

router.get("/check", protectRoute, checkAuth);
 
export default router;
import express from "express";
import {
  registerAccount,
  resetPassword,
  sendOTP,
  userLogin,
} from "../controllers/authController";

const route = express.Router();

route.post("/login", userLogin);
route.post("/register", registerAccount);
route.post("/reset-password", resetPassword);
route.post("/send-otp", sendOTP);

export default route;

import express from "express";
import { userLogin } from "../controllers/authController";

const route = express.Router();

route.post("/login", userLogin);
// router.post('/register', handleRegister)
// router.post('/forgot-password', handleResetPassword)

export default route;

import express from "express";
import { addFeedback, getUserByEmail } from "../controllers/userController";

const route = express.Router();

route.post("/get-user", getUserByEmail);
route.post('/add-feedback', addFeedback);

export default route;

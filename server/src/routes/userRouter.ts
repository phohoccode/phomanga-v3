import express from "express";
import { getUserByEmail } from "../controllers/userController";

const route = express.Router();

route.post("/get-user", getUserByEmail);

export default route;

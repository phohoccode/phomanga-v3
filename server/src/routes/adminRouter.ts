import express from "express";
import { getAllComments, getAllNotifications, getAllUsers } from "../controllers/adminController";

const route = express.Router();

route.post('/get-all-users', getAllUsers)
route.post('/get-all-comments', getAllComments)
route.post('/get-all-notifications', getAllNotifications)

export default route;
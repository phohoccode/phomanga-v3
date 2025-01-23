import express from "express";
import { getAllComments, getAllNotifications, getAllUsers } from "../controllers/adminController";
import {
  createNotification,
  deteleNotification,
  updateNotification,
} from "../controllers/notificationController";

const route = express.Router();

route.get("/get-all-users", getAllUsers);
route.get("/get-all-comments", getAllComments);
route.get("/get-all-notifications", getAllNotifications);
route.post("/delete-notification", deteleNotification);
route.post("/create-notification", createNotification);
route.post("/update-notification", updateNotification);

export default route;

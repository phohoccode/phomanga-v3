import express from "express";
import {
  getAllComments,
  getAllFeedbacks,
  getAllNotifications,
  getAllUsers,
  updateUserRole,
  updateVipLevels,
} from "../controllers/adminController";
import {
  createNotification,
  deleteNotification,
  updateNotification,
} from "../controllers/notificationController";

const route = express.Router();

route.get("/users", getAllUsers);
route.get("/comments", getAllComments);
route.get("/feedbacks", getAllFeedbacks);
route.get("/notifications", getAllNotifications);
route.post("/notification", createNotification);
route.delete("/notification", deleteNotification);
route.put("/notification/:id", updateNotification);
route.put("/user/:id/role", updateUserRole);
route.put("/user/:id/vip-level", updateVipLevels);

export default route;

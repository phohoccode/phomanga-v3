import express from "express";
import {
  addFeedback,
  getUserInfo,
} from "../controllers/userController";

const route = express.Router();

route.post("/get-user-info", getUserInfo);
route.post("/add-feedback", addFeedback);

export default route;

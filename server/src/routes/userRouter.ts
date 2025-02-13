import express from "express";
import {
  addFeedback,
  getUserInfo,
  getUserRankings,
  getUserStatistical,
  upgradeVipLevel,
} from "../controllers/userController";

const route = express.Router();

route.post("/get-user-info", getUserInfo);
route.post("/get-user-statistical", getUserStatistical);
route.post("/get-user-rankings", getUserRankings);
route.post("/add-feedback", addFeedback);
route.post("/upgrade-vip-level", upgradeVipLevel);

export default route;

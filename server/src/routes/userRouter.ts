import express from "express";
import {
  addFeedback,
  findUserByEmailAndTypeAccount,
  getUserInfo,
  getUserRankings,
  getUserStatistical,
} from "../controllers/userController";
import {
  createNotification,
  deleteNotification,
  getAllNotifications,
} from "../controllers/notificationController";
import {
  deleteAllComic,
  deleteComic,
  getAllComic,
  saveComic,
} from "../controllers/comicController";
import {
  addSearchHistory,
  deleteSearchHistory,
  getSearchHistory,
} from "../controllers/searchController";
import { getAllVipLevel } from "../controllers/vipLevelController";

const route = express.Router();

route.get("/info", getUserInfo);
route.get("/search", findUserByEmailAndTypeAccount);
route.get("/statistics", getUserStatistical);
route.get("/rankings", getUserRankings);
route.post("/add-feedback", addFeedback);

// notification
route.get("/notifications", getAllNotifications);
route.post("/notification", createNotification);
route.delete("/notification", deleteNotification);

// comic
route.get("/comics", getAllComic);
route.post("/comic", saveComic);
route.delete("/comic", deleteComic);
route.delete("/comics", deleteAllComic);

// search
route.get("/search-history", getSearchHistory);
route.post("/search-history", addSearchHistory);
route.delete("/search-history", deleteSearchHistory);

// vip
route.get("/vip-levels", getAllVipLevel);

export default route;

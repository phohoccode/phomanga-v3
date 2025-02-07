import express from "express";
import { getAllVipLevel } from "../controllers/vipLevelController";

const route = express.Router();

route.get('/get-all-vip-level', getAllVipLevel);

export default route;
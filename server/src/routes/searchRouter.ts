import express from "express";
import {
  addSearchHistory,
  deleteSearchHistory,
  getSearchHistory,
} from "../controllers/searchController";

const route = express.Router();

route.post("/get-search-history", getSearchHistory);
route.post("/add-search-history", addSearchHistory);
route.post("/delete-search-history", deleteSearchHistory);

export default route;

import express from "express";
import {
  deleteComic,
  getAllComic,
  saveComic,
} from "../controllers/comicController";

const route = express.Router();

route.post("/save-comic", saveComic);
route.post("/delele-comic", deleteComic);
route.post("/get-all-comic", getAllComic);

export default route;

import express from "express";
import {
  deleteAllComic,
  deleteComic,
  getAllComic,
  saveComic,
} from "../controllers/comicController";

const route = express.Router();

route.post("/save-comic", saveComic);
route.post("/delele-comic", deleteComic);
route.post("/delete-all-comic", deleteAllComic);
route.post("/get-all-comic", getAllComic);

export default route;

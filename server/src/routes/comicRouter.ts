import express from "express";
import { deleteComic, getAllSavedComic, saveComic } from "../controllers/comicController";

const route = express.Router();

route.post("/save-comic", saveComic);
route.post("/delete-save-comic", deleteComic);
route.post('/get-all-saved-comic', getAllSavedComic);

export default route;

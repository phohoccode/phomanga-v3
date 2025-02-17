import express from "express";
import {
  createComment,
  deleteComment,
  getComments,
  likeComment,
  unlikeComment,
  updateComment,
} from "../controllers/commentController";

const route = express.Router();

route.get("/comments", getComments);
route.post("/comment", createComment);
route.delete("/comment", deleteComment);
route.put("/comment/:id", updateComment);
route.post("/comment/like", likeComment);
route.delete("/comment/unlike", unlikeComment);

export default route;

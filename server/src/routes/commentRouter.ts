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

route.post("/get-comments", getComments);
route.post("/add-comment", createComment);
route.post("/delete-comment", deleteComment);
route.post("/update-comment", updateComment);
route.post("/like-comment", likeComment);
route.post("/unlike-comment", unlikeComment);

export default route;

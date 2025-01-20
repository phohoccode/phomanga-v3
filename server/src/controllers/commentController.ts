import { Request, Response } from "express";
import {
  handleCreateComment,
  handleDeleteComment,
  handleUnlikeComment,
  handleGetComments,
  handleLikeComment,
  handleUpdateComment,
} from "../services/commentService";

export const getComments = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { comicSlug, limit, page, sort } = req.body;

    if (!comicSlug || !limit || !page || !sort) {
      return res.status(400).json({
        message: "comicSlug, limit, page and sort are required!",
      });
    }

    const response = await handleGetComments(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const createComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, content, comicSlug } = req.body;

    if (!userId || !content || !comicSlug) {
      return res
        .status(400)
        .json({ message: "User ID, content and comicSlug are required!" });
    }

    const response = await handleCreateComment(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deleteComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { commentId } = req.body;

    if (!commentId) {
      return res.status(400).json({ message: "commentId is required!" });
    }

    const response = await handleDeleteComment(commentId);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { commentId, content } = req.body;
    if (!commentId || !content) {
      return res
        .status(400)
        .json({ message: "commentId and content are required!" });
    }
    const response = await handleUpdateComment(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};


export const likeComment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { commentId, userId } = req.body;
    if (!commentId || !userId) {
      return res.status(400).json({ message: "commentId and userId are required!" });
    }
    const response = await handleLikeComment(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};


export const unlikeComment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { commentId, userId } = req.body;
    if (!commentId || !userId) {
      return res.status(400).json({ message: "commentId and userId are required!" });
    }
    const response = await handleUnlikeComment(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

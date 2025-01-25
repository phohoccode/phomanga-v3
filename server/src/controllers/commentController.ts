import { Request, Response } from "express";
import {
  handleCreateComment,
  handleDeleteComment,
  handleUnlikeComment,
  handleGetComments,
  handleLikeComment,
  handleUpdateComment,
} from "../services/commentService";
import { error_server } from "../lib/define";

export const getComments = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { comicSlug, limit, page, sort } = req.body;

    if (!comicSlug || !limit || !page || !sort) {
      return res.status(400).json({
        status: "error",
        message: "ComicSlug, limit, page và sort là bắt buộc!",
      });
    }

    const response = await handleGetComments(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const createComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, content, comicSlug } = req.body;

    if (!userId || !content || !comicSlug) {
      return res.status(400).json({
        status: "error",
        message: "userId, content và comicSlug là bắt buộc!",
      });
    }

    const response = await handleCreateComment(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { commentId } = req.body;

    if (!commentId) {
      return res.status(400).json({
        status: "error",
        message: "commentId là bắt buộc!",
      });
    }

    const response = await handleDeleteComment(commentId);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const updateComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { commentId, content } = req.body;
    if (!commentId || !content) {
      return res.status(400).json({
        status: "error",
        message: "commentId và content là bắt buộc!",
      });
    }
    const response = await handleUpdateComment(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const likeComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { commentId, userId } = req.body;
    if (!commentId || !userId) {
      return res.status(400).json({
        status: "error",
        message: "commentId và userId là bắt buộc!",
      });
    }
    const response = await handleLikeComment(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const unlikeComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { commentId, userId } = req.body;
    if (!commentId || !userId) {
      return res.status(400).json({
        status: "error",
        message: "commentId và userId là bắt buộc!",
      });
    }
    const response = await handleUnlikeComment(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

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
import {
  rawDataDeleteComment,
  rawDataGetComments,
  rawDataUnlikeComment,
  rawDataUpdateComment,
} from "../lib/types";

export const getComments = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { comicSlug, limit, page, sort } = req.query;

    if (!comicSlug || !limit || !page || !sort) {
      return res.status(400).json({
        status: "error",
        message: "ComicSlug, limit, page và sort là bắt buộc!",
      });
    }

    const response = await handleGetComments(req.query as rawDataGetComments);

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
        message: "userId, content, comicSlug là bắt buộc!",
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
    const { commentId, userId } = req.query;

    if (!commentId || !userId) {
      return res.status(400).json({
        status: "error",
        message: "commentId và userId là bắt buộc!",
      });
    }

    const response = await handleDeleteComment(
      req.query as rawDataDeleteComment
    );

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
    const { id } = req.params;
    const { content, userId } = req.body;

    if (!content || !id || !userId) {
      return res.status(400).json({
        status: "error",
        message: "content, id và userId là bắt buộc!",
      });
    }

    const data: rawDataUpdateComment = { id, content, userId };
    const response = await handleUpdateComment(data);

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
    const { commentId, userId } = req.query;

    if (!commentId || !userId) {
      return res.status(400).json({
        status: "error",
        message: "commentId và userId là bắt buộc!",
      });
    }
    const response = await handleUnlikeComment(
      req.query as rawDataUnlikeComment
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

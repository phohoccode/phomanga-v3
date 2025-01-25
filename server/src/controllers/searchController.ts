import { Request, Response } from "express";
import {
  handleAddSearchHistory,
  handleDeleteSearchHistory,
  handleGetSearchHistory,
} from "../services/searchService";
import { error_server } from "../lib/define";

export const getSearchHistory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({
        status: "error",
        message: "User ID là bắt buộc!",
      });
    }

    const response = await handleGetSearchHistory(userId);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const addSearchHistory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.body.userId;
    const keyword = req.body.keyword;

    if (!userId || !keyword) {
      return res.status(400).json({
        status: "error",
        message: "User ID và từ khóa là bắt buộc!",
      });
    }

    const response = await handleAddSearchHistory(userId, keyword);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const deleteSearchHistory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, searchId } = req.body;

    if (!userId || !searchId) {
      return res.status(400).json({
        status: "error",
        message: "User ID và ID tìm kiếm là bắt buộc!",
      });
    }

    const response = await handleDeleteSearchHistory(userId, searchId);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

import { Request, Response } from "express";
import {
  handleAddSearchHistory,
  handleDeleteSearchHistory,
  handleGetSearchHistory,
} from "../services/searchService";
import { error_server } from "../lib/define";
import { rawDataGetSearchHistory } from "../lib/types";

export const getSearchHistory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, limit, page } = req.query;

    if (!userId || !limit || !page) {
      return res.status(400).json({
        status: "error",
        message: "User ID là bắt buộc!",
      });
    }

    const response = await handleGetSearchHistory(
      req.query as rawDataGetSearchHistory
    );

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
    const { userId, keyword } = req.body;

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
    const { userId, searchId } = req.query;

    if (!userId || !searchId) {
      return res.status(400).json({
        status: "error",
        message: "User ID và ID tìm kiếm là bắt buộc!",
      });
    }

    const response = await handleDeleteSearchHistory(
      userId as string,
      searchId as string
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

import { Request, Response } from "express";
import {
  handleAddSearchHistory,
  handleDeleteSearchHistory,
  handleGetSearchHistory,
} from "../services/searchService";

export const getSearchHistory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required!" });
    }

    const response = await handleGetSearchHistory(userId);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
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
      return res
        .status(400)
        .json({ message: "User ID and keyword are required!" });
    }

    const response = await handleAddSearchHistory(userId, keyword);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deleteSearchHistory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {userId, searchId} = req.body;

    if (!userId || !searchId) {
      return res.status(400).json({ message: "User ID and search ID are required!" });
    }

    const response = await handleDeleteSearchHistory(userId, searchId);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

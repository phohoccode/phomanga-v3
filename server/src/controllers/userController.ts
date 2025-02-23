import { Request, Response } from "express";
import {
  handleAddFeedback,
  handleFindUserByEmailAndTypeAccount,
  handleGetUserInfo,
  handleGetUserRankings,
  handleGetUserStatistical,
} from "../services/userService";
import { error_server } from "../lib/define";
import axios from "axios";
import { criterion, rawDataGetUserInfo } from "../lib/types";

export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await handleGetUserInfo(req.query as rawDataGetUserInfo);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const getUserStatistical = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(500).json({
        status: "error",
        message: "User ID is required!",
      });
    }

    const response = await handleGetUserStatistical(userId as string);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const getUserRankings = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { criterion } = req.query;

    if (!criterion) {
      return res.status(500).json({
        status: "error",
        message: "Criterion is required!",
      });
    }

    const response = await handleGetUserRankings(criterion as criterion);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const findUserByEmailAndTypeAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, typeAccount } = req.query;

    if (!email || !typeAccount) {
      return res.status(500).json({
        status: "error",
        message: "Email and Type Account are required!",
      });
    }

    const response = await handleFindUserByEmailAndTypeAccount(
      email as string,
      typeAccount as string
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const addFeedback = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, title, description } = req.body;

    if (!userId || !title || !description) {
      return res.status(500).json({
        message: "User ID, Title and Description are required!",
      });
    }

    const response = await handleAddFeedback(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

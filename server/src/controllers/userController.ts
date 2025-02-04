import { Request, Response } from "express";
import {
  handleAddFeedback,
  handleGetUserByEmail,
} from "../services/userService";
import { error_server } from "../lib/define";

export const getUserByEmail = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, typeAccount } = req.body;

    if (!email || !typeAccount) {
      return res.status(500).json({
        message: "Email và typeAccount là bắt buộc",
      });
    }

    const response = await handleGetUserByEmail(email, typeAccount);

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
        message: "userId, title và description là bắt buộc",
      });
    }

    const response = await handleAddFeedback(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

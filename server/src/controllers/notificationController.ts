import { Request, Response } from "express";
import {
  handleCreateNotification,
  handleDeleteNotification,
  handleGetAllNotifications,
  handleUpdateNotification,
} from "../services/notificationService";
import { error_server } from "../lib/define";

export const getAllNotifications = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { type, limit, page } = req.body;

    if (!type || !limit || !page) {
      return res.status(400).json({
        status: "error",
        message: "Type, limit, page là bắt buộc",
      });
    }

    const response: any = await handleGetAllNotifications(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const createNotification = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title, content, userId, type } = req.body;

    if (!title || !content || !userId || !type) {
      return res.status(400).json({
        status: "error",
        message: "Title, content, userId, type là bắt buộc",
      });
    }

    const response: any = await handleCreateNotification(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const deteleNotification = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { notificationId, userId } = req.body;

    if (!notificationId || !userId) {
      return res.status(400).json({
        status: "error",
        message: "NotificationId, userId là bắt buộc",
      });
    }

    const response: any = await handleDeleteNotification(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const updateNotification = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { notificationId, title, content, userId } = req.body;

    if (!notificationId || !title || !content || !userId) {
      return res.status(400).json({
        status: "error",
        message: "NotificationId, title, content, userId là bắt buộc",
      });
    }

    const response: any = await handleUpdateNotification(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

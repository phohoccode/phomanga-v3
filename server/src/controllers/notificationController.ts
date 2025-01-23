import { Request, Response } from "express";
import {
  handleCreateNotification,
  handleDeleteNotification,
  handleGetAllNotifications,
  handleUpdateNotification,
} from "../services/notificationService";

export const getAllNotifications = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { type, limit, page } = req.body;

    if (!type || !limit || !page) {
      return res.status(400).json({ message: "Type, limit, page là bắt buộc" });
    }

    const response: any = await handleGetAllNotifications(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const createNotification = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res
        .status(400)
        .json({ message: "Title, content, userId là bắt buộc" });
    }

    const response: any = await handleCreateNotification(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deteleNotification = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { notificationId, userId } = req.body;

    if (!notificationId || !userId) {
      return res
        .status(400)
        .json({ message: "Notification Id và userId là bắt buộc" });
    }

    const response: any = await handleDeleteNotification(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateNotification = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { notificationId, title, content } = req.body;

    if (!notificationId || !title || !content) {
      return res
        .status(400)
        .json({ message: "Notification Id, title, content là bắt buộc" });
    }

    const response: any = await handleUpdateNotification(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

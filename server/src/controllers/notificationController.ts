import { Request, Response } from "express";
import {
  handleCreateNotification,
  handleDeleteNotification,
  handleGetAllNotifications,
  handleUpdateNotification,
} from "../services/notificationService";
import { error_server } from "../lib/define";
import {
  rawDataDeleteNotification,
  rawDataGetAllNotifications,
} from "../lib/types";

export const getAllNotifications = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { type, limit, page, userId } = req.query;

    if (!type || !limit || !page || !userId) {
      return res.status(400).json({
        status: "error",
        message: "Type, limit, page, userId là bắt buộc",
      });
    }

    const response: any = await handleGetAllNotifications(
      req.query as rawDataGetAllNotifications
    );

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

export const deleteNotification = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { notificationId, userId, role } = req.query;

    if (!notificationId || !userId || !role) {
      return res.status(400).json({
        status: "error",
        message: "NotificationId, userId, role là bắt buộc",
      });
    }

    const response: any = await handleDeleteNotification(
      req.query as rawDataDeleteNotification
    );

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
    const { id } = req.params;
    const { title, content } = req.body;

    if (!id || !title || !content) {
      return res.status(400).json({
        status: "error",
        message: "NotificationId, title, content là bắt buộc",
      });
    }

    const data = {
      id,
      title,
      content,
    };
    const response: any = await handleUpdateNotification(data);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

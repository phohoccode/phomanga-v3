import { Request, Response } from "express";
import {
  handleGetAllComments,
  handleGetAllFeedbacks,
  handleGetAllNotifications,
  handleGetAllUsers,
  handleMarkUserCommentAsSpam,
  handleUpdateUserRole,
  handleUpdateVipLevels,
} from "../services/adminService";
import { error_server } from "../lib/define";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await handleGetAllUsers();

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const getAllComments = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await handleGetAllComments();

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const getAllNotifications = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await handleGetAllNotifications();

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const getAllFeedbacks = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await handleGetAllFeedbacks();

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const updateUserRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!id || !role) {
      return res.status(400).json({
        status: "error",
        message: "User ID and Role are required!",
      });
    }

    const response = await handleUpdateUserRole(id, role);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const updateVipLevels = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { idVipLevel } = req.body;

    if (!id || !idVipLevel) {
      return res.status(400).json({
        status: "error",
        message: "User ID and Vip Level ID are required!",
      });
    }

    const response = await handleUpdateVipLevels(id, idVipLevel);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

export const markUserCommentAsSpam = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Comment ID is required!",
      });
    }

    const response = await handleMarkUserCommentAsSpam(id);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

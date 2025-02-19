import { Request, Response } from "express";
import {
  handleGetAllComments,
  handleGetAllFeedbacks,
  handleGetAllNotifications,
  handleGetAllUsers,
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
        message: "UserId hoặc role là bắt buộc!",
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

    console.log(">>> id", id);
    console.log(">>> idVipLevel", idVipLevel);

    if (!id || !idVipLevel) {
      return res.status(400).json({
        status: "error",
        message: "UserId hoặc idVipLevel là bắt buộc!",
      });
    }

    const response = await handleUpdateVipLevels(id, idVipLevel);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

import { Request, Response } from "express";
import {
  handleGetAllComments,
  handleGetAllNotifications,
  handleGetAllUsers,
} from "../services/adminService";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await handleGetAllUsers();

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
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
    return res.status(500).json({ message: "Internal Server Error", error });
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
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

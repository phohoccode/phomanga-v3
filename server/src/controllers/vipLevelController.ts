import { Request, Response } from "express";
import { error_server } from "../lib/define";
import { handleGetAllVipLevel } from "../services/vipLevelService";

export const getAllVipLevel = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await handleGetAllVipLevel();

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

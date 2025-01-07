import { Request, Response } from "express";
import { handleGetUserByEmail } from "../services/userService";

const getUserByEmail = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log(">> req.body", req.body);

    const email = req.body?.email;

    if (!email) {
      return res.status(500).json({
        message: "Email là bắt buộc",
      });
    }

    const response = await handleGetUserByEmail(email);

    return res.status(200).json(response);
  } catch (error) {
    console.log(">>> error-userLogin", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export { getUserByEmail };

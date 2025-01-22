import { Request, Response } from "express";
import { handleGetUserByEmail } from "../services/userService";

const getUserByEmail = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, typeAccount } = req.body;

    console.log('>>> body-get-user', req.body);

    if (!email || !typeAccount) {
      return res.status(500).json({
        message: "Email và typeAccount là bắt buộc",
      });
    }

    const response = await handleGetUserByEmail(email, typeAccount);

    return res.status(200).json(response);
  } catch (error) {
    console.log(">>> error-userLogin", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export { getUserByEmail };

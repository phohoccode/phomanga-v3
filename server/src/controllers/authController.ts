import { Request, Response } from "express";
import {
  handleLogin,
  handleRegister,
  handleResetPassword,
} from "../services/authService";

const userLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log(">>>> req", req.body);
    const response = await handleLogin(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(">>> error-userLogin", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export { userLogin };

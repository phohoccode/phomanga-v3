import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import dotenv from "dotenv";
import validator from "validator";
import {
  handleLogin,
  handleRegister,
  handleResetPassword,
  handleSendOTP,
} from "../services/authService";
import { genarateOTP } from "../lib/utils";

dotenv.config();

const userLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, typeAccount } = req.body;

    if (!email || !password || !typeAccount) {
      return res.status(500).json({
        message: "Email, password và typeAccount là bắt buộc",
      });
    }

    const response = await handleLogin(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

const registerAccount = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, name, typeAccount } = req.body;

    if (!email  || !name || !typeAccount) {
      return res.status(500).json({
        message: "Email, name và typeAccount là bắt buộc",
      });
    }

    console.log(">>>> req", req.body);

    const response = await handleRegister(req.body);

    

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

const resetPassword = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log(">>>> req", req.body);
    const response = await handleResetPassword(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

const sendOTP = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log(">>>> req", req.body);

    if (!validator.isEmail(req.body?.email)) {
      return res.status(400).json({
        status: "error",
        error_code: "invalid_email",
        message: "Email không hợp lệ!",
      });
    }

    const otp = genarateOTP();

    const templatePath =
      req.body?.type === "register_account"
        ? "../templates/register.html"
        : "../templates/forgot-password.html";

    // Đọc và biên dịch mẫu email
    const filePath = path.join(__dirname, templatePath);
    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);

    const replacements = { email: process.env.GOOGLE_APP_EMAIL, otp };

    const htmlToSend = template(replacements);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GOOGLE_APP_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    const response_mail = await transporter.sendMail({
      from: `phohoccode <${process.env.GOOGLE_APP_EMAIL}>`,
      to: `${req.body?.email}`,
      subject: "Xác minh tài khoản",
      text: "phohoccode",
      html: htmlToSend,
    });

    const response_send_otp = await handleSendOTP({ ...req.body, otp });

    return res.status(200).json(response_send_otp);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export { userLogin, registerAccount, resetPassword, sendOTP };

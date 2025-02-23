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
import { error_server } from "../lib/define";

dotenv.config();

const userLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, typeAccount } = req.body;

    if (!email || !password || !typeAccount) {
      return res.status(500).json({
        status: "error",
        message: "Email, Password and TypeAccount are required!",
      });
    }

    const response = await handleLogin(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

const registerAccount = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, name, typeAccount, avatar } = req.body;

    if (!email || !name || !typeAccount || !avatar) {
      return res.status(500).json({
        status: "error",
        message: "Email, Username, TypeAccount and Avatar are required!",
      });
    }

    const response = await handleRegister(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

const resetPassword = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, otp } = req.body;

    if (!email || !password || !otp) {
      return res.status(500).json({
        status: "error",
        message: "Email, Password and OTP are required!",
      });
    }

    const response = await handleResetPassword(req.body);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error_server);
  }
};

const sendOTP = async (req: Request, res: Response): Promise<any> => {
  try {
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

    await transporter.sendMail({
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
    return res.status(500).json(error_server);
  }
};

export { userLogin, registerAccount, resetPassword, sendOTP };

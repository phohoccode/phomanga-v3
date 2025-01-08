"use server";

import { signIn } from "@/auth";
import type { registerAccount, resetPassword } from "./types";
import axios from "@/config/axios";

// =============================== AUTH.JS ===============================
export async function authenticate(
  email: string,
  password: string
): Promise<any> {
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: "/",
    });

    return {
      status: "success",
      message: "Đăng nhập thành công!",
    };
  } catch (error: any) {
    console.log(">>> actions-error", error);

    switch (error?.code) {
      case "invalid_credentials":
        return { status: "error", message: error?.details };
      case "zod_error":
        return { status: "error", message: error?.details };
      default:
        return {
          status: "error",
          message: "Đã có lỗi xảy ra, vui lòng thử lại!",
        };
    }
  }
}

export async function sendOTP(email: string, type: string): Promise<any> {
  try {
    const response: any = await axios.post("/auth/send-otp", {
      email,
      type,
    });

    return response;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Đã có lỗi xảy ra, vui lòng thử lại!",
    };
  }
}

export async function register({
  email,
  password,
  name,
  otp,
}: registerAccount): Promise<any> {
  try {
    const response: any = await axios.post("/auth/register", {
      email,
      password,
      name,
      otp,
    });

    return response;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Đã có lỗi xảy ra, vui lòng thử lại!",
    };
  }
}

export async function resetPassword({
  email,
  password,
  otp,
}: resetPassword): Promise<any> {
  try {
    const response: any = await axios.post("/auth/reset-password", {
      email,
      password,
      otp,
    });

    return response;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Đã có lỗi xảy ra, vui lòng thử lại!",
    };
  }
}

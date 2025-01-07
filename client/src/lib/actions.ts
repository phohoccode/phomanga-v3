"use server"

import { signIn } from "@/auth";

// =============================== AUTH.JS ===============================
export async function authenticate(
  email: string,
  password: string
): Promise<any> {
  try {
    console.log(">>> email", email);
    console.log(">>> password", password)

    const response = await signIn("credentials", {
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
          message: "Đã có lỗi xảy ra, vui lòng thử lại!!!",
        };
    }
  }
}

"use server";

import { signIn } from "@/auth";
import type { registerAccount, resetPassword } from "./types";
import axios from "@/config/axios";
import { revalidatePath } from "next/cache";

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
    console.log(error);

    switch (error?.code) {
      case "invalid_credentials":
        return { status: "error", message: error?.details };
      case "zod_error":
        return { status: "error", message: error?.details };
      default:
        return {
          status: "error",
          message: "Đã có lỗi xảy ra, vui lòng thử lại sau!",
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
  typeAccount,
  avatar,
}: registerAccount): Promise<any> {
  try {
    const response: any = await axios.post("/auth/register", {
      email,
      password,
      name,
      otp,
      typeAccount,
      avatar,
    });

    console.log(">>> response", response);

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

// =============================== USER.JS ===============================
export async function fetchDataComic(
  userId: string,
  page: number | string,
  type: string
) {
  try {
    const query = `userId=${userId}&page=${page}&type=${type}`;
    const response: any = await axios.get(`/user/comics?${query}`);

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAllComic(userId: string, type: string) {
  try {
    const query = `userId=${userId}&type=${type}`;
    const response: any = await axios.delete(`/user/comics?${query}`);

    return response;
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath(type === "SAVED_COMIC" ? "/kho-luu-tru" : "/lich-su-da-xem");
  }
}

// =============================== ADMIN ===============================
export async function fetchAllUsers() {
  try {
    const response: any = await axios.get("/admin/users");

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAllComments() {
  try {
    const response: any = await axios.get("/admin/comments");

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAllNotifications() {
  try {
    const response: any = await axios.get("/admin/notifications");

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAllFeedbacks() {
  try {
    const response: any = await axios.get("/admin/feedbacks");

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteComment(commentId: string) {
  try {
    const response: any = await axios.post("/admin/delete-comment", {
      commentId,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteNotification({
  notificationId,
  userId,
  role,
}: {
  notificationId: string;
  userId: string;
  role: "admin" | "user";
}) {
  try {
    const query = `notificationId=${notificationId}&userId=${userId}&role=${role}`;

    const response: any = await axios.delete(`/admin/notification?${query}`);

    console.log(">>> response", response);

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(userId: string) {
  try {
    const response: any = await axios.post("/admin/delete-user", {
      userId,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function createNotification(
  title: string,
  content: string,
  userId: string,
  type: "system" | "user"
) {
  try {
    const response: any = await axios.post("/admin/notification", {
      title,
      content,
      userId,
      type,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function updateNotification(
  notificationId: string,
  title: string,
  content: string
) {
  try {
    const data = {
      title,
      content,
    };
    const response: any = await axios.put(
      `/admin/notification/${notificationId}`,
      data
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserInfo(userId: string) {
  try {
    const query = `userId=${userId}`;
    const response: any = await axios.get(`/user/info?${query}`);

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserStatistical(userId: string) {
  try {
    const query = `userId=${userId}`;
    const response: any = await axios.get(`/user/statistics?${query}`);

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllVipLevel() {
  try {
    const response: any = await axios.get("/user/vip-levels");

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserRankings(criterion: string) {
  try {
    const query = `criterion=${criterion}`;
    const response: any = await axios.get(`/user/rankings?${query}`);

    return response;
  } catch (error) {
    console.log(error);
  }
}

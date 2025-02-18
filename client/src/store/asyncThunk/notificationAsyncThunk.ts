import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/components/config/axios";

export const fetchAllNotifications = createAsyncThunk(
  "notifications/fetchAllNotifications",
  async ({ type, userId, limit, page }: any) => {
    const query = `type=${type}&userId=${userId}&limit=${limit}&page=${page}`;
    const response = await axios.get(`/user/notifications?${query}`);

    return response;
  }
);

export const createNotification = createAsyncThunk(
  "notifications/createNotification",
  async ({ title, content, type, userId }: any) => {
    const response = await axios.post("/user/notification", {
      title,
      content,
      type,
      userId,
    });

    return response;
  }
);

export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async ({
    notificationId,
    userId,
    role,
  }: {
    notificationId: string;
    userId: string;
    role: "admin" | "user";
  }) => {
    const query = `notificationId=${notificationId}&userId=${userId}&role=${role}`;
    const response = await axios.delete(`/user/notification?${query}`);

    return response;
  }
);

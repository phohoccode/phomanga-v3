import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";

export const fetchAllNotifications = createAsyncThunk(
  "notifications/fetchAllNotifications",
  async ({ type, userId, limit, page }: any) => {
    const response = await axios.post("/notification//get-all-notifications", {
      type,
      userId,
      limit,
      page,
    });

    return response;
  }
);

export const createNotification = createAsyncThunk(
  "notifications/createNotification",
  async ({ title, content, type, userId }: any) => {
    const response = await axios.post("/notification/create-notification", {
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
  }: {
    notificationId: string;
    userId: string;
  }) => {
    const response = await axios.post("/notification/delete-notification", {
      notificationId,
      userId,
    });

    return response;
  }
);

"use server"

import axios from "@/config/axios";

export async function fetchAllUsers() {
  try {
    const response: any = await axios.get("/admin/get-all-users");

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAllComments() {
  try {
    const response: any = await axios.get("/admin/get-all-comments");

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAllNotifications() {
  try {
    const response: any = await axios.get("/admin/get-all-notifications");

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAllFeedbacks() {
  try {
    const response: any = await axios.get("/admin/get-all-feedbacks");

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

export async function deleteNotification(
  notificationId: string,
  userId: string
) {
  try {
    const response: any = await axios.post("/admin/delete-notification", {
      notificationId,
      userId,
    });

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
    const response: any = await axios.post("/admin/create-notification", {
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
  content: string,
  userId: string
) {
  try {
    const response: any = await axios.post("/admin/update-notification", {
      notificationId,
      title,
      content,
      userId,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

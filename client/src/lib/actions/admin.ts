"use server";

import axios from "@/components/config/axios";

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

export async function updateUserRole(userId: string, role: "admin" | "user") {
  try {
    const response: any = await axios.put(`/admin/user/${userId}/role`, {
      role,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function updateVipLevels(userId: string, idVipLevel: string) {
  try {
    const response: any = await axios.put(`/admin/user/${userId}/vip-level`, {
      idVipLevel,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function markUserCommentAsSpam(commentId: string) {
  try {
    const response: any = await axios.put(`/admin/comment/${commentId}/spam`);

    return response;
  } catch (error) {
    console.log(error);
  }
}

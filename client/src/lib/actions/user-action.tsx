"use server";

import axios from "@/config/axios";
import { revalidatePath } from "next/cache";

export async function fetchDataComic(
  userId: string,
  page: number | string,
  type: string
) {
  try {
    const response: any = await axios.post("/comic/get-all-comic", {
      userId,
      page,
      type,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAllComic(userId: string, type: string) {
  try {
    const response: any = await axios.post("/comic/delete-all-comic", {
      userId,
      type,
    });

    return response;
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath(type === "SAVED_COMIC" ? "/kho-luu-tru" : "/lich-su-da-xem");
  }
}

export async function getUserInfo(userId: string) {
  try {
    const response: any = await axios.post("/user/get-user-info", {
      userId,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserStatistical(userId: string) {
  try {
    const response: any = await axios.post("/user/get-user-statistical", {
      userId,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllVipLevel() {
  try {
    const response: any = await axios.get("/vip-level/get-all-vip-level");

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserRankings(criterion: string) {
  try {
    const response: any = await axios.post("/user/get-user-rankings", {
      criterion,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}


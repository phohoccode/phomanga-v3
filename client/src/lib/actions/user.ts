"use server";

import axios from "@/components/config/axios";
import { revalidatePath } from "next/cache";

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

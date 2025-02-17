import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";
import type { DeleteComic, SavedComic } from "@/lib/types";

export const saveComic = createAsyncThunk(
  "user/saveComic",
  async ({ userId, dataComic, type, username, avatar }: SavedComic) => {
    const response = await axios.post(`/user/comic`, {
      userId,
      dataComic,
      type,
      username,
      avatar,
    });

    return response;
  }
);

export const deleteComic = createAsyncThunk(
  "user/deleteComic",
  async ({ userId, comicSlug, comicId, type }: DeleteComic) => {
    const query = `comicSlug=${comicSlug}&userId=${userId}&comicId=${comicId}&type=${type}`;

    const response = await axios.delete(`/user/comic?${query}`);
    return response;
  }
);

export const getAllComic = createAsyncThunk(
  "user/getAllComic",
  async ({
    userId,
    type,
    page,
  }: {
    userId: string;
    type: string;
    page: string;
  }) => {
    const query = `userId=${userId}&type=${type}&page=${page}`;
    const response = await axios.get(`/user/comics?${query}`);

    return response;
  }
);

export const getSearchHistory = createAsyncThunk(
  "user/getSearchHistory",
  async ({
    userId,
    limit,
    page,
  }: {
    userId: string;
    page: string;
    limit: string;
  }) => {
    const query = `userId=${userId}&limit=${limit}&page=${page}`;
    const response = await axios.get(`/user/search-history?${query}`);

    return response;
  }
);

export const addSearchHistory = createAsyncThunk(
  "user/addSearchHistory",
  async ({ userId, keyword }: { userId: string; keyword: string }) => {
    const response = await axios.post(`/user/search-history`, {
      userId,
      keyword,
    });

    return response;
  }
);

export const deleteSearchHistory = createAsyncThunk(
  "user/deleteSearchHistory",
  async ({ userId, searchId }: { userId: string; searchId: string }) => {
    const query = `userId=${userId}&searchId=${searchId}`;
    const response = await axios.delete(`/user/search-history?${query}`);

    return response;
  }
);

export const createUserFeedback = createAsyncThunk(
  "user/createUserFeedback",
  async ({
    userId,
    title,
    description,
  }: {
    userId: string;
    title: string;
    description: string;
  }) => {
    const response = await axios.post(`/user/add-feedback`, {
      userId,
      title,
      description,
    });

    return response;
  }
);

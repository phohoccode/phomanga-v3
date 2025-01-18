import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";
import type { DeleteComic, SavedComic } from "@/lib/types";

export const saveComic = createAsyncThunk(
  "user/saveComic",
  async ({ userId, dataComic, type }: SavedComic) => {
    const response = await axios.post(`/comic/save-comic`, {
      userId,
      dataComic,
      type,
    });

    return response;
  }
);

export const deleteComic = createAsyncThunk(
  "user/deleteComic",
  async ({ userId, comicSlug, comicId, type }: DeleteComic) => {
    const response = await axios.post(`/comic/delele-comic`, {
      userId,
      comicSlug,
      comicId,
      type,
    });

    return response;
  }
);

export const getAllComic = createAsyncThunk(
  "user/getAllComic",
  async ({ userId, type }: { userId: string; type: string }) => {
    const response = await axios.post(`/comic/get-all-comic`, {
      userId,
      type,
    });

    return response;
  }
);

export const getSearchHisory = createAsyncThunk(
  "user/getSearchHisory",
  async ({ userId }: { userId: string }) => {
    const response = await axios.post(`/search/get-search-history`, {
      userId,
    });

    return response;
  }
);

export const addSearchHistory = createAsyncThunk(
  "user/addSearchHistory",
  async ({ userId, keyword }: { userId: string; keyword: string }) => {
    const response = await axios.post(`/search/add-search-history`, {
      userId,
      keyword,
    });

    return response;
  }
);

export const deleteSearchHistory = createAsyncThunk(
  "user/deleteSearchHistory",
  async ({ userId, searchId }: { userId: string; searchId: string }) => {
    const response = await axios.post(`/search/delete-search-history`, {
      userId,
      searchId,
    });

    return response;
  }
);

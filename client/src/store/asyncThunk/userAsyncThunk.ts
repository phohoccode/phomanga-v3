import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";
import type { DeleteComic, SavedComic } from "@/lib/types";

const saveComic = createAsyncThunk(
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

const deleteComic = createAsyncThunk(
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

const getAllComic = createAsyncThunk(
  "user/getAllComic",
  async ({ userId, type }: { userId: string; type: string }) => {
    const response = await axios.post(`/comic/get-all-comic`, {
      userId,
      type,
    });

    return response;
  }
);

export { saveComic, deleteComic, getAllComic };

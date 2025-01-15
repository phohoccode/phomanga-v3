import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";

const saveComic = createAsyncThunk(
  "user/saveComic",
  async ({ userId, dataComic }: any) => {
    const response = await axios.post(`/comic/save-comic`, {
      userId,
      dataComic,
    });

    return response;
  }
);

const deleteComic = createAsyncThunk(
  "user/deleteComic",
  async ({ userId, comicSlug }: any) => {
    const response = await axios.post(`/comic/delete-save-comic`, {
      userId,
      comicSlug,
    });

    return response;
  }
);

const getAllSavedComic = createAsyncThunk(
  "user/getAllSavedComic",
  async ({ userId }: any) => {
    const response = await axios.post(`/comic/get-all-saved-comic`, {
      userId,
    });

    return response;
  }
);

export { saveComic, deleteComic, getAllSavedComic };

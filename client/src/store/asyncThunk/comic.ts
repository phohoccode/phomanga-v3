import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategorys = createAsyncThunk(
  "users/fetchCategorys",
  async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_OTRUYEN_THELOAI as string
    );
    return response.json();
  }
);

export const fetchComicSlide = createAsyncThunk(
  "users/fetchComicSlide",
  async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_OTRUYEN_HOME as string
    );
    return response.json();
  }
);

import { ComicDetail, ComicInfo, SearchComic } from "@/lib/types";
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

export const fetchNewComic = createAsyncThunk(
  "users/fetchNewComic",
  async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_OTRUYEN_TRUYENMOI as string
    );
    return response.json();
  }
);

export const fetchPublishedComic = createAsyncThunk(
  "users/fetchPublishedComic",
  async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_OTRUYEN_DANGPHATHANH as string
    );
    return response.json();
  }
);

export const fetchUpComingComic = createAsyncThunk(
  "users/fetchUpComingComic",
  async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_OTRUYEN_SAPRAMAT as string
    );
    return response.json();
  }
);

export const fetchCompletedComic = createAsyncThunk(
  "users/fetchCompletedComic",
  async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_OTRUYEN_HOANTHANH as string
    );
    return response.json();
  }
);

export const fetchComicDetail = createAsyncThunk(
  "users/fetchComicDetail",
  async ({ description, slug, currentPage }: ComicDetail) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_OTRUYEN_CHITIET}/${description}/${slug}?page=${currentPage}`
    );
    return response.json();
  }
);

export const fetchComicInfo = createAsyncThunk(
  "users/fetchComicInfo",
  async ({ slug }: ComicInfo) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_OTRUYEN_TRUYENTRANH}/${slug}`
    );
    return response.json();
  }
);

export const fetchSearchComic = createAsyncThunk(
  "users/fetchSearchComic",
  async ({ keyword, currentPage }: SearchComic) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_OTRUYEN_TIMKIEM}/?keyword=${keyword}&page=${currentPage}`
    );
    return response.json();
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";
import { GetComments } from "@/lib/types";

export const getComments = createAsyncThunk(
  "comment/getComments",
  async ({ comicSlug, limit, page, sort }: GetComments) => {
    const response = await axios.post(`/comment/get-comments`, {
      comicSlug,
      limit,
      page,
      sort,
    });

    return response;
  }
);

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({
    userId,
    content,
    comicSlug,
    chapter,
  }: {
    userId: string;
    content: string;
    comicSlug: string;
    chapter?: string;
  }) => {
    const response = await axios.post("/comment/add-comment", {
      userId,
      content,
      comicSlug,
      chapter: chapter ?? null,
    });

    return response;
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async ({ commentId }: { commentId: string }) => {
    const response = await axios.post("/comment/delete-comment", { commentId });

    return response;
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async ({ commentId, content }: { commentId: string; content: string }) => {
    const response = await axios.post("/comment/update-comment", {
      commentId,
      content,
    });

    return response;
  }
);

export const likeComment = createAsyncThunk(
  "comment/likeComment",
  async ({ commentId, userId }: { commentId: string; userId: string }) => {
    const response = await axios.post("/comment/like-comment", {
      commentId,
      userId,
    });

    return response;
  }
);

export const unlikeComment = createAsyncThunk(
  "comment/unlikeComment",
  async ({ commentId, userId }: { commentId: string; userId: string }) => {
    const response = await axios.post("/comment/unlike-comment", {
      commentId,
      userId,
    });

    return response;
  }
);

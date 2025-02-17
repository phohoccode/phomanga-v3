import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";
import { GetComments } from "@/lib/types";

export const getComments = createAsyncThunk(
  "comment/getComments",
  async ({ comicSlug, limit, page, sort }: GetComments) => {
    const query = `?comicSlug=${comicSlug}&limit=${limit}&page=${page}&sort=${sort}`;

    const response = await axios.get(`/comic/comments${query}`);

    return response;
  }
);

export const createComment = createAsyncThunk(
  "comic/createComment",
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
    const response = await axios.post("/comic/comment", {
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
  async ({ commentId, userId }: { commentId: string; userId: string }) => {
    const query = `?commentId=${commentId}&userId=${userId}`;
    const response = await axios.delete(`/comic/comment${query}`);

    return response;
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async ({
    commentId,
    content,
    userId,
  }: {
    commentId: string;
    content: string;
    userId: string;
  }) => {
    const response = await axios.put(`/comic/comment/${commentId}`, {
      content,
      userId,
    });

    return response;
  }
);

export const likeComment = createAsyncThunk(
  "comment/likeComment",
  async ({ commentId, userId }: { commentId: string; userId: string }) => {
    const response = await axios.post("/comic/comment/like", {
      commentId,
      userId,
    });

    return response;
  }
);

export const unlikeComment = createAsyncThunk(
  "comment/unlikeComment",
  async ({ commentId, userId }: { commentId: string; userId: string }) => {
    const query = `?commentId=${commentId}&userId=${userId}`;
    const response = await axios.delete(`/comic/comment/unlike${query}`);

    return response;
  }
);

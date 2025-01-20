import { createSlice } from "@reduxjs/toolkit";
import { getComments } from "../asyncThunk/commentAsyncThunk";

export interface IComment {
  items: {
    comment_id: string;
    user_id: string;
    content: string;
    comic_slug: string;
    created_at: string;
    like_count?: number;
    liked_by_users?: any[];
  }[];
  totalItems: number;
  loading: boolean;
  currentPage?: string;
  commentIdEdit?: string;
  sort?: "asc" | "desc";
}

const initialState: IComment = {
  items: [],
  totalItems: 0,
  loading: false,
  commentIdEdit: "",
  currentPage: "1",
  sort: "desc",
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setCommentIdEdit: (state, action) => {
      state.commentIdEdit = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Fetch comments
    builder.addCase(getComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.items = action.payload?.data?.items;
      state.totalItems = action.payload?.data?.totalItems;
      state.loading = false;
    });
    builder.addCase(getComments.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setCommentIdEdit, setCurrentPage, setSort } =
  commentSlice.actions;

export default commentSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getAllComic, getSearchHistory } from "../asyncThunk/userAsyncThunk";

type UserSlice = {
  savedComics: {
    items: any[];
    loading: boolean;
  };
  searchHistory: {
    items: any[];
    total: number;
    loading: boolean;
  };
};

const initialState: UserSlice = {
  savedComics: {
    items: [],
    loading: false,
  },
  searchHistory: {
    items: [],
    total: 0,
    loading: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllComic.pending, (state) => {
        state.savedComics.loading = true;
      })

      .addCase(getAllComic.fulfilled, (state, action) => {
        state.savedComics.loading = false;

        if (action.payload.data?.type === "GET_ALL_SAVED_COMIC") {
          state.savedComics.items = action.payload.data?.items ?? [];
        }
      })

      .addCase(getAllComic.rejected, (state) => {
        state.savedComics.loading = false;
      })

      .addCase(getSearchHistory.pending, (state) => {
        state.searchHistory.loading = true;
      })

      .addCase(getSearchHistory.fulfilled, (state, action) => {
        state.searchHistory.loading = false;
        state.searchHistory.total = action.payload.data?.totalItems ?? 0;
        state.searchHistory.items = action.payload.data?.items ?? [];
      })

      .addCase(getSearchHistory.rejected, (state) => {
        state.searchHistory.loading = false;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;

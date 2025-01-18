import { createSlice } from "@reduxjs/toolkit";
import { getAllComic, getSearchHisory } from "../asyncThunk/userAsyncThunk";

type UserSlice = {
  savedComics: {
    items: any[];
    loading: boolean;
  };
  searchRecent: {
    items: any[];
    loading: boolean;
  };
};

const initialState: UserSlice = {
  savedComics: {
    items: [],
    loading: false,
  },
  searchRecent: {
    items: [],
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
          state.savedComics.items = action.payload.data?.items;
        }
      })

      .addCase(getAllComic.rejected, (state) => {
        state.savedComics.loading = false;
      })

      .addCase(getSearchHisory.pending, (state) => {
        state.searchRecent.loading = true;
      })

      .addCase(getSearchHisory.fulfilled, (state, action) => {
        state.searchRecent.loading = false;
        state.searchRecent.items = action.payload?.search;
      })

      .addCase(getSearchHisory.rejected, (state) => {
        state.searchRecent.loading = false;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;

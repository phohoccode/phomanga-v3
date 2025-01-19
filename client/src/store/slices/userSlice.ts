import { createSlice } from "@reduxjs/toolkit";
import { getAllComic, getSearchHisory } from "../asyncThunk/userAsyncThunk";

type UserSlice = {
  savedComics: {
    items: any[];
    loading: boolean;
  };
  searchHistory: {
    items: any[];
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
        state.searchHistory.loading = true;
      })

      .addCase(getSearchHisory.fulfilled, (state, action) => {
        state.searchHistory.loading = false;
        state.searchHistory.items = action.payload.data?.items;
      })

      .addCase(getSearchHisory.rejected, (state) => {
        state.searchHistory.loading = false;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;

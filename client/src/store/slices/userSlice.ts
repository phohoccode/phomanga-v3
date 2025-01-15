import { createSlice } from "@reduxjs/toolkit";
import {
  deleteComic,
  getAllSavedComic,
  saveComic,
} from "../asyncThunk/userAsyncThunk";

type UserSlice = {
  savedComics: {
    items: any[];
    loading: boolean;
  };
};

const initialState: UserSlice = {
  savedComics: {
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
      .addCase(getAllSavedComic.pending, (state) => {
        state.savedComics.loading = true;
      })

      .addCase(getAllSavedComic.fulfilled, (state, action) => {
        state.savedComics.loading = false;
        state.savedComics.items = action.payload.data?.[0]?.comics;
      })

      .addCase(getAllSavedComic.rejected, (state) => {
        state.savedComics.loading = false;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;

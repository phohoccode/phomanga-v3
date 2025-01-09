import { createSlice } from "@reduxjs/toolkit";
import { fetchCategorys, fetchComicSlide } from "../asyncThunk/comic";
import { comicCategory } from "@/lib/types";

export interface ComicState {
  catetorys: comicCategory[];
  conmicSlide: any; 
}

const initialState: ComicState = {
  catetorys: [],
  conmicSlide: [],
};

export const comicSlice = createSlice({
  name: "comic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorys.pending, (state) => {})
      .addCase(fetchCategorys.fulfilled, (state, action) => {
        state.catetorys = action.payload.data?.items;
      })
      .addCase(fetchCategorys.rejected, (state) => {})

      .addCase(fetchComicSlide.pending, (state) => {})
      .addCase(fetchComicSlide.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.conmicSlide = action.payload.data?.items;
      })
      .addCase(fetchComicSlide.rejected, (state) => {});
  },
});

// Action creators are generated for each case reducer function
export const {} = comicSlice.actions;

export default comicSlice.reducer;

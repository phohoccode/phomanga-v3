import { createSlice } from "@reduxjs/toolkit";
import { getAllVipLevel } from "../asyncThunk/vipLevelAsyncThunk";

export type VipLevel = {
  id: string;
  price: number;
  level: number;
  max_stories: number;
  nickname: string;
};

export type VipLevelSlice = {
  vipLevels: VipLevel[];
  selectedCard: VipLevel;
  loading: boolean;
};

const initialState: VipLevelSlice = {
  vipLevels: [],
  selectedCard: {
    id: "",
    level: 0,
    price: 0,
    nickname: "",
    max_stories: 0,
  },
  loading: false,
};

export const vipLevelSlice = createSlice({
  name: "vipLevel",
  initialState,
  reducers: {
    setSelectedCard: (state, action) => {
      state.selectedCard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVipLevel.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllVipLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.vipLevels = action.payload.data?.items ?? [];
      })

      .addCase(getAllVipLevel.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedCard } = vipLevelSlice.actions;

export default vipLevelSlice.reducer;

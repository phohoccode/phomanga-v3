import { createSlice } from "@reduxjs/toolkit";
import { getAllVipLevel } from "../asyncThunk/vipLevelAsyncThunk";

type VipLevelSlice = {
  vipLevels: any[];
  loading: boolean;
};

const initialState: VipLevelSlice = {
  vipLevels: [],
  loading: false,
};

export const vipLevelSlice = createSlice({
  name: "vipLevel",
  initialState,
  reducers: {},
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

export const {} = vipLevelSlice.actions;

export default vipLevelSlice.reducer;

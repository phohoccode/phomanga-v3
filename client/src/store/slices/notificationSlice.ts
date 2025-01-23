import { createSlice } from "@reduxjs/toolkit";
import { fetchAllNotifications } from "../asyncThunk/notificationAsyncThunk";

export interface NotificationState {
  system: {
    items: any[];
    totalItem: number;
  };
  user: {
    items: any[];
    totalItem: number;
  };
  totalItem: number;
  loading: boolean;
}

const initialState: NotificationState = {
  system: {
    items: [],
    totalItem: 0,
  },
  user: {
    items: [],
    totalItem: 0,
  },
  totalItem: 0,
  loading: false,
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotifications.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAllNotifications.fulfilled, (state, action) => {
        const { items, totalItem, type } = action.payload.data;

        state.loading = false;

        type === "system"
          ? (state.system.items = items)
          : (state.user.items = items);

        type === "system"
          ? (state.system.totalItem = totalItem)
          : (state.user.totalItem = totalItem);
      })

      .addCase(fetchAllNotifications.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = notificationSlice.actions;

export default notificationSlice.reducer;

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
  dataUpdate: any;
  action: "create" | "update";
  title: string;
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
  dataUpdate: {},
  action: "create",
  title: "",
  totalItem: 0,
  loading: false,
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setDataUpdate: (state, action) => {
      state.dataUpdate = action.payload;
    },
    setAction: (state, action) => {
      state.action = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotifications.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAllNotifications.fulfilled, (state, action) => {
        const { items, totalItem, type } = action.payload.data;

        state.loading = false;

        if (type === "system") {
          state.system.items = items;
          state.system.totalItem = totalItem;
        } else {
          state.user.items = items;
          state.user.totalItem = totalItem;
        }
      })

      .addCase(fetchAllNotifications.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setDataUpdate, setAction, setTitle } = notificationSlice.actions;

export default notificationSlice.reducer;

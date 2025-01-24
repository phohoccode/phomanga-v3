import { createSlice } from "@reduxjs/toolkit";

export interface SystemState {
  width: number;
  showDrawerUser: boolean;
  showModalSearch: boolean;
  showModalCategorys: boolean;
  showModalNotification: boolean;
  showModalActionsNotification: boolean;
  savingHistory: boolean;
}

const initialState: SystemState = {
  width: 0,
  showDrawerUser: false,
  showModalSearch: false,
  showModalCategorys: false,
  showModalNotification: false,
  showModalActionsNotification: false,
  savingHistory: false,
};

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setWidth: (state, action) => {
      state.width = action.payload;
    },
    setShowDrawerUser: (state, action) => {
      state.showDrawerUser = action.payload;
    },
    setShowModalSearch: (state, action) => {
      state.showModalSearch = action.payload;
    },
    setShowModalCategorys: (state, action) => {
      state.showModalCategorys = action.payload;
    },
    setShowModalNotification: (state, action) => {
      state.showModalNotification = action.payload;
    },
    setShowModalActionsNotification: (state, action) => {
      state.showModalActionsNotification = action.payload;
    },
    setSavingHistory: (state, action) => {
      state.savingHistory = action.payload;
      localStorage.setItem("saving-history", JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setWidth,
  setShowDrawerUser,
  setShowModalCategorys,
  setShowModalSearch,
  setShowModalNotification,
  setSavingHistory,
  setShowModalActionsNotification,
} = systemSlice.actions;

export default systemSlice.reducer;

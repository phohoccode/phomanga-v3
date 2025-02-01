import { createSlice } from "@reduxjs/toolkit";

export interface SystemState {
  width: number;
  loaded: boolean;
  isVisiable: boolean;
  lastScrollY: number;
  showDrawerUser: boolean;
  showModalSearch: boolean;
  showModalCategorys: boolean;
  showModalNotification: boolean;
  showModalActionsNotification: boolean;
  savingHistory: boolean;
}

const initialState: SystemState = {
  width: 0,
  loaded: false,
  showDrawerUser: false,
  showModalSearch: false,
  isVisiable: true,
  lastScrollY: 0,
  showModalCategorys: false,
  showModalNotification: false,
  showModalActionsNotification: false,
  savingHistory: true,
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
    setIsVisiable: (state, action) => {
      state.isVisiable = action.payload;
    },
    setLastScrollY: (state, action) => {
      state.lastScrollY = action.payload;
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload;
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
  setIsVisiable,
  setLoaded,
  setLastScrollY,
} = systemSlice.actions;

export default systemSlice.reducer;

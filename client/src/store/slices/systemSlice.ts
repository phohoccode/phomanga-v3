import { createSlice } from "@reduxjs/toolkit";
import { store } from "@/lib/utils";

export interface SystemState {
  width: number;
  isVisiable: boolean;
  displayGreetings: boolean;
  lastScrollY: number;
  showDrawerUser: boolean;
  showModalSearch: boolean;
  showModalCategorys: boolean;
  showModalNotification: boolean;
  showModalActionsNotification: boolean;
  showModalComment: boolean;
  showModalUserFeedback: boolean;
  showModalUpgradeLevelVip: boolean;
  savingHistory: boolean;
}

const initialState: SystemState = {
  width: 0,
  showDrawerUser: false,
  showModalSearch: false,
  isVisiable: true,
  lastScrollY: 0,
  displayGreetings: true,
  showModalCategorys: false,
  showModalNotification: false,
  showModalActionsNotification: false,
  showModalComment: false,
  showModalUserFeedback: false,
  showModalUpgradeLevelVip: false,
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
      store.set("saving-history", action.payload);
    },
    setIsVisiable: (state, action) => {
      state.isVisiable = action.payload;
    },
    setLastScrollY: (state, action) => {
      state.lastScrollY = action.payload;
    },
    setShowModalComment: (state, action) => {
      state.showModalComment = action.payload;
    },
    setShowModalUserFeedback: (state, action) => {
      state.showModalUserFeedback = action.payload;
    },
    setShowModalUpgradeLevelVip: (state, action) => {
      state.showModalUpgradeLevelVip = action.payload;
    },
    setDisplayGreetings: (state, action) => {
      state.displayGreetings = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setWidth,
  setDisplayGreetings,
  setShowModalUpgradeLevelVip,
  setShowDrawerUser,
  setShowModalCategorys,
  setShowModalSearch,
  setShowModalNotification,
  setSavingHistory,
  setShowModalActionsNotification,
  setIsVisiable,
  setLastScrollY,
  setShowModalComment,
  setShowModalUserFeedback,
} = systemSlice.actions;

export default systemSlice.reducer;

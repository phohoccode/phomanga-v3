import { configureStore } from "@reduxjs/toolkit";
import systemReducer from "@/store/slices/systemSlice";
import comicReducer from "@/store/slices/comicSlice";
import userReducer from "@/store/slices/userSlice";
import commentReducer from "@/store/slices/commentSlice";
import notificationReducer from "@/store/slices/notificationSlice";

export const store = configureStore({
  reducer: {
    system: systemReducer,
    comic: comicReducer,
    user: userReducer,
    comment: commentReducer,
    notification: notificationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

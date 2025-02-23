export type rawDataLogin = {
  email: string;
  password: string;
  typeAccount: "credentials" | "google";
};

export type rawDataRegister = {
  name: string;
  email: string;
  password: string;
  otp: string;
  typeAccount: "credentials" | "google";
  avatar: string;
};

export type rawDataResetPassword = {
  email: string;
  password: string;
  otp: string;
};

export type rawDataSendOTP = {
  email: string;
  type: string;
  otp: string;
};

export type rawDataGetComic = {
  userId: string;
  page: string;
  type: string;
};

export type rawDataSaveComic = {
  userId: string;
  dataComic: any;
  type: string;
  username: string;
  avatar: string;
};

export type rawDataDeleteComic = {
  userId: string;
  comicSlug: string;
  comicId: string;
  type: string;
};

export type rawDataDeleteAllComic = {
  userId: string;
  type: string;
};

export type rawDataCreateComment = {
  userId: string;
  content: string;
  comicSlug: string;
  chapter: string;
  comicName: string;
};

export type rawDataDeleteComment = {
  commentId: string;
  userId: string;
};

export type rawDataUpdateComment = {
  id: string;
  content: string;
  userId: string;
};

export type rawDataGetComments = {
  comicSlug: string;
  limit: string;
  page: string;
  sort: "asc" | "desc";
};

export type rawDataGetAllNotifications = {
  type: "system" | "user";
  userId?: string;
  limit: string;
  page: string;
};

export type rawDataLikeComment = {
  commentId: string;
  userId: string;
};

export type rawDataUnlikeComment = {
  commentId: string;
  userId: string;
};

export type rawDataGetSearchHistory = {
  userId: string;
  limit: string;
  page: string;
};

export type rawDataCreateNotification = {
  title: string;
  content: string;
  type: string;
  userId: string;
};

export type rawDataDeleteNotification = {
  notificationId: string;
  userId: string;
  role: "admin" | "user";
};

export type rawDataUpdateNotification = {
  title: string;
  content: string;
  id: string;
};

export type rawDataGetUserInfo = {
  email: string;
  typeAccount: string;
  userId?: string;
};

export type criterion =
  | "vip_level"
  | "saved_comic"
  | "number_of_stories_read"
  | "comment_wrote";

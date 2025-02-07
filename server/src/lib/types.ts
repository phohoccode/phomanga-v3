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
};

export type rawDataUpdateComment = {
  commentId: string;
  content: string;
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

export type rawDataCreateNotification = {
  title: string;
  content: string;
  type: string;
  userId: string;
};

export type rawDataDeleteNotification = {
  notificationId: string;
  userId: string;
};

export type rawDataUpdateNotification = {
  notificationId: string;
  title: string;
  content: string;
  userId: string;
};

export type rawDataGetUserInfo = {
  email: string;
  typeAccount: string;
  userId?: string;
};

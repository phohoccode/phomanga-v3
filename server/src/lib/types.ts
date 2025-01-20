export type rawDataLogin = {
  email: string;
  password: string;
};

export type rawDataRegister = {
  name: string;
  email: string;
  password: string;
  otp: string;
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

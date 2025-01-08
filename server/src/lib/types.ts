export type rawDataLogin = {
  email: string;
  password: string;
};

export type rawDataRegister = {
  name: string;
  email: string;
  password: string;
  otp: string;
}

export type rawDataResetPassword = {
  email: string;
  password: string;
  otp: string;
}

export type rawDataSendOTP = {
  email: string;
  type: string;
  otp: string;
}

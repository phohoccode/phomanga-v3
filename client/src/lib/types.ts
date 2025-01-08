export type codeErrorLogin = "invalid_credentials" | "zod_error";
export type registerAccount = {
  name: string;
  email: string;
  password: string;
  otp: string;
};

export type resetPassword = {
  email: string;
  password: string;
  otp: string;
}

import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email không được để trống!!!" }).email(
    "Email không hợp lệ"
  ),
  password: string({ required_error: "Mật khẩu không được để trống!!!" }).min(
    6,
    "Mật khẩu phải có ít nhất 6 ký tự"
  ),
});

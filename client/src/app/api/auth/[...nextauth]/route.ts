
import { handlers } from "@/auth";

// https://vercel.com/docs/functions/configuring-functions/duration
// Thời gian chạy tối đa của một function là 60s
export const maxDuration = 60;

// handlers.GET → Xử lý HTTP GET (lấy session, đăng nhập).
// handlers.POST → Xử lý HTTP POST (đăng xuất, xác thực).
export const { GET, POST } = handlers;

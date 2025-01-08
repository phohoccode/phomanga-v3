import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const adminPaths = [
  "/bang-dieu-khien/quan-ly-binh-luan",
  "/bang-dieu-khien/quan-ly-danh-gia",
  "/bang-dieu-khien/quan-ly-nguoi-dung",
];

const protectedPaths = [
  "/kho-luu-tru",
  "/lich-su-da-xem",
  "/trang-ca-nhan",
  ...adminPaths,
];

export async function middleware(request: NextRequest) {
  const url = request.url;
  const { pathname } = new URL(url);
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Kiểm tra path trang có nhân động
  const isProfilePath = pathname.startsWith("/trang-ca-nhan");

  // Nếu không có token và yêu cầu truy cập vào trang bảo vệ
  if (!token && (protectedPaths.includes(pathname) || isProfilePath)) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Nếu có token và đang truy cập vào adminPaths, kiểm tra quyền truy cập
  if (token && adminPaths.includes(pathname)) {
    if (token.role === "admin") {
      return NextResponse.next();
    } else if (token.role === "guest") {
      return NextResponse.json(
        { status: "error", message: "Bạn không có quyền truy cập!" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/bang-dieu-khien/:path*",
    "/trang-ca-nhan/:path*",
    "/auth/:path*",
    "/kho-luu-tru",
    "/lich-su-da-xem",
  ],
};

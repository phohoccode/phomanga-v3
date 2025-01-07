import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export async function middleware(request: NextRequest) {
  const url = request.url;
  const { pathname } = new URL(url);
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });


  if (token) {
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
   
    if (pathname.startsWith("/bang-dieu-khien") && token.role === "admin") {
      return NextResponse.next();
    } else {
      return NextResponse.json(
        { message: "Bạn không có quyền truy cập" },
        { status: 403 }
      );
    }
  }

  return NextResponse.redirect(new URL("/auth/sign-in", request.url));
}

export const config = {
  matcher: ["/bang-dieu-khien/:path*"],
};

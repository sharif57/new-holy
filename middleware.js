import { NextResponse } from "next/server";

const AuthRoutes = ["/auth", "/register"];
const PrivateRoutes = ["/chat", "/chat/:page", "/payment", "/history"];

export async function middleware(request) {
  try {
    const { pathname } = request.nextUrl;
    console.log(pathname,'ddddddddddddddddddddddddddddd');

    // ✅ Get accessToken from cookies
    const token = request.cookies.get("accessToken")?.value;

    console.log(token, "accessToken")
    
    if (!token) {
      if (AuthRoutes.includes(pathname)) {
        return NextResponse.next();
      }
      return NextResponse.redirect(
        new URL(`/auth?redirect=${encodeURIComponent(pathname)}`, request.url)
      );
    }

    // ✅ Allow access to private routes only if the token exists
    if (PrivateRoutes.includes(pathname) && !token) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

// ✅ Middleware matcher config
export const config = {
  matcher: [
    '/chat',
    "/chat/:page",
    "/payment",
    "/history",
  ],
};

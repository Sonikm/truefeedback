import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware function
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If the user is logged in and accessing public routes, redirect to dashboard
  if (
    token &&
    ["/sign-in", "/sign-up", "/verify-code", "/"].some((path) =>
      url.pathname.startsWith(path)
    ) &&
    !url.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the user is not logged in and tries to access private routes, redirect to sign-in
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow the request to continue as is
  return NextResponse.next();
}

// Matching paths
export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/",
    "/dashboard/:path*",
    "/dashboard",
    "/verify-code/:path*",
  ],
};

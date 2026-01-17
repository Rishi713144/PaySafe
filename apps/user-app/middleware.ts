import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET || "secret" });
  const isAuthenticated = !!token;

  // If user is authenticated and visits login page or landing page, redirect to dashboard
  if (req.nextUrl.pathname.startsWith('/signin') || req.nextUrl.pathname === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // If user is NOT authenticated and visits protected pages, redirect to login
  const protectedRoutes = ["/dashboard", "/transfer", "/transactions", "/p2p"];
  const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/dashboard/:path*",
    "/transfer/:path*",
    "/transactions/:path*",
    "/p2p/:path*"
  ]
}

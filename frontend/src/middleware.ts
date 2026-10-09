import { NextRequest, NextResponse } from "next/server";

// ============================================================
// Route Configuration
// ============================================================
const PROTECTED_ROUTES = ["/profile", "/sessions"];
const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"];
const SESSION_COOKIE_NAME = "auth_kit.session_token";

// ============================================================
// Next.js Route Protection Middleware
// ============================================================
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const sessionToken =
        request.cookies.get(SESSION_COOKIE_NAME)?.value ||
        request.cookies.get("better-auth.session_token")?.value;

    const isProtected = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route)
    );
    const isAuthPage = AUTH_ROUTES.some((route) => pathname.startsWith(route));

    // Redirect unauthenticated users away from protected routes
    if (isProtected && !sessionToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect authenticated users away from auth pages
    if (isAuthPage && sessionToken) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    return NextResponse.next();
}

// Apply middleware to all routes except static assets and API routes
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
};

import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const cookie = req.cookies.get("auth_token")?.value;
    const url = req.nextUrl
    console.log("Middleware triggered")
    console.log(url.pathname)
    if (cookie !== undefined &&
        (url.pathname.startsWith('/login') ||
            url.pathname.startsWith('/signup') ||
            url.pathname.startsWith('/placeholder.svg') ||
            (url.pathname.startsWith('/') && url.pathname.length === 1) ||
            url.pathname.startsWith('/verify'))
    ) {
        console.log("Redirecting to dashboard")
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    // console.log(cookie === undefined)
    // console.log(url.pathname.startsWith('/login'))
    // console.log(url.pathname.startsWith('/signup'))
    // console.log(url.pathname.startsWith('/'))
    // console.log(url.pathname.startsWith('/verify'))

    if (cookie === undefined &&
        !(url.pathname.startsWith('/login') ||
            url.pathname.startsWith('/signup') ||
            (url.pathname.startsWith('/') && url.pathname.length === 1) ||
            url.pathname.startsWith('/verify'))
    ) {
        console.log("Redirecting to login")
        return NextResponse.redirect(new URL("/login", req.url));
    }
    console.log("Allowing request")
    return NextResponse.next(); // Allow the request if the cookie is present
}

// Apply middleware to specific routes
export const config = {
    matcher: ["/:path"], // Protect these routes
};
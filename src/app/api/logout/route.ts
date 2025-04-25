import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies(); // Await the cookies() function
    const authToken = cookieStore.get("auth_token");

    if (authToken) {
        // Deleting the cookie by setting its expiry to a past date
        const response = NextResponse.json({ message: "Logged out successfully" });
        cookieStore.set("auth_token", "", {
            httpOnly: true,
            path: "/",
            expires: new Date(0), // Set the cookie expiration to the past
        });
        return response;
    } else {
        return NextResponse.json({ message: "Not logged in" });
    }
}
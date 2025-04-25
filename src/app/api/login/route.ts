
import { NextResponse } from "next/server";
export async function POST() {
    console.log("Hello setting cookies")
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set("auth_token", "jhbjhbbjbjjhbjh", {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "strict",
        expires: new Date(Date.now() + 86400000), // 1 day
    });
    return response;
}
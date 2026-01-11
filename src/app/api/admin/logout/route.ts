import { NextResponse } from "next/server";
import * as cookie from "cookie";

export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true, message: "Logout successful" },
      { status: 200 }
    );

    // Clear the admin token cookie
    response.headers.set(
      "Set-Cookie",
      cookie.serialize("adminToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0, // Expire immediately
        sameSite: "strict",
        path: "/",
      })
    );

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

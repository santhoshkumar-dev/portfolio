// biome-ignore lint/style/useImportType: <explanation>
import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials, generateAdminToken } from "@/lib/auth";
import * as cookie from "cookie";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Verify credentials
    const isValid = verifyAdminCredentials(username, password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateAdminToken(username);

    // Create response with token cookie
    const response = NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );

    response.headers.set(
      "Set-Cookie",
      cookie.serialize("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: "strict",
        path: "/",
      })
    );

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

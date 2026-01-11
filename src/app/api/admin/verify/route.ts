import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = verifyAdminToken(request);

    if (!user) {
      return NextResponse.json(
        { authenticated: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { authenticated: true, username: user.username },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { authenticated: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

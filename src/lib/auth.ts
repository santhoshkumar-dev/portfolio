import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

export interface JWTPayload {
  username: string;
  iat?: number;
  exp?: number;
}

/**
 * Verify JWT token from request cookies
 */
export function verifyAdminToken(request: NextRequest): JWTPayload | null {
  try {
    const token = request.cookies.get("adminToken")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

/**
 * Generate JWT token for admin user
 */
export function generateAdminToken(username: string): string {
  return jwt.sign({ username }, JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });
}

/**
 * Verify admin credentials
 */
export function verifyAdminCredentials(
  username: string,
  password: string
): boolean {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error("Admin credentials not configured in environment variables");
    return false;
  }

  return username === adminUsername && password === adminPassword;
}

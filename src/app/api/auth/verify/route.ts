import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Token from "@/models/Token";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tokenParam = searchParams.get("token");

  if (!tokenParam) return NextResponse.json({ error: "Missing token" }, { status: 400 });

  await connectToDatabase();

  const token = await Token.findOne({ token: tokenParam });

  if (!token || token.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  cookies().set("user", token.email, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });

  await Token.deleteOne({ token: tokenParam });

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`);
}

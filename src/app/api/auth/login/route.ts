import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import connectToDatabase from "@/lib/mongodb";
import Token from "@/models/Token";
import User from "@/models/User";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  await connectToDatabase();

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 10);

  await Token.create({ email, token, expiresAt });
  await User.findOneAndUpdate({ email }, { email }, { upsert: true });

  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?token=${token}`;
  await sendMail(email, link);

  return NextResponse.json({ success: true });
}

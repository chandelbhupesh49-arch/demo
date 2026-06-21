import { NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

type SignupRequestBody = {
  name?: unknown;
  email?: unknown;
  password?: unknown;
};

const DATA_DIR = path.join(process.cwd(), "server-data");
const USERS_FILE = path.join(DATA_DIR, "users.jsonl");

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupRequestBody;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (name.length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }

    await mkdir(DATA_DIR, { recursive: true });

    const signupRecord = {
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString()
    };

    await appendFile(USERS_FILE, `${JSON.stringify(signupRecord)}\n`, "utf8");

    return NextResponse.json({ message: "Signup saved successfully." }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Server error. Signup was not saved." }, { status: 500 });
  }
}

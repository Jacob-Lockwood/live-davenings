import { createSession } from "@/app/lib/session";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { kv } from "@vercel/kv";
import { notFound, redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    notFound();
  }

  const data = await kv.hgetall<{
    displayName: string;
    emailAddress: string;
    password: string;
  }>(code);
  if (!data) {
    notFound();
  }
  const [{ id: userId, role }] = await db
    .insert(users)
    .values({
      displayName: data.displayName,
      email: data.emailAddress,
      password: data.password,
    })
    .returning();

  await createSession({ userId, role });
  redirect("/account/register/welcome");
}

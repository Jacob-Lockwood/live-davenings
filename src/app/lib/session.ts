import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import type { users } from "@/drizzle/schema";
import type { InferSelectModel } from "drizzle-orm";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export type SessionPayload = {
  userId: InferSelectModel<typeof users>["id"];
  role: InferSelectModel<typeof users>["role"];
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as JWTPayload & SessionPayload;
  } catch (error) {
    // console.log("Failed to verify session");
  }
}

export async function createSession(
  payload: Pick<SessionPayload, "userId" | "role">,
) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ ...payload, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const sessionCookie = cookies().get("session");
  return sessionCookie && decrypt(sessionCookie.value);
}

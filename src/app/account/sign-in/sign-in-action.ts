"use server";

import { db } from "@/drizzle/db";
import { z } from "zod";
import * as bcrypt from "bcrypt";
import { createSession } from "@/app/lib/session";

const signInForm = z.object({
  emailAddress: z.string().email(),
  password: z.string(),
});
export type SignInFormState =
  | "invalid email"
  | "user doesn't exist"
  | "wrong password"
  | undefined;
export async function signIn(
  _state: SignInFormState,
  fd: FormData,
): Promise<SignInFormState> {
  const parsed = signInForm.safeParse({
    emailAddress: fd.get("email-address"),
    password: fd.get("password"),
  });
  if (!parsed.success) {
    return "invalid email";
  }
  const { emailAddress, password } = parsed.data;
  const query = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, emailAddress),
  });
  if (query === undefined) {
    return "user doesn't exist";
  }
  const isPasswordCorrect = await bcrypt.compare(password, query.password);
  if (!isPasswordCorrect) {
    return "wrong password";
  }

  await createSession({ userId: query.id, role: query.role });
}

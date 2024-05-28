"use server";

import { z } from "zod";
import * as bcrypt from "bcrypt";
import { kv } from "@vercel/kv";
import { randomBytes } from "crypto";
import { Resend } from "resend";
import { ConfirmRegistrationEmail } from "./Email";
import { redirect } from "next/navigation";
import { db } from "@/drizzle/db";

const resend = new Resend(process.env.RESEND_API_KEY);

const registerForm = z.object({
  displayName: z
    .string()
    .min(2, "The display name should be at least 2 characters long."),
  emailAddress: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .regex(
      /[ -~]+/,
      "The password should only contain Latin characters, digits, and symbol characters.",
    )
    .min(8, "The password needs to be at least 8 characters long.")
    .max(70, "The password can't be longer than 70 characters."),
});
export type RegisterFormState = {
  formErrors?: {
    displayName?: string[] | undefined;
    emailAddress?: string[] | undefined;
    password?: string[] | undefined;
  };
  emailError?: string;
  userExistsError?: string;
};
export async function register(
  _state: RegisterFormState,
  fd: FormData,
): Promise<RegisterFormState> {
  const parsed = registerForm.safeParse({
    displayName: fd.get("display-name"),
    emailAddress: fd.get("email-address"),
    password: fd.get("password"),
  });
  if (!parsed.success) {
    return { formErrors: parsed.error.flatten().fieldErrors };
  }
  const { displayName, emailAddress, password: rawPassword } = parsed.data;

  const query = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, emailAddress),
    columns: { createdAt: true, displayName: true },
  });
  if (query !== undefined) {
    return {
      userExistsError: `The email ${emailAddress} is already associated with an account ${
        query.displayName
      }. Created ${query.createdAt.toLocaleString()}`,
    };
  }

  const password = await bcrypt.hash(rawPassword, 10);
  const code = randomBytes(20).toString("base64url");
  await kv.hset(code, { displayName, emailAddress, password });
  await kv.expire(code, 600); // 10 minutes
  const confirmation =
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://live-davenings.vercel.app") +
    `/account/register/confirm?code=${code}`;
  const email = await resend.emails.send({
    from: "Live Davenings <onboarding@resend.dev>",
    to: [emailAddress],
    subject: "Confirm your Live Davenings account",
    react: ConfirmRegistrationEmail({
      displayName,
      emailAddress,
      confirmation,
    }),
  });
  if (email.error) {
    return { emailError: email.error.message };
  }
  redirect("/account/register/sent");
}

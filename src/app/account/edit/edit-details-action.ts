"use server";

import { db } from "@/drizzle/db";
import { inferFlattenedErrors, z } from "zod";
import * as bcrypt from "bcrypt";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const detailsForm = z.object({
  userId: z.string().transform((s) => parseInt(s, 10)),
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  password: z.string().min(8).max(72),
  newPassword: z
    .string()
    .regex(
      /[ -~]+/,
      "The password should only contain Latin characters, digits, and symbol characters.",
    )
    .min(8)
    .max(70)
    .optional(),
  confirmPassword: z.string().optional(),
});
export type DetailsFormErrors = inferFlattenedErrors<
  typeof detailsForm
>["fieldErrors"];

export async function editDetails(
  _state: DetailsFormErrors,
  fd: FormData,
): Promise<DetailsFormErrors> {
  const parsed = detailsForm.safeParse({
    userId: fd.get("user-id"),
    displayName: fd.get("display-name"),
    password: fd.get("password"),
    newPassword: fd.get("new-password") || undefined,
    confirmPassword: fd.get("confirm-password") || undefined,
  });
  if (!parsed.success) {
    return parsed.error.flatten().fieldErrors;
  }
  if (parsed.data.newPassword !== parsed.data.confirmPassword) {
    return {
      confirmPassword: [
        "The confirmed password field should match your selected new password.",
      ],
    };
  }
  const {
    userId,
    password: currentPassword,
    displayName,
    newPassword,
  } = parsed.data;
  const query = (await db.query.users.findFirst({
    where: eq(users.id, userId),
  }))!;
  const isPasswordCorrect = await bcrypt.compare(
    currentPassword,
    query.password,
  );
  if (!isPasswordCorrect) {
    return { password: ["The password is incorrect"] };
  }
  const password = await bcrypt.hash(newPassword || currentPassword, 10);
  await db
    .update(users)
    .set({ displayName, password })
    .where(eq(users.id, userId));
  redirect("/account");
}

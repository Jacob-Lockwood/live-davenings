import { getSession } from "@/app/lib/session";
import { db } from "@/drizzle/db";
import Link from "next/link";
import { DetailsForm } from "./DetailsForm";

export default async function EditAccountDetails() {
  const { userId } = (await getSession())!;
  const user = (await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  }))!;

  return (
    <main className="mx-auto">
      <h1 className="text-center text-lg">Edit account details</h1>
      <DetailsForm
        id={user.id}
        displayName={user.displayName}
        email={user.email}
      />
    </main>
  );
}

import { db } from "@/drizzle/db";
import { getSession } from "../lib/session";
import Link from "next/link";

export default async function AccountDetails() {
  const { userId } = (await getSession())!;
  const user = (await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  }))!;
  return (
    <main className="mx-auto max-w-lg">
      <h1 className="text-center text-lg">Account details</h1>
      <div className="my-5 grid grid-cols-2 gap-x-5 gap-y-10">
        <p>Email address</p>
        <p>{user.email}</p>
        <p>Display name</p>
        <p>{user.displayName}</p>
        <p>Account creation date</p>
        <p>{user.createdAt.toLocaleString()}</p>
        <p>User ID</p>
        <p>{user.id}</p>
      </div>
      <p className="text-center">
        <Link href="/account/edit" className=" text-sky-600 underline">
          Edit details
        </Link>
      </p>
    </main>
  );
}

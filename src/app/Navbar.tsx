import Link from "next/link";
import { getSession } from "./lib/session";

export async function NavBar() {
  const session = await getSession();
  return (
    <nav className="fixed top-0 flex w-full gap-10 bg-slate-200 px-20 py-5">
      <Link href="/" className="mr-auto text-xl">
        Live Davenings
      </Link>

      {session === undefined ? (
        <>
          <Link href="/account/register" className="underline">
            Register account
          </Link>
          <Link href="/account/sign-in" className="underline">
            Sign in
          </Link>
        </>
      ) : (
        <Link href="/account" className="underline">
          Account details
        </Link>
      )}
    </nav>
  );
}

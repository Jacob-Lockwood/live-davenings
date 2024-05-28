"use client";

import Link from "next/link";
import { signIn } from "./sign-in-action";
// import { useActionState } from "react";
import { useFormState } from "react-dom";
// useFormState is renamed to useActionState, but Next isn't
// using that newest canary yet.

export default function SignIn() {
  const [state, action] = useFormState(signIn, undefined); // rename when Next does
  return (
    <main>
      <h1 className="text-center text-xl">Sign in to Live Davenings</h1>
      <p className="my-10 text-center">
        This page is for signing in to your existing Live Davenings account. If
        you don’t have an account yet, please go to{" "}
        <Link href="/account/register" className="text-sky-600 underline">
          the account registration page
        </Link>{" "}
        to create a Live Davenings account.
      </p>
      <form action={action} className="grid grid-cols-2 gap-10">
        <div>
          <label htmlFor="email-address">Email address</label>
          {state === "invalid email" && (
            <p className="text-red-600">
              The email address must be a valid email.
            </p>
          )}
          {state === "user doesn't exist" && (
            <p className="text-red-600">
              There is no account registered with this email. If you are trying
              to make a Live Davenings account, use the{" "}
              <Link href="/account/register" className="underline">
                account registration page.
              </Link>
            </p>
          )}
        </div>
        <input
          id="email-address"
          name="email-address"
          type="email"
          placeholder="Email address"
          className="h-8 px-2"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="h-8 px-2"
          required
        />
        <button
          type="submit"
          className="col-span-2 mx-auto w-max border border-slate-400 bg-slate-200 p-5 hover:bg-slate-50"
        >
          <span className="underline">Sign in</span> &rarr;
        </button>
      </form>
    </main>
  );
}

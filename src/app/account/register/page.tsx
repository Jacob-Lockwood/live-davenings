"use client";

import Link from "next/link";
import { register } from "./register-action";
// import { useActionState } from "react";
import { useFormState } from "react-dom";
// useFormState is renamed to useActionState, but Next isn't
// using that newest canary yet.

const RegisterFormError = (props: { error: string[] | undefined }) =>
  props.error && <p className="text-red-600">{props.error}</p>;

export default function Register() {
  const [state, action] = useFormState(register, {}); // rename when Next does
  return (
    <main>
      <p className="text-center text-lg">
        Fill out this form to register your Live Davenings account. All fields
        are required.
      </p>
      <p className="my-10 text-center">
        Already have an account? Use the{" "}
        <Link href="/account/sign-in" className="text-sky-600 underline">
          sign in page
        </Link>{" "}
        instead.
      </p>
      <form action={action} className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="display-name">Display name</label>
          <p className="text-md text-slate-500">
            This name will be visible to everybody who sees content you share on
            Live Davenings. It doesn’t have to be your real name, but it can be.
          </p>
          <RegisterFormError error={state?.formErrors?.displayName} />
        </div>
        <input
          id="display-name"
          name="display-name"
          placeholder="Display name"
          className="h-8 px-2"
          required
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="email-address">Email address</label>
          <p className="text-md text-slate-500">
            You won’t get a lot of emails from us, but we need this in case we
            have to change your account or notify you about important changes to
            Live Davening. The site also gives you the option to receive emails
            when somebody responds to comments you share here.
          </p>
          <RegisterFormError error={state?.formErrors?.emailAddress} />
        </div>
        <input
          id="email-address"
          name="email-address"
          type="email"
          placeholder="Email address"
          className="h-8 px-2"
          required
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <p className="text-md text-slate-500">
            Make sure to use a secure password, we don’t wan’t anybody to have
            their account stolen because an attacker guessed their password.
          </p>
          <RegisterFormError error={state?.formErrors?.password} />
        </div>
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
          <span className="underline">Continue registration</span> &rarr;
        </button>
      </form>
    </main>
  );
}

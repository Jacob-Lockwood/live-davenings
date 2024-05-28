"use client";

import { users } from "@/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom"; // useActionState
import { editDetails } from "./edit-details-action";

type User = InferSelectModel<typeof users>;
type DetailsFormProps = Pick<User, "id" | "email" | "displayName">;

export function DetailsForm(props: DetailsFormProps) {
  const [errors, action] = useFormState(editDetails, {});
  const [changingPassword, setChangingPassword] = useState(false);
  return (
    <form action={action} className="my-10 grid grid-cols-2 gap-x-5 gap-y-10">
      <input
        type="text"
        id="user-id"
        name="user-id"
        value={props.id}
        className="hidden"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="display-name">Display name</label>
        {errors.displayName && (
          <p className="text-red-600">{errors.displayName}</p>
        )}
      </div>
      <input
        id="display-name"
        name="display-name"
        defaultValue={props.displayName}
        className="h-8 px-2"
        required
      />

      {/* <div className="flex flex-col gap-2">
        <label htmlFor="email-address">Email address</label>
      </div>
      <input
        id="email-address"
        name="email-address"
        type="email"
        value={props.email}
        className="h-8 px-2"
        required
      /> */}

      {changingPassword ? (
        <>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Current password</label>
            {errors.password && (
              <p className="text-red-600">{errors.password}</p>
            )}
          </div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Current password"
            className="h-8 px-2"
            required
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="new-password">New password</label>
            {errors.newPassword && (
              <p className="text-red-600">{errors.newPassword}</p>
            )}
          </div>
          <input
            id="new-password"
            name="new-password"
            type="password"
            placeholder="New password"
            className="h-8 px-2"
            required
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="confirm-password">Confirm new password</label>
            {errors.confirmPassword && (
              <p className="text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="Confirm password"
              className="h-8 px-2"
              required
            />
            <button
              onClick={() => setChangingPassword(false)}
              className="text-left text-sky-600 underline"
            >
              Cancel password change
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            {errors.password && (
              <p className="text-red-600">{errors.password}</p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="h-8 px-2"
              required
            />
            <button
              onClick={() => setChangingPassword(true)}
              className="text-left text-sky-600 underline"
            >
              Change password
            </button>
          </div>
        </>
      )}

      <Link
        href="/account"
        className="mx-auto w-max border border-slate-400 bg-slate-200 p-5 hover:bg-slate-50"
      >
        &larr; <span className="underline">Cancel changes</span>
      </Link>
      <button
        type="submit"
        className="mx-auto w-max border border-slate-400 bg-slate-200 p-5 hover:bg-slate-50"
      >
        <span className="underline">Update details</span> &rarr;
      </button>
    </form>
  );
}

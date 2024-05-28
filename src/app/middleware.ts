import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

const loggedInRoutes = ["/account", "/account/edit", "/recordings/submit"];

export async function middleware(request: NextRequest) {
  const session = await getSession();
  if (
    session === undefined &&
    loggedInRoutes.includes(request.nextUrl.pathname)
  ) {
    const root = new URL("/account/sign-in", request.nextUrl.origin);
    return NextResponse.redirect(root);
  }
}

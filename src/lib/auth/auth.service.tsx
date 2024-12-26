"use server";
import { AUTH_SESSION_KEY } from "./auth.const";
import { Session, JWT } from "./auth.model";

import { cookies } from "next/headers";
export async function clearCookieSession() {
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });
}
export async function setCookieSession(session: Session) {
  const cookieStore = await cookies();
  const expires = new Date();
  expires.setHours(expires.getHours() + 4); // Set the expiration time to 2 minutes from now
  cookieStore.set({
    name: AUTH_SESSION_KEY,
    value: JSON.stringify(session),
    httpOnly: true,
    path: "/",
    expires,
  });
}
export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_SESSION_KEY)?.value;
  if (session) {
    return JSON.parse(session) as Session;
  }
  return undefined;
}
export async function getAccessSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_SESSION_KEY)?.value;
  if (session) {
    return JSON.parse(session) as JWT;
  }
  return undefined;
}
export async function getSessionUser() {
  const session = await getSession();
  if (session) {
    return session.user;
  }
  return undefined;
}

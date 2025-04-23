"use server"

import { cookies } from "next/headers";
import { ILogin } from "./page";

export async function actLogin(payload: ILogin) {
  const url: string = process.env.API_URL + "/login";
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
  if (!resp.ok) {
    return { error: true, message: result.message };
  }
  const cookieStore = await cookies();
  cookieStore.set({
    name: "access_token",
    value: result.token,
  });
  return { error: false };
}
"use server"

import { cookies } from "next/headers";
import { ILogin } from "./page";
import CustomError from "@/db/exceptions/CustomError";

export async function actLogin(payload: ILogin) {
  try {
    const url: string = process.env.NEXT_PUBLIC_API_URL + "/login";
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
  } catch (error: unknown) {
    console.log(error);
    
    if (error instanceof CustomError) {
      return { error: true, message: error.message };
    }
    return { error: true, message: "Internal Server Error" };
  }
}
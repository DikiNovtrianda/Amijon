"use server";

import { IRegister } from "./page";

export async function actRegister(payload: IRegister) {
  try {
    const url: string = process.env.NEXT_PUBLIC_API_URL + "/register";
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await resp.json();

    if (!resp.ok) {
      throw new Error(result.message || "Registration failed");
    }

    return { error: false, message: result.message }; // Return a plain object
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: true, message: error.message }; // Return a plain object
    }
    return { error: true, message: "Internal Server Error" }; // Return a plain object
  }
}
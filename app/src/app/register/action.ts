"use server"

import { IRegister } from "./page"

export async function actRegister(payload: IRegister) {
  const url: string = process.env.NEXT_PUBLIC_API_URL + "/register"
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
  const result = await resp.json()
  if (!resp.ok) {
    return { error: true, message: result.message }
  }
  return { error: false, message: result.message }
}
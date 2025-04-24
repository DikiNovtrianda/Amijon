"use server"

import { verifyToken } from "@/db/helpers/jwt"
import { cookies } from "next/headers"

export async function actWishlist(productId: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")
  if (!token?.value) {
    return { error: true, message: "Unauthorized" }
  }
  const { _id } = verifyToken(token?.value) as { _id: string }
  const url: string = process.env.API_URL + "/wishlist"
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({ userId: _id, productId }),
  })
  const result = await resp.json()
  return {error: false, message: result}
}
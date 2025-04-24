"use server"

import { cookies } from "next/headers";

export async function actWishlist(productId: string) {
  const url: string = process.env.API_URL + "/wishlist"
	const cookieStore = await cookies();
	const token = cookieStore.get("access_token");
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
			Cookie: `access_token=${token?.value}`,
    },
    body: JSON.stringify({ productId }),
  })
  const result = await resp.json()
  return {error: false, message: result}
}
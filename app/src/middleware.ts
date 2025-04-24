import * as jose from 'jose'
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("api")) {
    if (
      request.nextUrl.pathname.startsWith("/api/wishlist") || 
      request.nextUrl.pathname.startsWith("/api/products")
    ) {
      const cookieStore = await cookies()
      const token = cookieStore.get("access_token")
      if (!token) return new Response("Unauthorized", { status: 401 })
      const secret = new TextEncoder().encode(process.env.JWT_SECRET as string)
      const { payload } = await jose.jwtVerify<{ _id: string, username: string}>(token.value, secret)
      if (!payload._id || !payload.username) return new Response("Unauthorized", { status: 401 })
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set("x-user-id", payload._id)
      requestHeaders.set("x-user-username", payload.username)
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
      return response
    }
  }
}
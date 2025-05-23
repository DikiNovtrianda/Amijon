import * as jose from 'jose'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  async function findCookies() {
    const cookieStore = await cookies()
    return cookieStore.get("access_token")
  }
  
  async function authentication(token: RequestCookie) {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET as string)
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

  if (request.nextUrl.pathname.startsWith("/api")) {
    if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
      const token = await findCookies()
      if (!token) return new Response("Unauthorized", { status: 401 })
      return authentication(token)
    } else if (request.nextUrl.pathname.startsWith("/api/products")) {
      const token = await findCookies()
      if (!token) return
      return authentication(token)
    }
  }
}
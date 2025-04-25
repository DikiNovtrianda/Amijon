import jwt, { JwtPayload } from 'jsonwebtoken'

const NEXT_PUBLIC_JWT_SECRET : string = process.env.NEXT_PUBLIC_JWT_SECRET!

export const generateToken = (payload: object) : string => {
  return jwt.sign(payload, NEXT_PUBLIC_JWT_SECRET)
}

export const verifyToken = (token: string) : string | JwtPayload => {
  return jwt.verify(token, NEXT_PUBLIC_JWT_SECRET)
}

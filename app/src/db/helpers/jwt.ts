import jwt, { JwtPayload } from 'jsonwebtoken'

const NEXT_PUBLIC_API_URL : string = process.env.NEXT_PUBLIC_API_URL!

export const generateToken = (payload: object) : string => {
  return jwt.sign(payload, NEXT_PUBLIC_API_URL)
}

export const verifyToken = (token: string) : string | JwtPayload => {
  return jwt.verify(token, NEXT_PUBLIC_API_URL)
}

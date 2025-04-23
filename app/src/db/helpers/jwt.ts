import jwt, { JwtPayload } from 'jsonwebtoken'

const JWT_SECRET : string = process.env.JWT_SECRET!

export const generateToken = (payload: string) : string => {
  return jwt.sign(payload, JWT_SECRET)
}

export const verifyToken = (token: string) : string | JwtPayload => {
  return jwt.verify(token, JWT_SECRET)
}

import { SECRET_KEY } from '../configs'
import { sign } from 'jsonwebtoken'

export const createToken = (payload: Http.TokenPayload): Http.TokenData => {
  const secretKey = SECRET_KEY || 'auth-secrete'
  const expiresIn = '3 days'

  return { expiresIn, token: sign(payload, secretKey, { expiresIn }) }
}

export const createCookie = (tokenData: Http.TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`
}

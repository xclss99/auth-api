import { UserEntity } from '@/modules/user'
import { NextFunction, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { SECRET_KEY } from '~/configs'
import { HttpException } from '~/exceptions'
import { HttpStatus } from '../enum'

const getToken = (req: Http.RequestWithUser) => {
  const header = req.headers['authorization']
  if (header) {
    return header.split('Bearer ')[1]
  }
  return null
}

export const AuthMiddleware = async (
  req: Http.RequestWithUser,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = getToken(req)
    if (token) {
      const { id } = verify(token, SECRET_KEY || 'auth-secret') as Http.TokenPayload
      const user = await UserEntity.findOneBy({ id })
      if (user) {
        req.id = user.id
        req.mobile = user.mobile
        next()
      } else {
        next(new HttpException({ message: 'Wrong authentication token' }, HttpStatus.Unauthorized))
      }
    } else {
      next(new HttpException({ message: 'Authentication token missing' }, HttpStatus.Unauthorized))
    }
  } catch (error) {
    const message = `Wrong authentication token, ${error}`
    next(new HttpException({ message }, HttpStatus.Unauthorized))
  }
}

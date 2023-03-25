import { NextFunction, Request, Response } from 'express'
import { HttpException } from '~/exceptions'
import { logger, getClientIp } from '~/utils'

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response<Http.ResponseBody>,
  next: NextFunction
) => {
  try {
    const ip = getClientIp(req)
    if (error.responseBody) {
      const { errorCode, message } = error.responseBody
      const status = error.httpStatus || 500
      error.message = message || 'Oops! Something went wrong.'

      logger.error(
        `(${ip})<${req.headers['user-agent']}>[${req.method}] ${req.path} => ErrorCode: ${errorCode}, Message: ${error.message}`
      )
      res.status(status).json({ errorCode, message })
    } else {
      const status = error.httpStatus || 500
      const message = error.message
      logger.error(
        `(${ip})<${req.headers['user-agent']}>[${req.method}] ${req.path} => httpStatus: ${status}, Message: ${error.message}`
      )
      res.status(status).json({ message })
    }
  } catch (error) {
    next(error)
  }
}

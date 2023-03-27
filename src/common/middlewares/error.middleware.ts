import { NextFunction, Request, Response } from 'express'
import { HttpException } from '~/exceptions'
import { logger, getClientIp, httpLogFormat } from '~/utils'

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ip = getClientIp(req)
    if (error.responseBody) {
      const { errorCode, message } = error.responseBody
      const status = error.httpStatus || 500
      error.message = message || 'Oops! Something went wrong.'

      const { headers, method, path } = req
      const logContent = httpLogFormat(
        String(ip),
        headers['user-agent'] || '',
        method,
        path,
        status,
        error.message,
        errorCode
      )
      logger.error(logContent)
      res.status(status).json({ errorCode, message: error.message })
    } else {
      const status = error.httpStatus || 500
      const message = error.message || 'Oops! Something went wrong.'

      const { headers, method, path } = req
      const logContent = httpLogFormat(
        String(ip),
        headers['user-agent'] || '',
        method,
        path,
        status,
        message
      )
      logger.error(logContent)
      res.status(status).json({ message })
    }
  } catch (error) {
    next(error)
  }
}

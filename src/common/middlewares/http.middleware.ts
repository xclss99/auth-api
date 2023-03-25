import { NextFunction, Request, Response } from 'express'
import { logger, getClientIp } from '~/utils'

export const httpMiddleware = (
  req: Request,
  res: Response<Http.ResponseBody>,
  next: NextFunction
) => {
  const ip = getClientIp(req)
  const { statusCode, statusMessage } = res
  const logContent = `(${ip})<${req.headers['user-agent']}>[${req.method}] ${req.path} => StatusCode: ${statusCode} Message: ${statusMessage}`
  if (statusCode === 200) {
    logger.http(logContent)
  } else {
    logger.warn(logContent)
  }
  next()
}

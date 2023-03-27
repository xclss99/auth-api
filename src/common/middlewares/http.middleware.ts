import { NextFunction, Request, Response } from 'express'
import { logger, getClientIp, httpLogFormat } from '~/utils'

export const httpMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const ip = getClientIp(req)
  const { statusCode, statusMessage } = res
  const { headers, method, path } = req
  const logContent = httpLogFormat(
    String(ip),
    headers['user-agent'] || '',
    method,
    path,
    statusCode,
    statusMessage
  )
  if (statusCode === 200) {
    logger.info(logContent)
  } else {
    logger.warn(logContent)
  }
  next()
}

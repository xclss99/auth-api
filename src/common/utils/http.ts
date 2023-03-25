import { Request } from 'express'

/** 获取客户端IP */
export const getClientIp = (req: Request) => {
  return req.headers['x-forwarded-for'] || (req.socket.remoteAddress ?? 'socket is destroyed')
}

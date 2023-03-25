declare namespace Http {
  interface ResponseBody<T = undefined> {
    errorCode?: number
    data?: T
    message: string
  }
  interface TokenData {
    token: string
    expiresIn: string | number
  }
  interface TokenPayload {
    id: number
    mobile: string
    username: string
  }
  type Request = import('express').Request
  interface RequestWithUser extends Request {
    id: number
    mobile: string
  }
}

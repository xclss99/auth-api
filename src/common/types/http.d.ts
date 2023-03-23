declare namespace Http {
  interface ResponseBody<T = undefined> {
    code?: number
    data?: T
    message: string
  }
}

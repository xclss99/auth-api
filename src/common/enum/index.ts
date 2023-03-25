export enum HttpStatus {
  OK = 200,
  Unauthorized = 401,
  NotFound = 404
}

/** 异常错误码 */
export enum ErrorCode {
  ENTITY_NOT_FOUND = 10001,
  ENTITY_ALREADY_EXISTS,
  INVALID_MOBILE = 20001,
  INVALID_USERNAME,
  INVALID_PASSWORD,
  WRONG_PASSWORD = 30001,
  WRONG_VERIFY_CODE
}

/** 账号类型 (mobile: 0, username: 1) */
export enum AccountType {
  mobile,
  username
}

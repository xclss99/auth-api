import { HttpError } from 'routing-controllers'
import { HttpStatus, ErrorCode } from '~/enum'

export class HttpException extends HttpError {
  public responseBody: Http.ResponseBody
  public httpStatus: HttpStatus

  constructor(responseBody: Http.ResponseBody, httpStatus: HttpStatus) {
    super(Number(HttpStatus), responseBody.message)
    this.responseBody = responseBody
    this.httpStatus = httpStatus
  }
}

export class ErrorResponse extends HttpException {
  constructor(responseBody: Http.ResponseBody) {
    super(responseBody, HttpStatus.OK)
  }
}

export class EntityNotFoundException extends ErrorResponse {
  constructor(entityName: string, field: KeyField, value: string) {
    const message = `${entityName} not found with ${field} '${value}' .`
    const errorCode = ErrorCode.ENTITY_NOT_FOUND
    super({ errorCode, message })
  }
}

export class EntityAlreadyExistsException extends ErrorResponse {
  constructor(entityName: string, field: KeyField, value: string) {
    const message = `${entityName} with ${field} '${value}' already exists.`
    const errorCode = ErrorCode.ENTITY_ALREADY_EXISTS
    super({ errorCode, message })
  }
}

export class InvalidMobileException extends ErrorResponse {
  constructor(mobile: string) {
    const message = `Invalid mobile '${mobile}' !`
    const errorCode = ErrorCode.INVALID_MOBILE
    super({ errorCode, message })
  }
}

export class InvalidUsernameException extends ErrorResponse {
  constructor(username: string) {
    const message = `Invalid username '${username}' !`
    const errorCode = ErrorCode.INVALID_USERNAME
    super({ errorCode, message })
  }
}

export class InvalidPasswordException extends ErrorResponse {
  constructor() {
    const message = `Invalid password!`
    const errorCode = ErrorCode.INVALID_PASSWORD
    super({ errorCode, message })
  }
}

export class WrongPasswordException extends ErrorResponse {
  constructor() {
    const message = `Wrong password!`
    const errorCode = ErrorCode.WRONG_PASSWORD
    super({ errorCode, message })
  }
}

export class WrongVerifyCodeException extends ErrorResponse {
  constructor() {
    const message = `Wrong verify code!`
    const errorCode = ErrorCode.WRONG_VERIFY_CODE
    super({ errorCode, message })
  }
}

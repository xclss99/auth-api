import { HttpStatus, ErrorCode } from '~/enum'

export class HttpException extends Error {
  public responseBody: Http.ResponseBody
  public httpStatus: HttpStatus

  constructor(responseBody: Http.ResponseBody, httpStatus: HttpStatus) {
    super(responseBody.message)
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
    const code = ErrorCode.ENTITY_NOT_FOUND
    super({ code, message })
  }
}

export class EntityAlreadyExistsException extends ErrorResponse {
  constructor(entityName: string, field: KeyField, value: string) {
    const message = `${entityName} with ${field} '${value}' already exists.`
    const code = ErrorCode.ENTITY_ALREADY_EXISTS
    super({ code, message })
  }
}

export class InvalidMobileException extends ErrorResponse {
  constructor(mobile: string) {
    const message = `Invalid mobile '${mobile}' !`
    const code = ErrorCode.INVALID_MOBILE
    super({ code, message })
  }
}

export class InvalidUsernameException extends ErrorResponse {
  constructor(username: string) {
    const message = `Invalid username '${username}' !`
    const code = ErrorCode.INVALID_USERNAME
    super({ code, message })
  }
}

export class InvalidPasswordException extends ErrorResponse {
  constructor() {
    const message = `Invalid password!`
    const code = ErrorCode.INVALID_PASSWORD
    super({ code, message })
  }
}

export class WrongPasswordException extends ErrorResponse {
  constructor() {
    const message = `Wrong password!`
    const code = ErrorCode.WRONG_PASSWORD
    super({ code, message })
  }
}

import { isMobileCN, isPassword, isUsername } from './regExp'
import {
  InvalidMobileException,
  InvalidPasswordException,
  InvalidUsernameException
} from '../exceptions'

export const checkValidMobile = async (mobile: string) => {
  if (!isMobileCN(mobile)) {
    throw new InvalidMobileException(mobile)
  }
}

export const checkValidUsername = async (username: string) => {
  if (!isUsername(username)) {
    throw new InvalidUsernameException(username)
  }
}

export const checkValidPassword = async (password: string) => {
  if (!isPassword(password)) {
    throw new InvalidPasswordException()
  }
}

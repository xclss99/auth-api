import { AccountType } from '~/enum'
import { User } from './entities/user.entity'
import { findUserRepository } from './repositories'
import { compareSync } from 'bcryptjs'
import { WrongPasswordException } from '~/exceptions'

export class UserService {
  async passwordLogin({ accountType, account, password }: PasswordLoginDto): Promise<UserLoginBo> {
    let user: User
    if (accountType === AccountType.mobile) {
      user = await findUserRepository.findByMobile(account)
    } else {
      user = await findUserRepository.findByUsername(account)
    }
    if (!compareSync(password, user.password)) {
      throw new WrongPasswordException()
    }
    const { id, mobile, username } = user
    const token = ''
    return {
      id,
      mobile,
      username,
      token
    }
  }
}

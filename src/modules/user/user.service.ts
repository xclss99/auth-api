import { User } from './entities/user.entity'
// import { Repository } from 'typeorm'
import { isEmpty } from 'class-validator'
import { compareSync, hashSync } from 'bcryptjs'
import { AccountType } from '~/enum'
import {
  createToken,
  checkValidMobile,
  checkValidUsername,
  checkValidPassword,
  logger
} from '~/utils'
import {
  EntityAlreadyExistsException,
  EntityNotFoundException,
  WrongPasswordException,
  WrongVerifyCodeException
} from '~/exceptions'
import { Response } from 'express'

export class UserService {
  async signUp({ mobile, username, password }: SignUpDto): Promise<SignUpBo> {
    await checkValidMobile(mobile)
    await this.checkExistsByMobile(mobile)
    if (!isEmpty(username)) {
      username = String(username)
      await checkValidUsername(username)
      await this.checkExistsByUsername(username)
    }
    await checkValidPassword(password)
    const hashedPassword = hashSync(password)
    const { id } = await User.create({ mobile, username, password: hashedPassword }).save()
    logger.info(`A new user with mobile '${mobile}' signed up, with id '${id}'`)
    return { id }
  }

  async passwordLogin({ accountType, account, password }: PasswordLoginDto): Promise<LoginBo> {
    let user: User
    if (accountType === AccountType.mobile) {
      user = await this.findByMobile(account)
    } else {
      user = await this.findByUsername(account)
    }
    if (!compareSync(password, user.password)) {
      throw new WrongPasswordException()
    }

    const { id, mobile, username } = user
    const tokenData = createToken({ id, mobile, username })
    logger.info(`User with id '${id}' logged in`)
    return {
      id,
      mobile,
      username,
      tokenData
    }
  }

  async verifyCodeLogin({ accountType, account, verifyCode }: VerifyLoginDto): Promise<LoginBo> {
    let user: User
    if (accountType === AccountType.mobile) {
      user = await this.findByMobile(account)
    } else {
      user = await this.findByUsername(account)
    }
    const code = '3906'
    if (verifyCode !== code) {
      throw new WrongVerifyCodeException()
    }

    const { id, mobile, username } = user
    const tokenData = createToken({ id, mobile, username })
    logger.info(`User with id '${id}' logged in`)
    return {
      id,
      mobile,
      username,
      tokenData
    }
  }

  async logout(id: number) {
    await this.findById(id)
  }

  // async verifyCodeLogin(): Promise<LoginBo> {
  //   return {
  //     id,
  //     mobile,
  //     username,
  //     tokenData
  //   }
  // }

  private async checkExistsById(id: number) {
    const user = await User.findOneBy({ id, isDelete: false })
    if (user) {
      throw new EntityAlreadyExistsException('User', 'id', String(id))
    }
  }

  private async checkExistsByMobile(mobile: string) {
    const user = await User.findOneBy({ mobile, isDelete: false })
    if (user) {
      throw new EntityAlreadyExistsException('User', 'mobile', mobile)
    }
  }

  private async checkExistsByUsername(username: string) {
    const user = await User.findOneBy({ username, isDelete: false })
    if (user) {
      throw new EntityAlreadyExistsException('User', 'username', username)
    }
  }

  private async findById(id: number, entityName = 'User') {
    const user = await User.findOneBy({ id, isDelete: false })
    if (!user) {
      throw new EntityNotFoundException(entityName, 'id', String(id))
    }
    return user
  }

  private async findByMobile(mobile: string) {
    const user = await User.findOneBy({ mobile, isDelete: false })
    if (!user) {
      throw new EntityNotFoundException('User', 'mobile', mobile)
    }
    return user
  }

  private async findByUsername(username: string) {
    const user = await User.findOneBy({ username, isDelete: false })
    if (!user) {
      throw new EntityNotFoundException('User', 'username', username)
    }
    return user
  }
}

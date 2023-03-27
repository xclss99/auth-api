import { UserEntity } from './entities/user.entity'
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
    const { id } = await UserEntity.create({ mobile, username, password: hashedPassword }).save()
    logger.info(`A new user with mobile '${mobile}' signed up, with id '${id}'`)
    return { id }
  }

  async passwordLogin({ accountType, account, password }: PasswordLoginDto): Promise<LoginBo> {
    let user: UserEntity
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
    let user: UserEntity
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

  async findUserInfo(field: UserKeyField, value: string): Promise<User | null> {
    const userEntity = await UserEntity.createQueryBuilder('u')
      .where(`u.${field} = :value AND u.isDelete = '0'`, { value })
      .getOne()
    if (userEntity) {
      const { id, mobile, username, sex, avatar, profile, signUpTime } = userEntity
      return {
        id,
        mobile,
        username,
        sex,
        avatar,
        profile,
        signUpTime
      }
    }
    return userEntity
  }

  async updateUserInfo(id: number, { mobile, username, avatar, profile, sex }: UpdateUserInfoDto) {
    const user = await this.findById(id)
    console.log(mobile, username, avatar, profile, sex)
    user.save()
    logger.info(`User with id '${id}' updated`)
  }

  async updatePassword(id: number, { oldPassword, newPassword }: UpdatePasswordDto) {
    const user = await this.findById(id)
    if (!compareSync(oldPassword, user.password)) {
      throw new WrongPasswordException()
    }
    await checkValidPassword(newPassword)
    user.password = hashSync(newPassword)
    user.save()
    logger.info(`User with id '${id}' updated password`)
  }

  // async verifyCodeLogin(): Promise<LoginBo> {
  //   return {
  //     id,
  //     mobile,
  //     username,
  //     tokenData
  //   }
  // }

  // private async checkExistsById(id: number) {
  //   const user = await UserEntity.findOneBy({ id, isDelete: false })
  //   if (user) {
  //     throw new EntityAlreadyExistsException('User', 'id', String(id))
  //   }
  // }

  private async checkExistsByMobile(mobile: string) {
    const user = await UserEntity.findOneBy({ mobile, isDelete: false })
    if (user) {
      throw new EntityAlreadyExistsException('User', 'mobile', mobile)
    }
  }

  private async checkExistsByUsername(username: string) {
    const user = await UserEntity.findOneBy({ username, isDelete: false })
    if (user) {
      throw new EntityAlreadyExistsException('User', 'username', username)
    }
  }

  private async findById(id: number, entityName = 'User') {
    const user = await UserEntity.findOneBy({ id, isDelete: false })
    if (!user) {
      throw new EntityNotFoundException(entityName, 'id', String(id))
    }
    return user
  }

  private async findByMobile(mobile: string) {
    const user = await UserEntity.findOneBy({ mobile, isDelete: false })
    if (!user) {
      throw new EntityNotFoundException('User', 'mobile', mobile)
    }
    return user
  }

  private async findByUsername(username: string) {
    const user = await UserEntity.findOneBy({ username, isDelete: false })
    if (!user) {
      throw new EntityNotFoundException('User', 'username', username)
    }
    return user
  }
}

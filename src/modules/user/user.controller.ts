import { JsonController, Get, Post, Param, Body, UseBefore, Req } from 'routing-controllers'
import { UserService } from './user.service'
import { AuthMiddleware } from '~/middlewares'
import { logger } from '@/common/utils'

@JsonController()
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = new UserService()
  }

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<Http.ResponseBody<SignUpBo>> {
    const data: SignUpBo = await this.userService.signUp(signUpDto)
    return {
      data,
      message: 'sign up successfully'
    }
  }

  @Post('/login/password')
  async passwordLogin(@Body() loginDto: PasswordLoginDto): Promise<Http.ResponseBody<LoginBo>> {
    const data: LoginBo = await this.userService.passwordLogin(loginDto)
    return {
      data,
      message: 'login successfully'
    }
  }

  @Post('/login/verify-code')
  async verifyCodeLogin(@Body() loginDto: VerifyLoginDto): Promise<Http.ResponseBody<LoginBo>> {
    const data: LoginBo = await this.userService.verifyCodeLogin(loginDto)
    return {
      data,
      message: 'login successfully'
    }
  }

  @Post('/logout')
  @UseBefore(AuthMiddleware)
  async logout(@Req() req: Http.RequestWithUser): Promise<Http.ResponseBody> {
    const { id } = req
    logger.info(`user logout with ${id}`)
    return {
      message: 'logout successfully'
    }
  }

  @Get('/user/:field/:value')
  @UseBefore(AuthMiddleware)
  async findUser(
    @Param('field') field: UserKeyField,
    @Param('value') value: string
  ): Promise<Http.ResponseBody<User | null>> {
    const data = await this.userService.findUserInfo(field, value)
    const message = data ? 'find successfully' : 'user not found'
    return {
      data,
      message
    }
  }

  @Post('/user')
  @UseBefore(AuthMiddleware)
  async updateUser(
    @Req() req: Http.RequestWithUser,
    @Body() updateUserInfoDto: UpdateUserInfoDto
  ): Promise<Http.ResponseBody> {
    const { id } = req
    await this.userService.updateUserInfo(id, updateUserInfoDto)
    return {
      message: 'password updated'
    }
  }

  @Post('/password')
  @UseBefore(AuthMiddleware)
  async updatePassword(
    @Req() req: Http.RequestWithUser,
    @Body() updatePasswordDto: UpdatePasswordDto
  ): Promise<Http.ResponseBody> {
    const { id } = req
    await this.userService.updatePassword(id, updatePasswordDto)
    return {
      message: 'password updated'
    }
  }
}

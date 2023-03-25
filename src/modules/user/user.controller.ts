import { JsonController, Post, Body, UseBefore, Req, Res } from 'routing-controllers'
import { Response } from 'express'
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
      message: 'Sign up successfully!'
    }
  }

  @Post('/login/password')
  async passwordLogin(@Body() loginDto: PasswordLoginDto): Promise<Http.ResponseBody<LoginBo>> {
    const data: LoginBo = await this.userService.passwordLogin(loginDto)
    return {
      data,
      message: 'Login successfully!'
    }
  }

  @Post('/login/verify-code')
  async verifyCodeLogin(@Body() loginDto: VerifyLoginDto): Promise<Http.ResponseBody<LoginBo>> {
    const data: LoginBo = await this.userService.verifyCodeLogin(loginDto)
    return {
      data,
      message: 'Login successfully!'
    }
  }

  @Post('/logout')
  @UseBefore(AuthMiddleware)
  async logout(@Req() req: Http.RequestWithUser): Promise<Http.ResponseBody> {
    const { id } = req
    // await this.userService.logout(id)
    logger.info(`user logout with ${id}`)
    return {
      message: 'Logout'
    }
  }
}

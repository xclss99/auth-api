import { JsonController, Post, Body } from 'routing-controllers'
import { UserService } from './user.service'

@JsonController()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async passwordLogin(@Body() loginDto: PasswordLoginDto) {
    const data = await this.userService.passwordLogin(loginDto)
    const res: Http.ResponseBody<UserLoginBo> = {
      data,
      message: 'login successfully!'
    }
    return res
  }
}

import { JsonController, Get } from 'routing-controllers'

@JsonController()
export class AppController {
  @Get('/')
  async greet() {
    return {
      message: 'ok!!!'
    }
  }
}

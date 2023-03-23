import App from '@/app'
import { AppController } from './app.controller'
import { UserController } from './modules/user'

const start = async () => {
  const app = new App([AppController, UserController])

  app.listen()
}

start()

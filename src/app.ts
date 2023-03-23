import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { NODE_ENV, PORT, DB_PORT, dataSource } from '~/configs'
import { logger } from '~/utils'
import { useExpressServer } from 'routing-controllers'
import { errorMiddleware } from '~/middlewares'

class App {
  public app: express.Application
  public env: string
  public port: string | number

  constructor(controllers: Function[]) {
    this.app = express()
    this.env = NODE_ENV || 'development'
    this.port = PORT || 3300

    this.initDB()
    this.initMiddlewares()
    this.initRoutes(controllers)
    this.initErrorHandling()
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`========================================`)
      logger.info(`=========== ENV: ${this.env} ===========`)
      logger.info(`  🚀 App listening on the port ${this.port}`)
      logger.info(`========================================`)
    })
  }

  public getServer() {
    return this.app
  }

  private initDB() {
    dataSource
      .initialize()
      .then(() => {
        logger.info(` 🚀 MariaDB listening on the port ${DB_PORT} `)
        logger.info('========================================')
      })
      .catch((err) => {
        logger.error(`Error during Data Source initialization. ${err}`)
      })
  }

  private initMiddlewares() {
    // 配置跨域代理
    this.app.use(cors())
    // 请求解析
    this.app.use(json())
    this.app.use(urlencoded({ extended: true }))
  }

  private initRoutes(controllers: Function[]) {
    useExpressServer(this.app, {
      controllers,
      defaultErrorHandler: false
    })
  }

  private initErrorHandling() {
    this.app.use(errorMiddleware)
  }
}

export default App

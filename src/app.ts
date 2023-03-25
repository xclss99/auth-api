import express from 'express'
import { NODE_ENV, PORT, DB_PORT, dataSource } from '~/configs'
import { logger } from '~/utils'
import { createExpressServer } from 'routing-controllers'
import { errorMiddleware, httpMiddleware } from '~/middlewares'

class App {
  private app: express.Application
  private env: string
  private port: string | number

  constructor(controllers: Function[]) {
    this.app = createExpressServer({
      cors: true,
      controllers,
      defaultErrorHandler: false
    })
    this.env = NODE_ENV || 'development'
    this.port = PORT || 3000

    this.app.all('*', (_req, res, next) => {
      if (res.statusMessage === undefined) {
        res.statusCode = 404
        res.statusMessage = '404 not found'
      }
      next()
    })

    this.initDataSource()
    this.initErrorHandler()
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

  private initDataSource() {
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

  private initErrorHandler() {
    this.app.use(httpMiddleware)
    this.app.use(errorMiddleware)
  }
}

export default App

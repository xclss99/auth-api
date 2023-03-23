import { DataSource } from 'typeorm'
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '~/configs'
import { User } from '@/modules/user'

export const dataSource = new DataSource({
  type: 'mariadb',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User]
})

import { dataSource } from '~/configs'
import { User } from '../entities/user.entity'

export const userRepository = dataSource.getRepository(User)

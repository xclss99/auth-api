import { userRepository } from './user.repository'
import { EntityNotFoundException } from '~/exceptions'

export const findUserRepository = {
  async findById(id: number, entityName = 'User') {
    const user = await userRepository.findOneBy({ id })
    if (!user) {
      throw new EntityNotFoundException(entityName, 'id', String(id))
    }
    return user
  },

  async findByMobile(mobile: string) {
    const user = await userRepository.findOneBy({ mobile })
    if (!user) {
      throw new EntityNotFoundException('User', 'mobile', mobile)
    }
    return user
  },

  async findByUsername(username: string) {
    const user = await userRepository.findOneBy({ username })
    if (!user) {
      throw new EntityNotFoundException('User', 'username', username)
    }
    return user
  }
}

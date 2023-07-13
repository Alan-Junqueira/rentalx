import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "../../repositories/IUsersRepository"

interface IRequest {
  userId: string
  avatarFile: string
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }
  async execute({
    avatarFile,
    userId
  }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    user.avatar = avatarFile

    await this.usersRepository.create(user)
  }
}
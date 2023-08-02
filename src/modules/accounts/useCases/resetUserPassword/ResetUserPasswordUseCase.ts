import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/DateProvider";
import { AppError } from "@shared/errors/AppError";

interface IResetUserPasswordUseCaseRequest {
  token: string
  password: string
}

@injectable()
export class ResetUserPasswordUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }
  async execute(data: IResetUserPasswordUseCaseRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByRefreshToken(data.token)

    if (!userToken) {
      throw new AppError("Invalid token!")
    }

    if (this.dateProvider.compareIfBefore(userToken.expiresDate, this.dateProvider.dateNow())) {
      throw new AppError("Expired token!")
    }

    const user = await this.usersRepository.findById(userToken.userId)

    user.password = await hash(data.password, 8)

    await this.usersRepository.create(user)

    await this.userTokensRepository.deleteById(userToken.id)
  }
}
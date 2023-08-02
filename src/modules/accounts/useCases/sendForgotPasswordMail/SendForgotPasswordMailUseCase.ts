import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from 'uuid'

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/DateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) { }
  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("User doesn't exists")
    }

    const token = uuidV4()

    const expiresDate = this.dateProvider.addHours(3)

    await this.userTokensRepository.create({
      refreshToken: token,
      userId: user.id,
      expiresDate
    })

    await this.mailProvider.sendMail({
      to: email,
      subject: "Recuperação de senha",
      body: `O link para o reset é ${token}`
    })
  }
}
import { Repository, getRepository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IFindByUserIdAndRefreshTokenRequest, IUserTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { UserTokens } from "../entities/UserTokens";

export class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = getRepository(UserTokens)
  }

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create(data)

    await this.repository.save(userToken)

    return userToken
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findByRefreshToken(refreshToken: string): Promise<UserTokens> {
    const userToken = await this.repository.findOne({
      where: {
        refreshToken
      }
    })

    return userToken
  }

  async findByUserId(userId: string): Promise<UserTokens[]> {
    const userTokens = await this.repository.find({
      where: {
        userId
      }
    })

    return userTokens
  }

  async findByUserIdAndRefreshToken(data: IFindByUserIdAndRefreshTokenRequest): Promise<UserTokens> {
    const userToken = await this.repository.findOne({
      where: data
    })

    return userToken
  }
}
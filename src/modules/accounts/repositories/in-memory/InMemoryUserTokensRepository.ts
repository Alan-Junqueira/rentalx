import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IFindByUserIdAndRefreshTokenRequest, IUserTokensRepository } from "../IUsersTokensRepository";

export class InMemoryUserTokensRepository implements IUserTokensRepository {
  userTokens: UserTokens[] = []

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens()

    Object.assign(userToken, data)

    this.userTokens.push(userToken)

    return userToken
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.userTokens.find(ut => ut.id === id)

    this.userTokens.splice(this.userTokens.indexOf(userToken))
  }

  async findByUserId(userId: string): Promise<UserTokens[]> {
    const userToken = this.userTokens.filter(ut => ut.userId === userId)

    return userToken
  }

  async findByRefreshToken(refreshToken: string): Promise<UserTokens> {
    const userToken = this.userTokens.find(ut => ut.refreshToken === refreshToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(data: IFindByUserIdAndRefreshTokenRequest): Promise<UserTokens> {
    const userToken = this.userTokens.find(ut => ut.userId === data.userId && ut.refreshToken === data.refreshToken)

    return userToken
  }

}
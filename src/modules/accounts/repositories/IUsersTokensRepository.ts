import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface IFindByUserIdAndRefreshTokenRequest {
  userId: string,
  refreshToken: string
}

export interface IUserTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>
  deleteById(id: string): Promise<void>
  findByUserId(userId: string): Promise<Array<UserTokens>>
  findByRefreshToken(refreshToken: string): Promise<UserTokens>
  findByUserIdAndRefreshToken(data: IFindByUserIdAndRefreshTokenRequest): Promise<UserTokens>
}
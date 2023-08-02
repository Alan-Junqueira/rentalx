import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface IFindByUserIdAndRefreshTokenRequest {
  userId: string,
  refreshToken: string
}

export interface IUserTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>
  findByUserId(userId: string): Promise<Array<UserTokens>>
  findByUserIdAndRefreshToken(data: IFindByUserIdAndRefreshTokenRequest): Promise<UserTokens>
  deleteById(id: string): Promise<void>
}
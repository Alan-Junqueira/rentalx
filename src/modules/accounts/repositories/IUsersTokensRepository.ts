import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface IUserTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>
}
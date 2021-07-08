import { ICreateUserTokenDTO } from "@modules/users/dtos";
import { UserTokens } from "@modules/users/infra/typeorm/entities";

export interface IUsersTokensRepository {
  create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}

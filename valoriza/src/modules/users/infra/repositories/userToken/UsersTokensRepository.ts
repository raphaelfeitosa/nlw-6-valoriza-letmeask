import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/users/dtos";
import { IUsersTokensRepository } from "./IUsersTokensRepository";
import { UserTokens } from "@modules/users/infra/typeorm/entities";

export class UsersTokensRepository implements IUsersTokensRepository {
  private userTokenRepository: Repository<UserTokens>

  constructor() {
    this.userTokenRepository = getRepository(UserTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.userTokenRepository.create({
      user_id, expires_date, refresh_token
    });
    await this.userTokenRepository.save(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const usersTokens = await this.userTokenRepository.findOne({
      user_id,
      refresh_token
    });
    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.userTokenRepository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = await this.userTokenRepository.findOne({ refresh_token });
    return userToken;
  }
}

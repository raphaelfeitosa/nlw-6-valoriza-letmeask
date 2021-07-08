import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { badRequest } from "@hapi/boom";

import auth from "@config/auth";
import { IResponseRefreshTokenDTO } from "@modules/users/dtos";
import { IUsersTokensRepository } from "@modules/users/infra/repositories/userToken";
import { IDateProvider } from "@shared/container/providers/dateProvider";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DaysJSDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute(token: string): Promise<IResponseRefreshTokenDTO> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;
    const user_id = sub;
    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);
    if (!userToken) throw badRequest("Refresh Token does not exists!");
    await this.usersTokensRepository.deleteById(userToken.id);
    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token
    })
    const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days);
    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id
    });
    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token
    });
    return {
      refresh_token,
      token: newToken
    };
  }
}

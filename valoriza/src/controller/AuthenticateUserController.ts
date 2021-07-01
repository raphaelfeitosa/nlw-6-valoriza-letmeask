import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticadeUserService";


class AuthenticateUserController {

  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const accessToken = await authenticateUserService.execute({
      email,
      password
    });

    return response.json({ accessToken: accessToken });
  }
}
export { AuthenticateUserController };

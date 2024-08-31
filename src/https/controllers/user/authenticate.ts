import { Request, Response } from "express";
import { z } from "zod";

import { AuthenticateUserUseCase } from "../../../use-cases/user/authenticate";
const authenticateUser = new AuthenticateUserUseCase();

const userSchema = z.object({
  email: z.string().min(1, "Email obrigatório"),
  password: z.string().min(6, "MInimo de 6 caracteres exigidos"),
});

export class AuthenticateUser {
  async execute(request: Request, response: Response) {
    const user = userSchema.parse(request.body);

    try {
      const newUser = await authenticateUser.handle(user);

      return response.status(200).json({
        user: newUser.user,
        token: newUser.user
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
}
